import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { exec, execFile } from 'child_process'

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const isDev = false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }
  let backendPath;
  if (app.isPackaged) {
    backendPath = path.join(process.resourcesPath, 'main');
  } else {
    backendPath = path.join(process.cwd(), '../fastapi/app/dist/main');
  }
  console.log(`[INFO] backendPath: ${backendPath}`)
  try {
    execFile(backendPath, ['--port', '8000'], (error: any, stdout: any, stderr: any) => {
      console.log("[INFO] Running backend API")
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`[INFO] API has started!`)
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
  catch(e) {
    console.log(`Error while running API : ${e}`);
  }

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    exec('killall pyapp', (err: any, stdout: any, stderr: any) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    })
    app.quit()
  }
  exec('killall pyapp', (err: any, stdout: any, stderr: any) => {
    if (err) {
      console.log(err)
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })

});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
