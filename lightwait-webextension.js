console.log('lightwait loaded!');

const ICON_SIZE = 32;
const port = chrome.runtime.connectNative('lightwait');

let useCanvas = false;

console.log('connected...');

port.onMessage.addListener(message => {
    chrome.browserAction.setIcon({imageData: createIcon(convertColor(message))});
})

port.onDisconnect.addListener(port => {
    console.warn('disconnected', port.error);
})

chrome.browserAction.onClicked.addListener(() => {
    console.log('button clicked!');
    useCanvas = !useCanvas;
})

function createIcon(color) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    console.log('set color to: ', color);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(ICON_SIZE / 2, ICON_SIZE / 2, ICON_SIZE / 2, 0, 2 * Math.PI, false);
    ctx.fill();

    return ctx.getImageData(0, 0, ICON_SIZE, ICON_SIZE);
}

function convertColor(colorString) {
    const [redString, greenString, blueString] = colorString.split(':');

    const red = parseInt(redString, 10) || 0;
    const green = parseInt(greenString, 10) || 0;
    const blue = parseInt(blueString, 10) || 0;

    return `#${red < 10 ? '0' : ''}${red.toString(16)}${green < 10 ? '0' : ''}${green.toString(16)}${blue < 10 ? '0' : ''}${blue.toString(16)}`;
}
