#!/usr/bin/env python3

import sys
import json
import struct
import socket


# Encode a message for transmission,
# given its content.
def encodeMessage(messageContent):
    encodedContent = json.dumps(messageContent).encode('utf-8')
    encodedLength = struct.pack('@I', len(encodedContent))
    return {'length': encodedLength, 'content': encodedContent}

# Send an encoded message to stdout
def sendMessage(encodedMessage):
    sys.stdout.buffer.write(encodedMessage['length'])
    sys.stdout.buffer.write(encodedMessage['content'])
    sys.stdout.buffer.flush()

def socket_handler():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(('127.0.0.1', 33333))

    while True:
        data, addr = sock.recvfrom(1024)
        msg = encodeMessage("python 255:0:0")
        print("msg: %s" % msg)
        sendMessage(msg)
        
socket_handler()
