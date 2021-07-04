import 'normalize.css';
import '@/common/css/base.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import initReactFastclick from 'react-fastclick';
import App from './App';


initReactFastclick();

ReactDOM.render(<App />, document.getElementById('app'));
