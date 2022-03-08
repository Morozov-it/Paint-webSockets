import React from 'react';
import '../styles/toolbar.scss';
import CanvasStore from '../store/CanvasStore';
import ToolStore from '../store/ToolStore';
import Brush from '../tools/Brush';


const ToolBar = () => {
    return (
        <div className='toolbar'>
            <button
                onClick={()=>ToolStore.setTool(new Brush(CanvasStore.canvas))}
                className='toolbar__btn brush'
            ></button>
            <button className='toolbar__btn rect'></button>
            <button className='toolbar__btn circle'></button>
            <button className='toolbar__btn eraser'></button>
            <button className='toolbar__btn line'></button>
            <input type='color' className='toolbar__color'></input>
            <button className='toolbar__btn undo'></button>
            <button className='toolbar__btn redo'></button>
            <button className='toolbar__btn save'></button>
        </div>
    )
}
export default React.memo(ToolBar);