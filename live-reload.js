#!/usr/bin/env

const fs = require('fs');
const ws = require('ws');
const cp = require('child_process');

const wss = {
    connections: new Set()
}

const serverConfig = {
    host: '0.0.0.0',
    port: 5900
}

const server = new ws.WebSocketServer(serverConfig);

server.on('listening', () => {
    console.log('server listening on interface:', serverConfig);
});

server.on('error', (err) => {
    console.error(err);
    console.log('Server probably already listening:');
    console.log(String(cp.execSync('lsof -i :5900')));
    process.exit(1);
});


let to = null;

const onChange = ev => {
    clearTimeout(to);
    to = setTimeout(() => {
        for (const c of wss.connections) {
            c.send(JSON.stringify({watcher: ev}));
        }
    }, 500);
}

// evidently, no core api for watching multiple files in one call, lame
fs.watch('index.html', onChange);
fs.watch('main.js', onChange);
fs.watch('style.css', onChange);


server.on('connection', c => {
    wss.connections.add(c);
    c.once('close', () => {
        wss.connections.delete(c);
    });
});

server.on('close', () => {
    console.log('websocket server closed.')
});