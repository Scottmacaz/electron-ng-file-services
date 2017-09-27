const {app, BrowserWindow, ipcMain, dialog} = require('electron')
var fs = require('fs');
let win = null;
function createWindow() {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 600});
  // Specify entry point
  win.loadURL('http://localhost:4200');
  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools()
  // Remove window once app is closed
  win.on('closed', function () {
    console.log("closed ....");
    win = null;
  });
}

app.on('ready', function () {
    createWindow();
  });
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
  app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
      console.log("Exiting ....");
      app.quit();
    }
  });

  ipcMain.on('open-file', (event, arg) => {  

    dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'CSV', extensions: ['csv'] }, { name: 'ALL', extensions: ['*'] }] },
    function (fileNames) {
      if (fileNames == undefined) return;
      var fileName = fileNames[0];


      fs.readFile(fileName, 'utf-8', function (err, data) {
        if (err != null) {

          console.log("Error!" + err)
          dialog.showErrorBox("File Read Error", err.message);
          return;
        }

        console.log(fileName);
        console.log(data);
        dialog.showMessageBox({
          message: "The file has been read!",
          buttons: ["OK"]
        });

        //focusedWindow.webContents.send('file-data', { fileLines: data });
        event.returnValue = data;

        //document.getElementById("editor").value = data;

      });
    });





    // Send value synchronously back to renderer process
    //event.returnValue =  'these are the file contents .....';
});