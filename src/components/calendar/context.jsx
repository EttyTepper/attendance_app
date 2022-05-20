import {useState} from "react";
import * as React from 'react';

export const CalendarContext = React.createContext();
export const CalendarProvider = (props) => {
    const [calendarEvents, setCalendarEvents] = useState([]);

    return(
        <CalendarContext.Provider value={{calendarEvents, setCalendarEvents}}>
            {props.children}
        </CalendarContext.Provider>
    );
};