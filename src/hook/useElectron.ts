
export default function useElectron() {
    const windowHello = () => {
        return window.electronApi.windowHello('hello window');
    }
    return {
        windowHello,
    }
}