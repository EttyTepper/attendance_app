import {useState} from "react";
import * as React from 'react';

export const StudentContext = React.createContext();
export const StudentProvider = (props) => {
    const [students, setStudents] = useState([]);

    return(
        <StudentContext.Provider value={{students, setStudents}}>
            {props.children}
        </StudentContext.Provider>
    );
};