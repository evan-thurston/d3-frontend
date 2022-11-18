#!/usr/bin/env

const fs = require('fs');
const ws = require('ws');

const wss  ={
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

let to = null;

fs.watch('index.html', ev => {
    clearTimeout(to);
    to = setTimeout(() => {
        for(const c of wss.connections){
            c.send(JSON.stringify({watcher: ev}));
        }
    }, 500);
});

server.on('connection', c => {
    wss.connections.add(c);
    c.once('close', () => {
        wss.connections.delete(c);
    });
});

server.on('close', () => {
    console.log('websocket server closed.')
});