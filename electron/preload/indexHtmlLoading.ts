function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
    return new Promise(resolve => {
        if (condition.includes(document.readyState)) {
            resolve(true)
        } else {
            document.addEventListener('readystatechange', () => {
                if (condition.includes(document.readyState)) {
                    resolve(true)
                }
            })
        }
    })
}

const safeDOM = {
    append(parent: HTMLElement, child: HTMLElement) {
        if (!Array.from(parent.children).find(e => e === child)) {
            return parent.appendChild(child)
        }
    },
    remove(parent: HTMLElement, child: HTMLElement) {
        if (Array.from(parent.children).find(e => e === child)) {
            return parent.removeChild(child)
        }
    },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
    const className = `loaders-css__square-spin`
    const styleContent = `
    @keyframes square-spin {
        25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
        50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
        75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
        100% { transform: perspective(100px) rotateX(0) rotateY(0); }
    }
    .${className} > div {
        animation-fill-mode: both;
        width: 50px;
        height: 50px;
        background: #fff;
        animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
    }
    .app-loading-wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #34B6B4;
        z-index: 9;
    }
    `
    const oStyle = document.createElement('style')
    const oDiv = document.createElement('div')
    const fontDiv = document.createElement('div');
    oStyle.id = 'app-loading-style'
    oStyle.innerHTML = styleContent
    oDiv.className = 'app-loading-wrap'
    oDiv.innerHTML = `<div class="${className}"><div></div></div>`

    fontDiv.innerHTML = `<div style="text-align:center;color:#fff;font-size:20px;margin-top:30px;position: absolute;z-index:10;left:50%;bottom:35%;font-weight:600;width:180px;transform:translateX(-90px)">正在加载，请稍后...</div>`
    return {
        appendLoading() {
            safeDOM.append(document.head, oStyle)
            safeDOM.append(document.body, oDiv)
            safeDOM.append(document.body, fontDiv)
        },
        removeLoading() {
            safeDOM.remove(document.head, oStyle)
            safeDOM.remove(document.body, oDiv)
            safeDOM.remove(document.body, fontDiv)
        },
    }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

let time = 2000;

window.onmessage = ev => {
    setTimeout(() => {
        ev.data.payload === 'removeLoading' && removeLoading()
    }, time);

}

setTimeout(removeLoading, time)