# CheeseboyChat
Websocket powered chat app for you and your cheese-loving friends!
Get the full story at henryks.net.

## Features
- Chat functionality where you can see peoples usernames and can communicate
- Hidden /admin feature where you can kick anyone if you have the password: Pn00ww*!^&(
- Many special commands (/get, /game), all described in index.html
- Image sending functionality that doesn't store your images on a server
- Messages when someone connects or disconnects
- Ability to play the sound of Youtube videos

## Setup
If you want to install CheeseBoyChat on your machine, you will need node. Download node and npm at [nodejs.org](https://nodejs.org/en/download).

Run `npm i` to install all dependencies. Ignore the vulnerabilities, as they cover functions that CheeseboyChat doesn't use. If you try to fix the vulnerabilities, it will break the image sending functionality. Run `node index.js` to start the application. To visit the site head to localhost:3000 in your browser. If you want your friends on your local network to join, give them your ip adress and they can type it in along like so:

```YOUR_IP:3000```

## Disclaimer
This is not production-grade code. Don't give it anything you wouldn't be alright with a hacker intercepting. I made this as a very beginner engineer, and have grown greatly since then, so this will not be great code. Use at your own risk.
