#!/usr/bin/env python3
"""
LearnHub Local Development Server
Run this script to serve the app locally.

Usage:
    python serve.py

Then open: http://localhost:8080
"""

import http.server
import socketserver
import os
import webbrowser
from threading import Timer

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Cleaner log output
        if '200' in args[1] or '304' in args[1]:
            print(f"  ✓ {args[0]}")
        elif '404' in args[1]:
            print(f"  ✗ 404: {args[0]}")

    def end_headers(self):
        # Allow ES modules (required for import/export)
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def open_browser():
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"""
╔══════════════════════════════════════╗
║        LearnHub Dev Server           ║
╠══════════════════════════════════════╣
║  URL: http://localhost:{PORT}           ║
║  Dir: {DIRECTORY[:30]}...  ║
║  Press Ctrl+C to stop                ║
╚══════════════════════════════════════╝
        """)
        # Open browser after 0.5s delay
        Timer(0.5, open_browser).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped. Goodbye!")
