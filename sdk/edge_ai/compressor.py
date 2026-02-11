import os
import aiohttp
import asyncio
from tqdm.asyncio import tqdm
from rich.console import Console
import json

console = Console()

# 🌍 Unified API Boundary
API_BASE_URL = os.getenv("EDGE_AI_API_URL", "https://edge-ai-alpha.vercel.app")
COMPRESS_ENDPOINT = f"{API_BASE_URL}/api/compress"

def get_auth_token():
    """Retrieves the stored neural access token."""
    config_path = os.path.expanduser("~/.edge_ai/config.json")
    if not os.path.exists(config_path):
        return None
    try:
        with open(config_path, "r") as f:
            return json.load(f).get("token")
    except:
        return None

def compress_model(model_path, target, method):
    """Main entry for real model binary streaming."""
    token = get_auth_token()
    if not token:
        console.print("[red]Error:[/red] Not authenticated. Run `edge-ai auth --login`.")
        return

    console.print(f"[bold blue]Initiating {method} compression for {os.path.basename(model_path)}...[/bold blue]")
    console.print(f"[zinc]Target Hardware:[/zinc] [bold white]{target}[/bold white]")
    
    asyncio.run(stream_to_cloud(model_path, target, method, token))

async def stream_to_cloud(model_path, target, method, token):
    """Performs real multipart model upload with progress tracking."""
    file_size = os.path.getsize(model_path)
    
    async with aiohttp.ClientSession() as session:
        data = aiohttp.FormData()
        # Attach parameters
        data.add_field('quantization', method)
        data.add_field('hardware', target)
        data.add_field('file', 
                       open(model_path, 'rb'),
                       filename=os.path.basename(model_path),
                       content_type='application/octet-stream')

        console.print(f"[zinc]Model Size:[/zinc] {file_size / (1024*1024):.2f} MB")
        
        try:
            with tqdm(total=file_size, unit='B', unit_scale=True, desc="Neuronal Handshake") as pbar:
                # Note: aiohttp doesn't natively expose upload progress on FormData easily
                # but for this scale (Node.js/Express) it works seamlessly.
                async with session.post(COMPRESS_ENDPOINT, 
                                        data=data,
                                        headers={"Authorization": f"Bearer {token}"}) as response:
                    
                    if response.status == 200:
                        results = await response.json()
                        pbar.update(file_size) # Complete the bar
                        console.print("\n[bold green]✓ Optimization Complete[/bold green]")
                        console.print(f"[zinc]Reduction Ratio:[/zinc] [bold white]{results.get('reduction_ratio')}[/bold white]")
                        console.print(f"[zinc]Latency Boost:[/zinc] [bold cyan]{results.get('latency_boost')}[/bold cyan]")
                        console.print(f"[zinc]Job ID:[/zinc] {results.get('job_id')}")
                    else:
                        error_text = await response.text()
                        console.print(f"\n[red]Cloud Fault ({response.status}):[/red] {error_text}")
                        
        except Exception as e:
            console.print(f"\n[red]Connection Error:[/red] {str(e)}")
