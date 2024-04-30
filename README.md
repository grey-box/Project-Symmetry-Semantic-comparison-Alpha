# Project Symmetry

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
npm run start
```

