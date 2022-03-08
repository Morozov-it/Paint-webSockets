import React, { useEffect, useRef } from 'react';
import {observer} from 'mobx-react-lite'
import '../styles/canvas.scss';
import CanvasStore from '../store/CanvasStore';


const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        CanvasStore.setCanvas(canvasRef.current)
    }, [])

    return (
        <div className='canvas'>
            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    )
})

//в канвас обязательно задавать ширину и высоту в props

export default React.memo(Canvas);