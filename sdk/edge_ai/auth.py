import webbrowser
import http.server
import socketserver
import threading
from urllib.parse import urlparse, parse_qs
from rich.console import Console
import json
import os

console = Console()

# Production Neural Core Endpoint
AUTH_URL = "https://edge-ai-alpha.vercel.app/auth/cli-login"

class AuthHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        query = urlparse(self.path).query
        params = parse_qs(query)
        
        if "token" in params:
            token = params["token"][0]
            save_token(token)
            
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<html><body style='font-family:sans-serif; text-align:center; padding:50px;'>")
            self.wfile.write(b"<h1 style='color:#3b82f6;'>Authentication Successful!</h1>")
            self.wfile.write(b"<p>You can now close this tab and return to the terminal.</p>")
            self.wfile.write(b"</body></html>")
            
            # Shroud shutdown
            threading.Thread(target=self.server.shutdown).start()
        else:
            self.send_error(404)

def save_token(token):
    config_dir = os.path.expanduser("~/.edge_ai")
    os.makedirs(config_dir, exist_ok=True)
    with open(os.path.join(config_dir, "config.json"), "w") as f:
        json.dump({"token": token}, f)

def login():
    console.print("[bold blue]Launching browser for authentication...[/bold blue]")
    webbrowser.open(AUTH_URL)
    
    with socketserver.TCPServer(("", 8080), AuthHandler) as httpd:
        console.print("[yellow]Waiting for handshake on port 8080...[/yellow]")
        httpd.serve_forever()
    
    console.print("[bold green]Success![/bold green] Neural Core is now linked.")

def get_user():
    # Mock retrieval logic for now
    config_path = os.path.expanduser("~/.edge_ai/config.json")
    if os.path.exists(config_path):
        return "Neural Operator #772"
    return None
