console.log('lightwait loaded!');

const ICON_SIZE = 32;
const port = chrome.runtime.connectNative('lightwait');

let useCanvas = false;

let timeoutId = null;
let colorAmount = 1;
let currentColorIndex = -1;

console.log('connected...');

port.onMessage.addListener(message => {
    if (message.error) {
        console.error('Error: ', message.error);
    } else {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        const {blink, colors} = extractColors(message)

        if (blink || colors.length > 1) {

            if (blink && colors.length === 1) {
                colors.push('#000')
            }

            colorAmount = colors.length

            // value is incremented before accessing array, so start with one less
            currentColorIndex = -1;

            timeoutId = setInterval(() => {
                currentColorIndex = (currentColorIndex + 1) % colorAmount;

                const newColor = colors[currentColorIndex];
                chrome.browserAction.setIcon({imageData: createIcon(newColor)});
            }, 600);
        } else {
            chrome.browserAction.setIcon({imageData: createIcon(colors[0])});
        }
    }
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

function extractColors(colorsString) {
    const blink = colorsString.startsWith('b')

    if (blink) {
        colorsString = colorsString.substring(1)
    }

    return {
        blink,
        colors: colorsString
            .split('|')
            .map(colorString => '#'.concat(colorString.split(':')
                                   .map(baseColor => (parseInt(baseColor) || 0).toString(16))
                                   .map(c => c.length === 1 ? `0${c}` : c)
                                   .join('')
            )
        )
    }
}

function convertColor(colorString) {
    const [redString, greenString, blueString] = colorString.split(':');

    const red = parseInt(redString, 10) || 0;
    const green = parseInt(greenString, 10) || 0;
    const blue = parseInt(blueString, 10) || 0;

    return `#${red < 10 ? '0' : ''}${red.toString(16)}${green < 10 ? '0' : ''}${green.toString(16)}${blue < 10 ? '0' : ''}${blue.toString(16)}`;
}
