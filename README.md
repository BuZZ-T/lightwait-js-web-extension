# lightwait-js-web-extension

This web extension is a [presenter](https://github.com/BuZZ-T/lightwait#presenter) in the [lightwait-stack](https://github.com/BuZZ-T/lightwait).

## Features

* Written in a few lines of JavaScript (~45 lines web-extension, 30 lines native-application)
* Consists of an additional native application, which opens the UDP Port and communicates with the web extension
    * Either a node.js script
    * Or a python script
* Support multiple browsers
	* Firefox
	* Chrom(e/ium)
	* (maybe more to come...)
* Supports
    * solid color
    * blinking color (alternating to black) (TODO)
    * multiple blinking colors (TODO)
* Receiving the color in the format [lightwait-tp](https://github.com/BuZZ-T/lightwait#transmitter---presenter) communication protocol to UDP Port 3030 on localhost


## Installation

### Firefox

#### Temporary installation (for development)

##### Install the native application (on linux)

* Copy the `app/lightwait-firefox.json` file to the particular location and name it `lightwait.json`
    * To `~/.mozilla/native-messaging-hosts` to install it only for the current user
    * To `/usr/lib/mozilla/native-messaging-hosts/` to install it globally
* Adapt the path in the `lightwait.json` to point to the `lightwait-native-application.py` or `lightwait-native-application.js` file
* Make sure that the application file is executable (or set it via `chmod +x <file>`)

##### Install the extension itself
* Open Firefox and go to `about:debugging#/runtime/this-firefox` (or click "This Firefox" on the `about:debugging` page)
* Click "Load Temporary Add-on..."
* Select any file in the project folder, e.g. the `manifest.json`

#### Persistent installation

*This web-extension is currently not yet available via [https://addons.mozilla.org](https://addons.mozilla.org)!*

### Chrome/Chromium

*Please check for every folder path if you want to install the web-extension for Chrome or Chromium (or even Chrome unstable/canary)!*

#### Temporary installation (for development)

*Check [here](https://developer.chrome.com/extensions/nativeMessaging#native-messaging-host-location) for the correct folder location for your system!*

##### Install the native application (on linux)
* Copy the `app/lightwait-chrome.json` file to the particular location and name it `lightwait.json`
    * To `~/.config/google-chrome/NativeMessagingHosts/` or `/.config/chromium/NativeMessagingHosts/` to install it only for the current user
    * To `/etc/opt/chrome/native-messaging-hosts/` or `/etc/chromium/native-messaging-hosts/` to install it globally

##### Install the extension itself
* Open Chrome/Chromium and go to `chrome://extensions/`
* Select "Developer mode" in the upper right corner
* Click "Load unpacked"
* Select the the project folder

##### Add the id of the extension to the whitelist of the native application
`allowed_origins` contains the id of the web-extension in the format `chrome-extension://<id>/`, which is needed for chrome and is changed if the content of the web-extension changes.  So if (and only if) the code changes, it needs to be added in this file afterwards. Therefore, do the following:

* Go to "chrome://extensions"
* Click on "Details" of the "lightwait-js-webextension"
* Copy the value in the field "ID" to the installed `lightwait.json`

#### Persistent installation

*This web-extension is not yet available via [https://chrome.google.com/webstore/category/extensions](https://chrome.google.com/webstore/category/extensions)!*

## Usage

Use a [lightwait-transmitter](https://github.com/BuZZ-T/lightwait#transmitter) which is able to communicate via UDP.

Currently these lightwait-transmitters are able to communicate via UDP:

* [lightwait-python-tcp-udp](https://github.com/BuZZ-T/lightwait-python-tcp-udp)

For testing purposes, you can also use this command when using bash:
```bash
echo -n "0:255:0" > /dev/udp/localhost/3030 
echo -n "b255:255:0" > /dev/udp/localhost/3030
echo -n "b255:255:0|255:0:0" > /dev/udp/localhost/3030
```
Or use netcat:
```bash
echo -n "255:0:0" | nc -u localhost 3030
```



## Tested on

| OS | Browser  | Result
|-|-|-
| Ubuntu 18.04 | Firefox 72.0b11 | ✔
| Ubuntu 18.04 | Chromium 79.0.3945.79 | ✔
| Ubuntu 18.04 | Chrome 79.0.3945.88 | ✔
| Ubuntu 18.04 | Chrome unstable 81.0.4000.3 | ✔
