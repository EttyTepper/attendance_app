import {ClassContext} from '../classes/context';
import {CurrClassContext} from '../classes/current_class_context';
import { CalendarContext } from '../calendar/context';
import { useState, useContext } from 'react'; 
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DatePicker from 'react-datepicker';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


// main implementation. using selected and onChange as main props to get and change the selected date value
function DatePick () {
  const [startDate, setStartDate] = useState(new Date());
//   const {events, setEvents} = useContext(CalendarContext);
//   console.log(events);
  return (
    <DatePicker 
      selected={startDate} 
      onChange={date => setStartDate(date)} 
    />
  );
};
function CreateAttendance(){
    const {classes, setClasses} = useContext(ClassContext);
    const {currClass, setCurrClass} = useContext(CurrClassContext);
    console.log("check this");
    console.log(currClass);
    const currClassCopy = JSON.parse(JSON.stringify(currClass));
    console.log("copy");
    console.log(currClassCopy);
    const handleClick = props =>{
       console.log("Attend. noted!");
    //    props.students.map((stud, index) => (
                 
                  
    //      {firstName: stud.firstName, lastName: stud.lastName, present: props.RadioButtonsGroup.value, tardy: 0, absent: 0}   
                  
    //     ))
      
    }
    console.log("currClass in attendance Noted");
    console.log(currClass);
    const submitAttendance = () => {
        const allClassesTemp = [...classes];
        setCurrClass(currClassCopy);
        allClassesTemp.map((cls, index) => {
            if(cls.name === currClass.name){
                cls = currClass;
            }
        });
        setClasses(allClassesTemp);
    }

    return(
        <div>
            
            <DatePick/>
            {console.log("list of students")}
            {console.log(currClassCopy.students)}
            { currClass.students.map((stud, index) => (
                 
                    <StudentInfo 
                        stud={stud}
                        index={index}
                        key={index}   
                    />
                    
                  
                )) }
           <Button onClick={()=>submitAttendance()}>Submit Attendance</Button>
        </div>
    );
}
function StudentInfo(props){

    return (
      <Grid item xs={4}>

        <Card sx={{ height:"100%",  display: "flex", flexDirection: "column", justifyContent: "space-between", color: "rgb(235, 232, 232)", background: "rgb(2, 20, 92)"}}>
        <Stack direction="row" spacing={10} >
        <div>
        <Box >
        
        <Typography align="center" variant="h3">
            <div sx={{float: 'center'}}>{props.stud.firstName}</div> 
            <div sx={{float: 'center'}}>{props.stud.lastName}</div> 
        </Typography>
        <ErrorRadios stud={props.stud}/>
        </Box>
        </div>
        </Stack>
        </Card>
        
        </Grid>

    
    )
};

function AddAtt(props){

}
function RadioButtonsGroup() {
  
    return (
    <div >
    <FormControl sx={{align: "center"}}>
      <FormLabel id="demo-row-radio-buttons-group-label">Attendance</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="present" control={<Radio />} label="Present" />
        <FormControlLabel value="tardy" control={<Radio />} label="Tardy" />
        <FormControlLabel value="absent" control={<Radio />} label="Absent" />
        {/* <FormControlLabel
          value="disabled"
          disabled
          control={<Radio />}
          label="other"
        /> */}
      </RadioGroup>
    </FormControl>
      </div>
    );
  }

  function ErrorRadios(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleClick = () => {
    // event.preventDefault();

    if (value === 'present') {
        const amount =  props.stud.present;
        props.stud.present = amount + 1;
    //   setHelperText('You got it!');
    //   setError(false);
    } else if (value === 'absent') {
        const amount =  props.stud.absent;
        props.stud.absent = amount + 1;
    //   setHelperText('Sorry, wrong answer!');
    //   setError(true);
    } else {
        const amount =  props.stud.tardy;
        props.stud.tardy = amount + 1;
    //   setHelperText('Please select an option.');
    //   setError(true);
    }
  };

  return (
    <form >
      <FormControl sx={{ m: 3 }} error={error} variant="standard"  id="demo-row-radio-buttons-group-label">
        <FormLabel id="demo-error-radios">Pop quiz: MUI is...</FormLabel>
        <RadioGroup
            row
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="present" control={<Radio />} label="Present" />
          <FormControlLabel value="absent" control={<Radio />} label="Absent" />
          <FormControlLabel value="tardy" control={<Radio />} label="Tardy" />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" onClick={handleClick}>
          Submit Individual
        </Button>
      </FormControl>
    </form>
  );
}

export const Attendance =() =>{
    return <CreateAttendance/>
}