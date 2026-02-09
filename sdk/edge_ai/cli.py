import click
from rich.console import Console
from rich.panel import Panel
from .auth import login, logout, get_user
from .compressor import compress_model

console = Console()

@click.group()
@click.version_option(version="0.1.0")
def main():
    """EdgeAI Neural Core CLI - Compress and deploy models at the edge."""
    pass

@main.command()
@click.option("--login", is_flag=True, help="Initiate OAuth login flow via browser")
def auth(login_flag):
    """Authenticate with the EdgeAI platform."""
    if login_flag:
        login()
    else:
        user = get_user()
        if user:
            console.print(Panel(f"[green]Authenticated as:[/green] {user}", title="Auth Status", border_style="green"))
        else:
            console.print("[red]Error:[/red] Not authenticated. Run `edge-ai auth --login`.")

@main.command()
@click.argument("model_path", type=click.Path(exists=True))
@click.option("--target", type=click.Choice(["jetson", "raspberry", "mobile", "intel"]), required=True)
@click.option("--method", type=click.Choice(["int8", "mixed-precision", "prune"]), default="int8")
def compress(model_path, target, method):
    """Shard and compress a local model."""
    compress_model(model_path, target, method)

if __name__ == "__main__":
    main()
