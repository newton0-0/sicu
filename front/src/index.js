import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import PrivateRoute from './PrivateRoute';
import Registration from './components/SignUp';
import Dashboard from './components/Dashboard';
import WebcamCapture from './components/Capture';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<PrivateRoute/>} exact path='/dashboard'>
          <Route exact path='capture' element={<WebcamCapture/>}></Route>
          <Route path='' element={<Dashboard/>}></Route>
        </Route>
        <Route
        exact path='/'
        element={<Registration/>}
        ></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
