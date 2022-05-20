import {ClassContext} from '../classes/context';
import {CurrClassContext} from '../classes/current_class_context';
import { useState, useContext } from 'react'; 
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ClassNames } from '@emotion/react';
import DatePicker from 'react-datepicker';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Divider } from '@mui/material';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


// main implementation. using selected and onChange as main props to get and change the selected date value
function DatePick () {
  const [startDate, setStartDate] = useState(new Date());
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
    console.log("currClass in attendance Noted");
    console.log(currClass);
    const addAtt = (props) =>{
        
    }
    return(
        <div>
            
            <DatePick/>
            { currClass.students.map((stud, index) => (
                 
                    <StudentInfo 
                        stud={stud}
                        index={index}
                        key={index}   
                    />
                    
                  
                )) }
        </div>
    );
}
function StudentInfo(props){
    return (
      <Grid item xs={4}>

        <Card sx={{ width: "50%",height:"100%",  display: "flex", flexDirection: "column", justifyContent: "space-between", color: "rgb(235, 232, 232)", background: "rgb(2, 20, 92)"}}>
        <Box >
        <Typography align="center" variant="h3">
            <div sx={{float: 'center'}}>{props.stud.firstName}</div> 
            <div sx={{float: 'center'}}>{props.stud.lastName}</div> 
        </Typography>
        <RadioButtonsGroup/>
        </Box>
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

export const Attendance =() =>{
    return <CreateAttendance/>
}