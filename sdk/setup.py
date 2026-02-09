from setuptools import setup, find_packages

setup(
    name="edge-ai-sdk",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "click>=8.0.0",
        "requests>=2.25.1",
        "rich>=10.0.0",
        "python-dotenv>=0.19.0",
        "supabase>=1.0.0",
        "aiohttp>=3.8.0",
        "tqdm>=4.62.0"
    ],
    entry_points={
        "console_scripts": [
            "edge-ai=edge_ai.cli:main",
        ],
    },
    author="EdgeAI Team",
    description="The official SDK for the EdgeAI Neural Compression Platform",
    python_requires=">=3.8",
)
