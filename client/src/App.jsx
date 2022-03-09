import React from 'react';
import './styles/app.scss'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import ToolBar from './components/ToolBar'
import SettingBar from './components/SettingBar';
import Canvas from './components/Canvas';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:id' element={
          <div className="app">
              <ToolBar />
              <SettingBar />
              <Canvas />
            </div>
        } />
        <Route path="*" element={<Navigate to={`${Date.now().toString()}`} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(App);
