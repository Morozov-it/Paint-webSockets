const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

//импорт ws сервера и сразу вызов функции создания приложения
const WSServer = require('express-ws')(app);
//создание функции для массовой рассылки по ws
const aWss = WSServer.getWss()


app.ws('/', (ws, req) => {
    console.log('Connection established')

    //функция обработки входящих сообщений
    ws.on('message', (mes) => {
        message = JSON.parse(mes)
        switch (message.method) {
            case 'connection':
                connectionHandler(ws, message)
                break;
            case 'draw':
                broadcastConnection(ws, message)
                break;
        }
    })

    //функция ответа на клиент
    //ws.send('Success connect')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const connectionHandler = (ws, message) => {
    //для раздела сессий каждому websocket присваивается свой id
    ws.id = message.id
    //функция массовой рассылки уведомления о подключении пользователя
    broadcastConnection(ws, message)
}
const broadcastConnection = (ws, message) => {
    aWss.clients.forEach(client => {
        if (client.id === message.id) {
            client.send(JSON.stringify(message))
        }
    })
} 