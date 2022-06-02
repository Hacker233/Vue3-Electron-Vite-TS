// electron-main/index.ts
import { app, BrowserWindow } from "electron";
import { Window } from "./window";
const isDevelopment: boolean = process.env.NODE_ENV !== "production";

// 创建主窗口
async function createWindow() {
  let window = new Window();
  window.listen();
  window.createWindows({ isMainWin: true });
  window.createTray();
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}