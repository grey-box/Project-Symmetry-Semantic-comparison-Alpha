<p align="center">
    <img width="200" alt="Alacritty Logo" src="https://www.grey-box.ca/wp-content/uploads/2018/05/logoGREY-BOX.jpg">
</p>

<h1 align="center">Symmetery - Cross-language Wikipedia article gap analysis tool</h1>

<p align="center">
  <img alt="Symmetery - Cross-language Wikipedia article gap analysis tool"
       src="extras/symmetrydemo.png">
</p>

## About

Symmetry is a Tool to help lets add words here By integrating with other
applications, seguay into , it manages to
provide a flexible set of [features](./docs/features.md) with high performance.
The supported platforms currently consist of BSD, Linux, macOS and Windows.

The software is considered to be at a **beta** level of readiness; there are
a few missing features and bugs to be fixed, but it is already used by many as
a daily driver.

Precompiled binaries are available from the [GitHub releases page](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/releases).

## Features

You can find an overview over the features available in Symmetry [here](./docs/features.md).

## Installation

Symmetry can be installed by using various package managers on Linux, BSD,
macOS and Windows.

Prebuilt binaries for macOS and Windows can also be downloaded from the
[GitHub releases page](https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha/releases).

For everyone else, the detailed instructions to install Symmetry can be found
[here](INSTALL.md).

### Requirements

- At least OpenGL ES 2.0
- [Windows] ConPTY support (Windows 10 version 1809 or higher)

## Contributing

A guideline about contributing to Symmetry can be found in the
[`CONTRIBUTING.md`](CONTRIBUTING.md) file.

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
4. Activate python virtual env and install dependencies 

#this command demands on your os or terminal for linux/bash/(i think it works for mac too) its
# Note: - If your OS is Windows 11, please use command ".\Activate.ps1" to activate you Python virtual environment
#       - If you're not sure where to find or create the requirements.txt file, you can create it manually in your project directory or use a           tool or command like "pip freeze" to generate it automatically based on the packages installed in your current Python environment.
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
