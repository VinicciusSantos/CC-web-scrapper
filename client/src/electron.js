const electron = require("electron"); //require electron
const { app, BrowserWindow } = electron; //import these
let window;
function createWindow() {
  // Create the new browser window.
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

  //set the URL to the angular build folder index.html file
  window.loadURL(url);
  // What happens when the window closes.
  window.on("closed", function () {
    window = null;
  });
}
// Create window when electron is initialized
app.on("ready", createWindow);
// Close process.
app.on("window-all-closed", function () {
  if (process.platform !== "win32") {
    app.quit();
  }
});
