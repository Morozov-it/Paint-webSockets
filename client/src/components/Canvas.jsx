import React from 'react';

import '../styles/canvas.scss';


const Canvas = () => {
    return (
        <div className='canvas'>
            <canvas width={600} height={400} />
        </div>
    )
}

//в канвас обязательно задавать ширину и высоту в props

export default React.memo(Canvas);