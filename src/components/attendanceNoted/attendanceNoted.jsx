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
import Divider from '@mui/material/Divider'
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
    const currClassCopy = JSON.parse(JSON.stringify(currClass));
    const [helperText, setHelperText] = React.useState('');

    const submitAttendance = () => {
        const allClassesTemp = [...classes];
        setCurrClass(currClassCopy);
        classes.map((cls, index) => {
            if(cls.name === currClass.name){
                allClassesTemp[index] = currClassCopy;
            }
        });
        setClasses(allClassesTemp);
        setHelperText('Attendance has been submitted!');
    }

    return(
        <div>
            
            {/* <DatePick/> */}

            <Box sx={{marginTop: "5%", width: "50%", marginRight: "auto", marginLeft: "auto"}}>
            <Box sx={{marginBottom: "4%"}}>
            <Typography>Attendance</Typography>
            <Divider />
            </Box>

            <Typography align="center" variant="h3">{currClassCopy.name + " "} Class </Typography>
            { currClassCopy.students.map((stud, index) => (
                 
                    <StudentInfo 
                        stud={stud}
                        index={index}
                        key={index}   
                    />
                    
                  
                )) }
                <Button sx={{fontSize: "2em", float: "right", color: "orange"}} onClick={()=>submitAttendance()}>Submit Attendance</Button>
                <FormHelperText><Typography color="orange" fontSize="2em">{helperText}</Typography></FormHelperText>
          </Box>
          
        
        </div>
    );
}
function StudentInfo(props){

    return (
      <Grid item xs={4}>

        <Card sx={{padding: "2%", marginBottom:"2%", height:"100%", color: "rgb(235, 232, 232)", background: "rgb(2, 20, 92)", display: "flex", flexDirection: "row", alignContent: "center"}}>
        <Stack direction="row" spacing={23} alignContent="center" >
        
        <Typography align="center" variant="h5">
            <div>{props.stud.firstName + " " + props.stud.lastName} </div> 
        </Typography>
        <ErrorRadios stud={props.stud} />
        </Stack>
        </Card>
        
        </Grid>

    
    )
};

  function ErrorRadios(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };
  
  const handleClick = (event) => {
     event.preventDefault();
  
    if (value === 'present') {
        const amount =  props.stud.present;
        props.stud.present = amount + 1;
        setHelperText('Attendance noted!');
    } else if (value === 'absent') {
        const amount =  props.stud.absent;
        props.stud.absent = amount + 1;
        setHelperText('Attendance noted!');
    } else if (value === 'tardy'){
        const amount =  props.stud.tardy;
        props.stud.tardy = amount + 1;
        setHelperText('Attendance noted!');
    } else {
      setHelperText('Invalid update!');
    }
   
   };


  return (
    <form >
      <FormControl sx={{ m: 3 }} error={error} variant="standard"  id="demo-row-radio-buttons-group-label">
        <FormLabel id="demo-error-radios"></FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="present" control={<Radio sx={{color: "white"}} />} label="Present" />
          <FormControlLabel value="absent" control={<Radio sx={{color: "white"}}/>} label="Absent" />
          <FormControlLabel value="tardy" control={<Radio sx={{color: "white"}}/>} label="Tardy" />
        </RadioGroup>
        <FormHelperText><Typography color="orange">{helperText}</Typography></FormHelperText>
        <Button sx={{ mt: 1, mr: 1, color: "orange", outlineColor: "orange"}} type="submit" variant="outlined" onClick={handleClick}>
          UPDATE
        </Button>
      </FormControl>
    </form>
  );
}

export const Attendance =() =>{
    return <CreateAttendance/>
}