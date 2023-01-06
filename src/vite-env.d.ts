/// <reference types="vite/client" />
interface ElectronApi {
    windowHello: (data:string) => Promise<string>
}
declare interface Window {
    electronApi: ElectronApi;
}