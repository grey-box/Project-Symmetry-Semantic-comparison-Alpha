<p align="center">
    <img width="200" alt="Alacritty Logo" src="https://www.grey-box.ca/wp-content/uploads/2018/05/logoGREY-BOX.jpg">
</p>

<h1 align="center">Symmetery - Cross-Language Wikipedia Article Gap Analysis Tool</h1>

<p align="center">
  <img alt="Project-Symmetery: Cross-Language Wikipedia Article Semantic Analysis Tool"
       src="extras/symmetrydemo.png">
</p>

## About

Project Symmetry is a modern semantic translator tool designed to translate, compare, and evaluate the semantic similarity of Wikipedia content across different languages. The tool's primary functionality is to translate articles from one language to another, chosen by the user. 


Precompiled binaries will be available from the [GitHub releases page](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/releases). 

Join [Project-Symmetry](https://www.grey-box.ca/project-symmetry/), if you have more questions or are looking to find out more about the project. 

## Structure

There are a few elements to this project, a RESTful API server that can be installed via [Server](

## Installation

Project Symmetry can be installed by using various package managers on Linux, BSD, macOS and Windows.

Prebuilt binaries for macOS and Windows can also be downloaded from the
[GitHub releases page](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/releases).

For everyone else, the detailed instructions to install Project Symmetry can be found [in progress](INSTALL.md).

### Requirements

- At least OpenGL ES 2.0
- [Windows] ConPTY support (Windows 10 version 1809 or higher)

## Contributing

A guideline about contributing to Project Symmetry can be found in the
[`CONTRIBUTING.md (in prgress)`](CONTRIBUTING.md) file.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node: use latest but i used 20.11.0
- Python: 3.8-3.11 (nltk library requirments dont allow 3.12)

### Installation

1. Clone the repository to your local machine:

``
git clone https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha.git
```

2. Navigate to ui and install dependencies

cd ui
npm install
```
3. make python virtual env install pyinstaller

cd ../api
python -m venv venv
```
4. Activate Python virtual env and install dependencies 

#this command demands on your os or terminal for linux/bash/(i think it works for mac too) its
# If your OS is Windows 10 or 11, you use this command: cd Scripts\ ".\Activate.ps1 or .\Activate" to activate your Python virtual environment.
# In case you run into issues when running the command "pip install -r requirements.txt", try "pip freeze" to generate it automatically based on the packages installed in your current Python environment. This may help aleviate the issue.
# Run:   
source venv/scripts/activate
pip install -r requirements.txt
pip install pyinstaller
```


5. Use pyinstaller to build flask executable 
```bash
cd flaskr
pyinstaller -F app.py
```
6.Navigate to ui folder and run app
```bash

cd ../../ui
deactivate
npm install
npm run start

```

### Generating docs

1. Delete all the rst files in the docs folder, other than modules.rst and index.rst

2. Generate new rst files

```bash
cd api
sphinx-apidoc -o docs .
```

3. Use make.bat file to generate html

```bash
cd docs
./make.bat html
