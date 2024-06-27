# Contributing To Symmetry

# Setup Server

requirements : python 3.9 -3.11

```bash
git clone https://github.com/grey-box/Project-Symmetry-Semantic-comparison-Alpha.git
cd Project-Symmetry-Semantic-comparison-Alpha/fastapi
//make python virtual environment according to OS requirements ex. Linux
python3 -m venv .venv
//activate virtual environment
pip install -r requirements.txt
pip install pyinstaller

//start server
fastapi dev main.py

//package server
pyinstaller -F main.py --clean
```
