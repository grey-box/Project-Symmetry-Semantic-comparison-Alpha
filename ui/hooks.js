const fs = require('fs');
const path = require('path');

module.exports = {
  postPackage: async (forgeConfig, options) => {
    const logMessage = 'postPackage: add app.py to package\n';
    // Define the file path where you want to save the log
    const logFilePath = path.join(__dirname, 'postPackageLog.txt');

    // Write the log message to the file
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) throw err;
    });
    const sourceFilePath = path.join(__dirname, 'app.exe'); // Path to the source file
    
    const targetFilePath = path.join(__dirname, 'out/ui-win32-x64/app.exe'); // Path for the copied file in the same directory
    //const targetFilePath = path.join(__dirname, '../out/ui-win32-x64/app.exe'); // Path for the copied file in the same directory
    // Copy the file
    fs.copyFile(sourceFilePath, targetFilePath, (err) => {
      if (err) {
        fs.appendFile(logFilePath, `Error copying file${err}`, (err) => {
            if (err) throw err;
        });
        return;
      }
      console.log(`File was copied as ${targetFilePath}`);
    });
    

  }
};