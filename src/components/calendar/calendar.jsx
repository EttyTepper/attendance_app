import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import './calendar.css';
import Box from '@mui/material/Box';
import DatePicker from 'react-datepicker';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function CalendarCreate(){
    const SCOPES = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";
    const [events, setEvents] = useState(null);

    useEffect(() => {
      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.src = "https://apis.google.com/js/api.js";
  
      document.body.appendChild(script);
  
      script.addEventListener("load", () => {
        if (window.gapi) handleClientLoad();
      });
    }, []);
  
    const handleClientLoad = () => {
      window.gapi.load("client:auth2", initClient);
    
    };
  
    const openSignInPopup = () => {
      window.gapi.auth2.authorize(
                 { client_id: '293685623926-qs23u61lbndtriuct5dt882bourv96dh.apps.googleusercontent.com', key: 'AIzaSyCuCOQDfQSrn_p-P5KFl49hiOReDk1JDbA', scope: SCOPES },
                 (res) => {
                   if (res) {
                     if (res.access_token)
                       localStorage.setItem("access_token", res.access_token);
   
                     // Load calendar events after authentication
                     window.gapi.client.load("calendar", "v3", listUpcomingEvents);
                   }
                 }
               );
   }  
   
   const initClient = () => {
       if (!localStorage.getItem("access_token")) {
         openSignInPopup();
       } else {
         // Get events if access token is found without sign in popup
         fetch(
        `https://www.googleapis.com/calendar/v3/calendars/bgugmsnqjmdp54vg9c99gl12qk@group.calendar.google.com/events?key=AIzaSyCuCOQDfQSrn_p-P5KFl49hiOReDk1JDbA&orderBy=startTime&singleEvents=true`,
         
           
         )
        
           .then((res) => {
            console.log();
             // Check if unauthorized status code is return open sign in popup
             if (res.status !== 401) {
               return res.json();
             } else {
               localStorage.removeItem("access_token");
   
               openSignInPopup();
             }
           })
           .then((data) => {
             if (data?.items) {
               setEvents(formatEvents(data.items));
             }
           });
       }
     };
  
     const listUpcomingEvents = () => {
      window.gapi.client.calendar.events
        .list({
          // Fetch events from user's primary calendar
          calendarId: "bgugmsnqjmdp54vg9c99gl12qk@group.calendar.google.com",
          showDeleted: true,
          singleEvents: true,
        })
        .then(function (response) {
          let events = response.result.items;
  
          if (events.length > 0) {
            setEvents(formatEvents(events));
          }
        });
    };
  
    const formatEvents = (list) => {
      return list.map((item) => ({
        title: item.summary,
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date,
      }));
};

return(
  <div>
    <Stack direction="row" >
    <div className="calendarapi">
      <Box sx={{fontSize: '5vw', fontFamily: 'cursive', textAlign: 'center', marginTop: '2vw', color: 'orange'}}>SCHOOL CALENDAR</Box>
      <FullCalendar 
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}    
     />
     </div>
    <div className='listevents'>
      <Box><Typography fontFamily= 'cursive' fontSize="150%" color="rgb(2, 20, 92)" marginTop="3%" padding="1%">List Events By Date:</Typography></Box>
      <Typography fontSize="150%" padding="1%"><DatePick setEvents={setEvents} events={events} /></Typography>
    </div>
    </Stack>
  </div>
);
}

function DatePick (props) {
  const [startDate, setStartDate] = useState(new Date());
  const YYYY = startDate.getFullYear();
  let DD = startDate.getDate();
  let MM = startDate.getMonth()+1;
  if(DD<10)
  {
      DD=`0${DD}`;
  }
  if(MM<10)
  {
      MM=`0${MM}`;
  }

  return (
    <div>
    <DatePicker 
      selected={startDate} 
      onChange={date => setStartDate(date)} 
    />
   {(props.events === null) ?
                <div> </div>  :               
               props.events.map((e, index) => (
            
                (e.start === YYYY + "-" + MM + "-" + DD) ?
                <Card sx={{margin: "auto auto", marginTop: "2%", padding: "1%", width: "60%", height:"100%", display: "flex", flexDirection: "column", alignItems: "center",justifyContent: "space-between", color: "rgb(235, 232, 232)", background: "rgb(2, 20, 92)"}}>
                  <div>{e.title}</div>
                </Card>
                  : <div></div>           
    ) ) }
    </div>
  );
};

export const Cal = () => {
    return <CalendarCreate/>
}