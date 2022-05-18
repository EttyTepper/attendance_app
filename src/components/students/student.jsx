import { TextField, Box, Button } from '@mui/material';
import React, {useState, useContext} from 'react';
import '../students/student.css';
import { StudentContext } from '../students/context';
import {ClassContext} from '../classes/context';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddBoxIcon from '@mui/icons-material/AddBox';

function StudentControl(){
    const {students, setStudents} = useContext(StudentContext);
    const {classes, setClasses} = useContext(ClassContext);
    const addStudent = props => {
        const newStudent = [...students, props];
        setStudents(newStudent);
    };
    const handleSubmit = () =>{

    }
    return(
    <div>
        STUDENT LISTS
        <div className='add-student'>
        <AddStudent addStudent={addStudent} />
        <LongMenu classes={classes} />
        <div className="student_names">
            {(students.length === 0) ?
                <div> </div>  :
                 
                students.map((stud, index) => (
                 
                    <StudentInfo 
                        stud={stud}
                        index={index}
                        key={index}   
                    />
                  
                ) ) }  
        </div>
        <IconButton onClick={handleSubmit}><AddBoxIcon/>Add Student</IconButton>
        </div>
    </div>
    )
};

function StudentInfo(props){
    return (
        <Box  className="class">
          
            <div sx={{float: 'center'}}>{props.firstName}</div> 
            <div sx={{float: 'center'}}>{props.lastName}</div> 
        </Box>
    )
};

function AddStudent(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

       // props.addStudent({name: value, day: props.personName});
      //  props.setNumStudents(0);
        props.addStudent({firstName: firstName, lastName: lastName});
       
    }
        return(
            <div>
            <TextField id="outlined-basic" variant="outlined" className="input"
                firstname={props.firstName}
                onChange={e => setFirstName(e.target.value)}/>
            <TextField id="outlined-basic" variant="outlined" className="input"
                lastname={props.lastname}
                onChange={e => setLastName(e.target.value)}/>
            <Button onSubmit={handleSubmit}>Add Student</Button>
           {/* grade should be a drop down */}
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
      setAnchorEl(null);
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
            <MenuItem key={cls.name} index={index} selected={cls === ''} onClick={handleClose}>
              {cls.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
export const Student = () =>{
    return <StudentControl />;
}