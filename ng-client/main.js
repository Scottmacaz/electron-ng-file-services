const { app, BrowserWindow, ipcMain, dialog } = require('electron')
var fs = require('fs');
let win = null;
function createWindow() {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow({ width: 1000, height: 600 });
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

  dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'ALL', extensions: ['*'] }, { name: 'CSV', extensions: ['csv'] }] },
    function (fileNames) {
      console.log("Enter showOpenDialog");

      if (fileNames == undefined) {
        event.returnValue = { "hasError": true, "error": "fileNames is undefined" };
        return;
      }
      var fileName = fileNames[0];

      fs.readFile(fileName, 'utf-8', function (err, data) {
        if (err != null) {
          event.returnValue = { "hasError": true, "error": `File Read Error: ${err.message}` };

          return;
        }

        console.log(fileName);
        console.log(data);

        //focusedWindow.webContents.send('file-data', { fileLines: data });
        console.log('returning data .....');
        event.returnValue = { 'fileName': fileName, 'fileContents': data };
        return;

      });
    });
});

ipcMain.on('save-file', (event, fileContents, fileName) => {
  console.log(`Saving file contents: ${fileContents}`)
  console.log(`Saving file name: ${fileName}`)
  var options =  {
    title: "Title of Dialog",
    defaultPath: `c:\\temp\\${fileName}`,   //path should be passed in as well.
    filters: [{name: 'zip', extensions: ['zip']}]
  };

  dialog.showSaveDialog(options, (fileName) => {
    if (fileName === undefined) {
      event.returnValue = { "hasError": true, "error": "fileName is undefined" };
      return;
    }
    // fileName is a string that contains the path and filename created in the save file dialog.  
    
    fs.writeFile(fileName, fileContents, (err) => {
      if (err) {
        event.returnValue = { 'hasError': true, 'error': `Error Creating File: ${err.message}` }
        return;
      }
    });

    event.returnValue = { 'hasError': false }
    return;
  });
});

// ipcMain.on('save-zip-file', (event, fileContents, fileName) => {
//   console.log(`Saving file contents2222222: Binary data .....`)
//   console.log(`Saving file name: ${fileName}`)

//   var options =  {
//     title: "Title of Dialog",
//     defaultPath: "d:\\tmp\\someZipFile.zip",
//     filters: [{name: 'zip', extensions: ['zip']}]
//   };
//   dialog.showSaveDialog(options, (fileName) => {
//     if (fileName === undefined) {
//       event.returnValue = { "hasError": true, "error": "fileName is undefined" };
//       return;
//     }
//     // fileName is a string that contains the path and filename created in the save file dialog.  
//     fs.writeFile(fileName, fileContents, (err) => {
//       if (err) {
//         event.returnValue = { 'hasError': true, 'error': `Error Creating File: ${err.message}` }
//         return;
//       }
//     });

//     event.returnValue = { 'hasError': false }
//     return;
//   });
// });