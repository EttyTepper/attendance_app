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
import { ConnectingAirportsOutlined, TempleBuddhist } from '@mui/icons-material';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';

function StudentControl(){
    const {classes, setClasses} = useContext(ClassContext);
    const [classNameSelected, setClassNameSelected] = useState("");
    const addStudent = props => {
        const tempClasses = [...classes];
        const index = tempClasses.findIndex((cls) => cls.name === classNameSelected);
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
        STUDENT LISTS
        <div className='add-student'>
        <AddStudent addStudent={addStudent} />
        <LongMenu setClassNameSelected={setClassNameSelected} classes={classes} />

        
        </div>

        <div className="student_names">
            {console.log("by Map")}
            {console.log(classes[0])}
            {classes[0].students.length === 0 ?
                <div> there are zero students</div>  : (
       
                 
                classes[0].students.map((stud, index) => (
                 
                    <StudentInfo 
                        stud={stud}
                        index={index}
                        key={index}   
                    />
                  
                )) ) }  
        </div>
    </div>
    )
};

function StudentInfo(props){
    return (
        <Box  className="class">
          
            <div sx={{float: 'center'}}>{props.stud.firstName}</div> 
            <div sx={{float: 'center'}}>{props.stud.lastName}</div> 
        </Box>
    )
};

function AddStudent(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = () => {
       // e.preventDefault();
        console.log("in first method");
 
        props.addStudent({firstName: firstName, lastName: lastName, present: 0, absent: 0, tardy: 0});
       
    }
        return(
            <div>
            <TextField id="outlined-basic" variant="outlined" className="input"
                firstname={props.firstName}
                onChange={e => setFirstName(e.target.value)}/>
            <TextField id="outlined-basic" variant="outlined" className="input"
                lastname={props.lastname}
                onChange={e => setLastName(e.target.value)}/>

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
        </Menu>
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