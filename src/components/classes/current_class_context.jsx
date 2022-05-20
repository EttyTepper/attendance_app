import {useState} from "react";
import * as React from 'react';

export const CurrClassContext = React.createContext();
export const CurrClassProvider = (props) => {
    const [currClass, setCurrClass] = useState({});

    return(
        <CurrClassContext.Provider value={{currClass, setCurrClass}}>
            {props.children}
        </CurrClassContext.Provider>
    );
};