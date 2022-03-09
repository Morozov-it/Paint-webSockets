import React from 'react';
import '../styles/toolbar.scss';
import ToolStore from '../store/ToolStore';


const SettingBar = () => {
    return (
        <div className='setting'>
            <label
                className='setting-label'
                htmlFor="line-width">Line width</label>
            <input
                onChange={(e)=>ToolStore.setLineWidth(e.target.value)}
                className='setting-input'
                id='line-width'
                type="number"
                defaultValue={1}
                min={1}
                max={50} />
            <label
                className='setting-label'
                htmlFor="stroke-color">Stroke color</label>
            <input
                onChange={(e)=>ToolStore.setStrokeColor(e.target.value)}
                className='setting-input'
                id='stroke-color'
                type="color"
                />
        </div>
    )
}
export default React.memo(SettingBar);