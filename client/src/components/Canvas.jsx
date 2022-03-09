import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import '../styles/canvas.scss';
import CanvasStore from '../store/CanvasStore';
import ToolStore from '../store/ToolStore';
import Brush from '../tools/Brush';


const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        //первый рендер получение объекта canvas
        CanvasStore.setCanvas(canvasRef.current)
        //сразу присваивание инструмента кисть
        ToolStore.setTool(new Brush(canvasRef.current))
    }, [])

    const mouseDownHandler = () => {
        //добавление в массив состояний холста текущий снимок
        CanvasStore.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className='canvas'>
            <canvas
                onMouseDown={()=>mouseDownHandler()}
                ref={canvasRef}
                width={600}
                height={400} />
        </div>
    )
})

//в канвас обязательно задавать ширину и высоту в props

export default React.memo(Canvas);