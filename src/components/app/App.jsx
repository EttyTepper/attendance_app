
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
import {StudentProvider} from '../students/context';
import {ClassProvider} from '../classes/context';

function App(){

  return (
    <div>
      <StudentProvider>
      <ClassProvider>
      <HashRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Class_Students />}></Route>
          <Route path="/calendar" element={<Cal />}></Route>
          <Route path="/students" element={<Student/>}></Route>
        </Routes> 
        </HashRouter>   
        </ClassProvider>
        </StudentProvider>
    </div>
    
  );
}

export default App;
