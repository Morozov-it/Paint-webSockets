import React from 'react';
import '../styles/toolbar.scss';
import { observer } from 'mobx-react-lite';
import CanvasStore from '../store/CanvasStore';
import ToolStore from '../store/ToolStore';

import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';



const ToolBar = observer(() => {
    let active = ToolStore.active
    return (
        <div className='toolbar'>
            <button
                onClick={() => {
                    ToolStore.setActive('brush')
                    ToolStore.setTool(new Brush(CanvasStore.canvas))
                }}
                className={`toolbar__btn brush ${active === 'brush' && 'active'}`}></button>
            <button
                onClick={() => {
                    ToolStore.setActive('rect')
                    ToolStore.setTool(new Rect(CanvasStore.canvas))
                }}
                className={`toolbar__btn rect ${active === 'rect' && 'active'}`}></button>
            <button
                onClick={() => {
                    ToolStore.setActive('circle')
                    ToolStore.setTool(new Circle(CanvasStore.canvas))
                }}
                className={`toolbar__btn circle ${active === 'circle' && 'active'}`}></button>
            <button
                onClick={() => {
                    ToolStore.setActive('eraser')
                    ToolStore.setTool(new Eraser(CanvasStore.canvas))
                }}
                className={`toolbar__btn eraser ${active === 'eraser' && 'active'}`}></button>
            <button
                onClick={() => {
                    ToolStore.setActive('line')
                    ToolStore.setTool(new Line(CanvasStore.canvas))
                }}
                className={`toolbar__btn line ${active === 'line' && 'active'}`}></button>
            <input
                onChange={(e) => {
                    ToolStore.setFillColor(e.target.value);
                    ToolStore.setStrokeColor(e.target.value);
                }}
                type='color'
                className='toolbar__color'></input>
            <button className='toolbar__btn undo'></button>
            <button className='toolbar__btn redo'></button>
            <button className='toolbar__btn save'></button>
        </div>
    )
})

export default React.memo(ToolBar);