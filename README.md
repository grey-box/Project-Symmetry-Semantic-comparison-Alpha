<p align="center">
    <img width="200" alt="Alacritty Logo" src="https://www.grey-box.ca/wp-content/uploads/2018/05/logoGREY-BOX.jpg">
</p>

<h1 align="center">Symmetery - Cross-language Wikipedia article gap analysis tool</h1>

<p align="center">
  <img alt="Symmetery - Cross-language Wikipedia article gap analysis tool"
       src="extras/symmetrydemo.png">
</p>

## About


## Description

This app is an Electron-flask built as a redesign of the previous app. The goal is to merge this fork into the main repo once all functionalities work.

The ui folder is temporary until integration with the next app is made. Red team can build and test in the next folder and model the functionalies by looking at the ui folder

## Features

- Electron framework for cross-platform desktop app development
- Integration with Flask for backend operations
- AI functionalities to enhance interaction with Wikipedia

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node: use latest but i used 20.11.0
- Python: 3.8-3.11 (nltk library requirments dont allow 3.12)

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha.git
```

2. Navigate to ui and install dependencies
```bash
cd ui
npm install
```
3. make python virtual env install pyinstaller
```bash
cd ../api
python -m venv venv
```
4. Activate python virtual env and install dependencies 
```bash
#this command demands on your os or terminal for linux/bash/(i think it works for mac too) its
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
