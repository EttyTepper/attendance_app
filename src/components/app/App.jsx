import * as React from 'react';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import {Cal} from '../calendar/calendar';
import {Class_Students} from '../classes/class';
import {Header} from '../header/header';
import {Student} from '../students/student';
import {ClassProvider} from '../classes/context';
import {Attendance} from '../attendanceNoted/attendanceNoted';
import { CurrClassProvider } from '../classes/current_class_context';
function App(){

  return (
    <div>
      <ClassProvider>
      <CurrClassProvider>
      <HashRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Class_Students />}></Route>
          <Route path="/calendar" element={<Cal />}></Route>
          <Route path="/students" element={<Student/>}></Route>
          <Route path="/attendanceNoted" element={<Attendance/>}></Route>
        </Routes> 
        </HashRouter> 
        </CurrClassProvider> 
        </ClassProvider>
    </div>
    
  );
}

export default App;
