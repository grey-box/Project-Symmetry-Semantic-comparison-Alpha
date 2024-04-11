const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { execFile } = require('child_process');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  let backendPath;
  if (app.isPackaged) {
    backendPath = path.join(process.resourcesPath, 'app.exe');
  }else{
    backendPath = path.join(process.cwd(), '../api/flaskr/dist/app.exe');
  }
  backendProcess = execFile(backendPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    const { exec } = require('child_process');
    exec('taskkill /f /t /im app.exe', (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    });
    app.quit();
  }
})