import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import '../styles/canvas.scss';
import CanvasStore from '../store/CanvasStore';
import ToolStore from '../store/ToolStore';

import Modal from './Modal';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Eraser from '../tools/Eraser';
import Circle from '../tools/Circle';
import Line from '../tools/Line';


const Canvas = observer(() => {
    const { id } = useParams()
    const canvasRef = useRef()
    const [isError, setIsError] = useState('')
    const [modal, setModal] = useState(true)
    const closeModal = () => {
        setModal(false)
    }

    useEffect(() => {
        //первый рендер получение объекта canvas
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        CanvasStore.setCanvas(canvas)
        axios.get(`http://localhost:5000/image?id=${id}`)
            .then(response => {
                //создание нового html <img> объекта
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    //очищение всего холста
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    //нанесение на холст сохраненного изображения
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                }
            })
    }, [])

    const mouseDownHandler = () => {
        //добавление в массив состояний холста текущий снимок
        const img = canvasRef.current.toDataURL()
        CanvasStore.pushToUndo(img)
        axios.post(`http://localhost:5000/image?id=${id}`, { img })
            .catch(error=>console.log(error))
    }

    //функция открытия связи с сервером по протоколу ws
    const connectHandler = (username) => {
        try {
            if (username) {
                setIsError('');
                CanvasStore.setUsername(username);
                //создание соединения по websocket
                const socket = new WebSocket('ws://localhost:5000/');
                //сохранение данных store
                CanvasStore.setSocket(socket)
                CanvasStore.setSessionId(id)

                //активация инструмента кисть
                ToolStore.setTool(new Brush(canvasRef.current, socket, id))

                //слушатель открытия соединения
                socket.onopen = () => {
                    console.log('Connection established')
                    socket.send(JSON.stringify({
                        id,
                        username,
                        method: 'connection'
                    }))
                }
                //слушатель получения сообщений
                socket.onmessage = function (event) {
                    let message = JSON.parse(event.data);
                    switch (message.method) {
                        case 'connection':
                            console.log(`User named ${message.username} connected`)
                            break;
                        case 'draw':
                            drawHandler(message)
                            break;
                        default:
                            break;
                    }
                };
                setModal(false)
            } else {
                throw new Error('Name can not be empty');
            }
        } catch (e) {
            setIsError(e.message)
        }
    }

    //функция рисования через ws
    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y, figure.strokeStyle, figure.lineWidth)
                break;
            case 'rect':
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillStyle, figure.strokeStyle, figure.lineWidth)
                break;
            case 'circle':
                Circle.staticDraw(ctx, figure.x, figure.y, figure.radius,  figure.fillStyle, figure.strokeStyle, figure.lineWidth)
                break;
            case 'eraser':
                Eraser.draw(ctx, figure.x, figure.y, figure.lineWidth)
                break;
            case 'line':
                Line.staticDraw(ctx, figure.x, figure.y, figure.currentX, figure.currentY, figure.fillStyle, figure.strokeStyle, figure.lineWidth)
                break;
            case 'finish':
                ctx.beginPath()
                break;
            case 'clear':
                ctx.clearRect(0, 0, figure.width, figure.height)
                break;
            default:
                break;
        }
    }

    return (
        <>
        {modal && <Modal {...{ closeModal, connectHandler, isError }} />}
        <div className='canvas'>
            <canvas
                onMouseDown={()=>mouseDownHandler()}
                ref={canvasRef}
                width={600}
                height={400} />
            </div>
        </>
    )
})
//в канвас обязательно задавать ширину и высоту в props

export default React.memo(Canvas);