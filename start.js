#!/usr/bin/env

const cp = require('child_process');
const fs = require('fs');
const ws = require('ws');

export const wss  ={
    connections: new Set<WebSocket.WebSocket>()
}

const server = ws.WebSocketServer({host:' 0.0.0.0', port: 5900});

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