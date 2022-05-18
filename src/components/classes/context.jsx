import {useState} from "react";
import { Class_Students } from "./class";
import * as React from 'react';

export const ClassContext = React.createContext();
export const ClassProvider = (props) => {
    const [classes, setClasses] = useState([]);

    return(
        <ClassContext.Provider value={{classes, setClasses}}>
            {props.children}
        </ClassContext.Provider>
    );
};