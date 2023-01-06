import "./indexHtmlLoading";
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
    windowHello: (data:string) => ipcRenderer.invoke('window-hello', data),
})
