import { TextField, Box } from '@mui/material';
import React, {useState, useContext} from 'react';
import '../students/student.css';
import {ClassContext} from '../classes/context';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

function StudentControl(){
    const {classes, setClasses} = useContext(ClassContext);
    const [classNameSelected, setClassNameSelected] = useState("");
    const tempClasses = [...classes];
    const index = tempClasses.findIndex((cls) => cls.name === classNameSelected);
    const addStudent = props => {
        const updatedClass = classes[index];
        const currStudentList = [...updatedClass.students]
        const newStudentList = [...currStudentList, props ];
        const temp =[];
        tempClasses.map((cls, index) =>{
            if(cls.name === classNameSelected){
                temp.push( {name: classNameSelected, day: cls.day, students: newStudentList });
            }else{
                temp.push( classes[index]);
                
            }
        });
        setClasses(temp);
    };

    return(
    <div>
        <Box sx={{color: 'orange', fontSize: '5vw', fontFamily: 'cursive', textAlign: 'center', marginTop: '2vw'}}>STUDENTS</Box>
        <div className='add-student'>
        <AddStudent addStudent={addStudent} setClassNameSelected={setClassNameSelected} classes={classes}/>     
        </div>

        <div className="student_names">
            {classes.length !== 0 && classNameSelected !== ""? <div>
             <Typography align="center" variant="h2" fontFamily="cursive">{classNameSelected}</Typography>
            {classes[index].students.length === 0 ?
                <div> </div> : (
                classes[index].students.map((stud, index) => (
                 
                    <StudentInfo 
                        stud={stud}
                        index={index}
                        key={index}   
                    />
                  
                )) ) } </div> : <div> </div>}
        </div>
    </div>
    )
};

function StudentInfo(props){
    return (
      <Grid item xs={4}>

        <Card sx={{marginLeft: "20%", marginTop: "1%", padding: "1%", width: "60%", height:"100%", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "rgb(235, 232, 232)", background: "rgb(2, 20, 92)"}}>
        
        <Box >
        <Stack direction="row" justifyContent= "space-between" fontSize="150%" >
        <Typography align="center" variant="h3">
            <div sx={{float: 'center'}}>{props.stud.firstName}</div> 
            <div sx={{float: 'center'}}>{props.stud.lastName}</div> 
        </Typography>
         <div>Present = {props.stud.present}</div>
         <div>Absent = {props.stud.absent}</div>
         <div>Tardy = {props.stud.tardy}</div>
        </Stack>
       
        </Box>

        </Card>
        </Grid>

    )
};

function AddStudent(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = () => {;
        if(firstName !== "" && lastName !== ""){
          props.addStudent({firstName: firstName, lastName: lastName, present: 0, tardy: 0, absent: 0});
        }
        
  
    }
        return(
            <div>
            <TextField id="outlined-basic" label="First Name" variant="outlined" className="input"
                firstname={props.firstName}
                onChange={e => setFirstName(e.target.value)}/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" className="input" 
                lastname={props.lastname}
                onChange={e => setLastName(e.target.value)}/>
            <LongMenu setClassNameSelected={props.setClassNameSelected} classes={props.classes} />
            <IconButton onClick={() => handleSubmit()} ><AddBoxIcon />Add Student</IconButton>
            </div>
        )
}


  
  const ITEM_HEIGHT = 48;

function LongMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => { 
        props.setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
            Select Class
          <MoreVertIcon />
        </IconButton>
        {props.classes.length !== 0 ? <div>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          
          {props.classes.map((cls, index) => (
              <ClassMenuItem key={index} setAnchorEl={setAnchorEl} setClassNameSelected={props.setClassNameSelected} cls={cls} handleClose={handleClose}/>
          ))}
        </Menu></div>: <div></div>}
      </div>
    );
  }

 const ClassMenuItem =(props)=>{
    const handleClose = () => {
        props.setClassNameSelected(props.cls.name);
        props.setAnchorEl(null);
      };
    
      return(
    <MenuItem key={props.cls.name} index={props.index} selected={props.cls === ''} onClick={handleClose} >
    {props.cls.name}
  </MenuItem>
      );
 } 
export const Student = () =>{
    return <StudentControl />;
}