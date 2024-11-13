# Project Symmetry Installation Guide

## UI Installation

### Requirements
Before starting the installation, make sure you have the following tools installed:

- **OpenGL ES 2.0** (or higher)
- **Windows**: ConPTY support (Windows 10 version 1809 or higher)
- **Ubuntu**: Version 20.04 or later
- **Node.js**: Latest version (e.g., 20.11.0)
- **Python**: Version 3.8 - 3.11 (NLP library requirements prevent 3.12)
- **npm**: Version 8.19.4
- **Electron**: Version v26.2.4


### Installation Steps

I. **Clone the Repository**

Open your terminal and run the following command to clone the repository:

```
git clone https://github.com/frankfarsi/Project-Symmetry-Semantic-comparison-Alpha.git
```


II. **Navigate to ui and Install Dependencies**

```
cd ui
npm install
```

III. **Setting up the Python Environment**

This guide will help you set up a Python virtual environment and install the required dependencies on different operating systems (Windows, Linux, macOS).

   1. Create a Virtual Environment
   If you haven't already created a virtual environment, you can do so by running the following command:
   
   ```
   cd ../api
   python -m venv venv
   ```
   2. Activate the Virtual Environment
   
   | **Operating System** | **Command** |
   |----------------------|-------------|
   | **Windows**          | `cd Scripts\` <br> `.\Activate.ps1` or `.\Activate` |
   | **Linux/macOS**      | `source venv/bin/activate` |
   
   3. Install Dependencies
      
   Once the virtual environment is activated, install the necessary dependencies from the requirements.txt file:
   
   ```
   pip install -r requirements.txt
   ```
   
   4. Install PyInstaller
      
   To package your Python application into standalone executables, you need to install PyInstaller:
   
   ```
   pip install pyinstaller
   ```

V. **Use Pyinstaller to Build Flask Executable**

```
cd flaskr
pyinstaller -F app.py
```

VI. **Navigate to ui Folder and Run App**

```
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
