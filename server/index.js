const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')

//модули для работы с файлами
const fs = require('fs')
const path = require('path')

//импорт ws сервера и сразу вызов функции создания приложения
const WSServer = require('express-ws')(app);
//создание функции для массовой рассылки по ws
const aWss = WSServer.getWss()

app.use(cors())
app.use(express.json())


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

app.post('/image', (req, res) => {
    try {
        //функция замены данных в строке
        const data = req.body.img.replace('data:image/png;base64,', '')
        //функция сохранения файла в указанную папку
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')

        return res.status(200).json({message: 'success'})
    } catch (e) {
        return res.status(500).json(e)
    }
})
app.get('/image', (req, res) => {
    try {
        //функция чтения файла из директории
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = `data:image/png;base64,` + file.toString('base64')
        res.json(data)
    } catch (e) {
        return res.status(500).json(e)
    }
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