import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Stickywall from './Stickywall'
import Students from './Students/Students'
import Courses from './Courses/Courses'
import Attendance from './Attendance/Attendance'
export default function Index() {
  return (
    <Routes>
        <Route path='/' element={<Stickywall/>} />
        <Route path='/students' element={<Students/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/attendance' element={<Attendance/>} />
    </Routes>
  )
}
