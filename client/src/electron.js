const electron = require("electron"); 
const { app, BrowserWindow } = electron; 

let window;
function createWindow() {
  window = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: "#ffffff",
  });

  const url = require("url").format({
    protocol: "file",
    slashes: true,
    pathname: require("path").join(__dirname, "../dist/client/index.html"),
  });

  window.loadURL(url);  
  window.on("closed", function () {
    window = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "win32") {
    app.quit();
  }
});
