import React, { useState, useContext } from "react";
import './class.css';
import {ClassContext} from '../classes/context';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { IconButton, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

function CreateClass(){
    const {classes, setClasses} = useContext(ClassContext);
    const [personName, setPersonName] = useState([]);
    const addClass = props => {
        const newClass = [...classes, props];
        setClasses(newClass);
        console.log(classes);
    };

    return (
       <div>
        <div className="class-list-container">   
      
          <AddClass sx={{marginTop: '5ch'}} personName={personName} setPersonName={setPersonName} addClass={addClass}  />
        </div>
          <Box sx={{ flexGrow: 1, margin: "5%" }}>           
           <Grid  container spacing={4}>
           {/* <div className="class_names"> */}
            {(classes.length === 0) ?
                <div> </div>  :
                 
                classes.map((cls, index) => (
                  
                    <Class 
                        cls={cls}
                        index={index}
                        key={index}   
                    />
                 
                  
                ) ) }
              
            {/* </div> */}
            </Grid> 
            </Box>
           
          
        </div>
    )
}

function AddClass(props) {
    const [value, setValue] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
        if(value !== '' ){
          props.addClass({name: value, day: props.personName, students: []});
        }
      
        setValue("");
    }


    return (
        <form onSubmit={handleSubmit} >
          <InputLabel sx={{marginTop: '2ch', fontWeight: 'bold', fontSize: '3ch'}}>Name</InputLabel>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '55ch', height: '1ch' },
            }}
            validate
            autoComplete="off"
            
          >
            
            <TextField id="outlined-basic" variant="outlined" className="input"
                name={value}
                day={props.personName}
                onChange={e => setValue(e.target.value)}/>
           
          </Box>
          <br/><br/>
          <MultipleSelect sx={{clear: 'left'}} personName={props.personName} setPersonName={props.setPersonName} />   
           <IconButton onClick={handleSubmit}><AddBoxIcon/>Add Class</IconButton>
        </form>
    )
}
function Class(props){
    
  
    return (
        <Grid item xs={4}>


          {/* boxShadow: 2,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",  */}
        <Card  className="class" sx={{ height:"100%",  display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <div>
          <Typography align="center"><MenuBookIcon sx={{fontSize: "3em"}}/ ></Typography>
          <Typography align="center" variant="h3">{props.cls.name} </Typography>
          </div>
          <Divider sx={{backgroundColor: "white"}} />
          <Stack direction="row" spacing={10} >
            <div>
            <Box>
            <Stack direction ="row" spacing={3} >
            <Typography variant="h5">Meeting Days:</Typography>
            {props.cls.day.map((item,index)=>(
                <div key={index}><Typography variant="h5">{item}</Typography></div>
            ))}
            </Stack>
            </Box>
            </div>
            <div className="studentIconAndAmount">
           <PersonIcon sx={{fontSize: "5em"}}/><div><Typography align="center" variant="h5">{props.cls.students.length}</Typography></div>
           </div>
           </Stack>
        </Card>
        </Grid>


    )
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Sun',
  'Mon',
  'Tues',
  'Wed',
  'Thurs',
  'Fri',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

function MultipleSelect(props) {
  const theme = useTheme();

  const [value, setValue] = useState("");


  const handleChange = (event) => {

    const {
      target: { value },
    } = event;
    props.setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-name-label"> Days</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={props.personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
       
      </FormControl>
  
        
       
        
    </div>
  );
}



export const Class_Students = () => {
    return <CreateClass/>;
}