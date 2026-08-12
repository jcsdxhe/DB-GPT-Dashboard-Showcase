"""Serve the exported DB-GPT Dashboard showcase with its GitHub Pages prefix."""

from __future__ import annotations

import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


PREFIX = "/DB-GPT-Dashboard-Showcase"
ROOT = Path(__file__).resolve().parent


class PrefixedStaticHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        original = self.path
        clean_path = original.split("?", 1)[0].split("#", 1)[0]
        if clean_path == PREFIX:
            stripped = "/"
        elif clean_path.startswith(f"{PREFIX}/"):
            stripped = clean_path[len(PREFIX) :]
        else:
            stripped = clean_path
        self.path = stripped
        try:
            return super().translate_path(stripped)
        finally:
            self.path = original


if __name__ == "__main__":
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("127.0.0.1", 8000), PrefixedStaticHandler)
    print("DB-GPT Dashboard Showcase is running at:")
    print(f"http://127.0.0.1:8000{PREFIX}/dashboards/showcase/?case=walmart")
    print("Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

