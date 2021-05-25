import React, { useState} from 'react';
import './AppointmentModal.css'
import { useForm } from 'react-hook-form';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { deleteAppointment, getPatientAppointments, updateAppointment,getDoctorAppointments} from '../../actions/appointmentActions';
import { connect } from 'react-redux';
import {getSingleDoctor} from '../../actions/patientActions';

import {
  // Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearErrors } from '../../actions/errorActions';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './style.css'
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AppointmentModal = (props) => {
  const classes = useStyles();
  const { errors, register } = useForm();
  const [modal, setModal] = useState(false);

  var appointment = {...props.appointment};
  const {id} = props.user;
  const {userType} = props.user;
  const {doctor} = props;

  var todayDate = new Date();
  var dd = String(todayDate.getDate()).padStart(2, '0');
  var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = todayDate.getFullYear();
  
  todayDate = yyyy + '-' + mm + '-' + dd;





 const onSubmit = (data, e) => {
  const { time, date } = appointment;
  const disabledTakenHours=[]
  var BreakException = {};
  var breakF=true;
  var isTaken=false;
  if (!time || !date) {
    // eslint-disable-next-line no-alert
    alert('Selecting date and time is manadatory');
  } else {

    doctor.takenAppointments.forEach(object => {
      console.log(new Date(object.date),date);
      
        if(time&&new Date(object.date).getDate()===new Date(date).getDate()&&new Date(object.date).getMonth()===new Date(date).getMonth()&&new Date(object.date).getFullYear()===new Date(date).getFullYear())
       {  
         console.log("1");
        if(parseInt(object.time.slice(0,2))===parseInt(time.slice(0,2))&&parseInt(object.time.slice(3,5))===parseInt(time.slice(3,5)))
        {
          console.log("2");
          isTaken=true
         
          
        } 
      }
      });
    
        if(isTaken===true)
          {
            alert("The choosen appiontment is invalid");
          }
          else{ 
  // setAppointment({ ...appointment })
  console.log(appointment);
   props.updateAppointment(appointment);
   //if(userType==="doctor")
     // props.getDoctorAppointments(id);
    // if(userType==="patient")
    //   props.getPatientAppointments(id)
   toggle();
          }
        }

};





  const onChange = (e) => {
    appointment = {
      ...appointment,
      time:null,
      date: moment(e.target.value).format('ll')
    }
   // setAppointment({...appointment, date: moment(e.target.value).format('MMM Do, YYYY') }) 

  };

  const onHandleTimeChange = (time) => {
    if(time)
    appointment = {
      ...appointment,
      time: time.format('HH:mm')
    };
    else{
      appointment={...appointment,time:null};

    }
  };
  const toggle = () => {
    //Clear Errors
    props.clearErrors();
    props.getSingleDoctor(appointment.doctor._id);
    setModal(!modal);
};

const statusHandler = async (e) => {
  e.persist();
  appointment = {
      ...appointment,
      [e.target.name]: e.target.value
  }
  await props.updateAppointment({...appointment,[e.target.name]: e.target.value});
  alert(`Appointment ${e.target.value}`);
}

const handleClickDelete = () => {
  props.deleteAppointment(appointment._id);
}

const submit = () => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h1>Are you sure?</h1>
          <p>You want to delete this file?</p>
          <button onClick={onClose}>No</button>
          <button
            onClick={() => {
              handleClickDelete();
              onClose();
            }}
          >
            Yes, Delete it!
          </button>
        </div>
      );
    }
  });
};


const disabledHours=()=>{
    
  const disabledHours=[]
  const today=new Date();
  console.log(today) 
  if(today.getDate()===new Date(appointment.date).getDate()){
    for(var i=today.getHours();i>=0;i--){
    disabledHours.push(i)
    console.log(disabledHours)
   
  }
  
  }
  return disabledHours;
  

}


const  disableTakenMinutes=()=>{
  console.log("test",);
  const disabledTakenMin=[]
  if((!appointment.time)){
    console.log(appointment.time);

    return [0,15,30,45]
  }
  doctor.takenAppointments.forEach(object => {
    console.log(new Date(object.date).getDate(),new Date(appointment.date).getDate()
    );
      if(appointment.time&&new Date(object.date).getDate()===new Date(appointment.date).getDate()
      &&new Date(object.date).getMonth()===new Date(appointment.date).getMonth()
      &&new Date(object.date).getFullYear()===new Date(appointment.date).getFullYear())
     {           
      console.log(parseInt(object.time.slice(0,2)),parseInt(appointment.time.slice(0,2)));
      if(parseInt(object.time.slice(0,2))===parseInt(appointment.time.slice(0,2))){
        console.log("1111");
      disabledTakenMin.push(parseInt(object.time.slice(3,5)))
      }
      
      
      
    }  
  })
return disabledTakenMin;
} 


  return (
        <div>
              {
                (userType==="doctor"&&appointment.status) &&
                 <select onChange={(e)=>statusHandler(e,appointment._id)} className="form-control-sm text-light select" name="status">
                 <option selected disabled hidden>{appointment.status}</option>
                 <option value="approved">Approved</option>
                 <option value="pending">Pending</option>
                 </select>
                }
                <button data-toggle="modal" onClick={toggle} className="btn btn-warning text-light"> 
                <span className="fa fa-pencil btn btn-warning text-light"/> 
                </button> 
              
                <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={submit}
                startIcon={<DeleteIcon />}
              >
                Delete
           </Button>

                <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Update Appointment
                    </ModalHeader>
                        <ModalBody>
                          <Form>
                              <FormGroup >
                                <Label for='date'> 
                                      Date
                                  </Label>
                                  <Input
                                 defaultValue={appointment.date} type="date" 
                                 min={todayDate}
                                 className="form-control text-uppercase" name="date"
                                 onChange={onChange} 
                                //  ref={register({ required: true })}
                                 />
                                {/* {errors.date && <span className="text-danger">Date is required</span>} */}

                                <Label for='fromTime'>
                                 Start Time
                                  </Label>
                            
                                <TimePicker
                                  showSecond={false}
                                  className="time-picker"
                                  onChange={onHandleTimeChange}
                                  format="HH:mm"
                                  minuteStep = { 15 }
                                  disabledHours={disabledHours}
                                  disabledMinutes={disableTakenMinutes}
                                  inputReadOnly
                                  />
                                {errors.from && <span className="text-danger">Time is required</span>}

                                  {/* <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
                                  onClick={toggle}
                                  block
                                  >
                                  Cancel</Button> */}
                                <div>
                                  <Button
                                  color="primary"
                                  // style = {{marginTop: '2rem'}}
                                  onClick={onSubmit}
                                  className={classes.button}
                                  startIcon={<SaveIcon />}
                                  variant="contained"
                                  size="large"
                                  
                                  block
                                  >
                                  Update Appointment</Button>
                                  </div>
                              </FormGroup>
                              </Form>  
                        </ModalBody>
                </Modal>
            </div>

  );
};

 
const mapStateToProps = state => ({
    user: state.auth.user,
    doctor:state.doctor.singleDoctor
  });
export default connect(mapStateToProps, { deleteAppointment, updateAppointment, clearErrors,
   getDoctorAppointments,getPatientAppointments, getSingleDoctor})(AppointmentModal);
