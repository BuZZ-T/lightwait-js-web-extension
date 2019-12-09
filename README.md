# lightwait-js-web-extension

This web extension is a [presenter](https://github.com/BuZZ-T/lightwait#presenter) in the [lightwait-stack](https://github.com/BuZZ-T/lightwait).

## Features

* Written in a few lines of JavaScript (~45 lines web-extension, 30 lines native-application)
* Consists of an additional native application, which opens the UDP Port and communicates with the web extension
    * Either a node.js script
    * Or a python script
* Support multiple browsers (TODO)
* Supports
    * solid color
    * blinking color (alternating to black) (TODO)
    * multiple blinking colors (TODO)
* Receiving the color in the format [lightwait-tp](https://github.com/BuZZ-T/lightwait#transmitter---presenter) communication protocol to UDP Port 3030 on localhost


## Installation

### Firefox

#### Temporarily installation (for development)

##### Install the native application (on linux)

* Copy the `app/lightwait.json` file to the particular location
    * To `~/.mozilla/native-messaging-hosts` to install it only for the current user
    * To `/usr/lib/mozilla/native-messaging-hosts/` to install it globally
* Adapt the path in the `app/lightwait.json` to point to the `lightwait-native-application.py` or `lightwait-native-application.js` file
* Make sure that the application file is executable (or set it via `chmod +x <file>`

##### Install the extension itself
* Open firefox and go to `about:debugging#/runtime/this-firefox` (or click "This Firefox" on the `about:debugging` page)
* Click "Load Temporary Add-on..."
* Select any file in the project folder, e.g. the `manifest.json`

#### Persistent installation

TODO

### Chrome/Chromium

*Please check for every folder path if you want to install the web-extension for Chrome or Chromium!*

#### Temporarily installation (for development)

*Check [here](https://developer.chrome.com/extensions/nativeMessaging#native-messaging-host-location) for the correct folder location for your system!*

##### Install the native application (on linux)
* Copy the `app/lightwait.json` file to the particular location
    * To `~/.config/google-chrome/NativeMessagingHosts/` or `/.config/chromium/NativeMessagingHosts/` to install it only for the current user
    * To `/etc/opt/chrome/native-messaging-hosts/` or `/etc/chromium/native-messaging-hosts/` to install it globally

##### Install the extension itself
* Open Chrome/Chromium and go to `chrome://extensions/`
* Select "Developer mode" in the upper right corner
* Click "Load unpacked"
* Select any file in the project folder, e.g. the `manifest.json`

## Tested on

| OS | Browser  | Result
|-|-|-
| Ubuntu 18.04 | Firefox 72.0b4 | ✔
| Ubuntu 18.04 | Chromium 78.0.3904.108 | *(TODO)*
| Ubuntu 18.04 | Chrome 78.0.3904.108 | *(TODO)*
