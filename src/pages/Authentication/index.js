import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Signin from './Signin'
export default function index() {
  return (
    <>
    <Routes>
      <Route  path='/signin' element={<Signin/>} />
    </Routes>
    
    </>
  )
}
