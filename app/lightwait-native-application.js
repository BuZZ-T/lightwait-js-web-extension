#!/usr/bin/env node
const dgram = require('dgram');

const PORT = 33333;
const HOST = '127.0.0.1';

const server = dgram.createSocket('udp4');

server.on('message', function (message, remote) {
    sendMessage(message.toString().trim())
});

server.bind(PORT, HOST);

function sendMessage(msg) {
    var buffer = Buffer.from(JSON.stringify(msg))

    var header = Buffer.alloc(4)
    header.writeUInt32LE(buffer.length, 0)

    var data = Buffer.concat([header, buffer])
    process.stdout.write(data)
}

process.on('uncaughtException', (err) => {
    sendMessage({ error: err.toString() })
})