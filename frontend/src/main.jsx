import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='w-screen h-screen min-w-[1000px] min-h-[800px]'>
        <App/>
      </div>

      {/*loading some tailwind colors*/}
      <div hidden className='bg-blue-400'></div>
      <div hidden className='bg-yellow-400'></div>
      <div hidden className='bg-red-400'></div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);