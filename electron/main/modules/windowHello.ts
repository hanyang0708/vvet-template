import { ipcMain } from "electron";
// 监听渲染进程方法
export default function () {
    ipcMain.handle("window-hello", (e: Event, data: string):string => {
        return data
    });
}