import React from 'react';
import { Switch, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import QuoteView from './components/Dashboard/QuoteView';
import MUILayout from './containers/MUILayout';
import Statistics from './components/Statistics/Statistics';



function BaseRouter() {


  return (
      <Routes>        
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/" element={<MUILayout />} >
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/:qid" element={<QuoteView />} /> 
          <Route path="/stats" element={<Statistics />} /> 
        </Route>
      </Routes>
  )
}



export default BaseRouter;