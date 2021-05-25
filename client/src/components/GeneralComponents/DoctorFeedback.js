import React, { useState} from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { addDoctorFeedback } from "../../actions/doctorActions"; 
import { connect } from 'react-redux';
import moment from 'moment';

const DoctorFeedback = (props) =>{
  // const { errors, register } = useForm();


 const [feedback, setFeedback] = useState({feedback:"",id:props.singleDoctor._id,patientId:props.user.id,date:String(moment(new Date()).format('YYYY-MM-DD'))});
  const [modal, setModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([...props.singleDoctor.feedbacks].reverse());
//   var doctor = {...props.user};
//   const {id} = props.user;
//   const {userType} = props.user;
 
  const onChange = (e) => {

    setFeedback({...feedback, [e.target.name]: e.target.value});
    }
      const onSubmit = (data, e) => {
        // setAppointment({ ...appointment })
        console.log(feedback);
         props.addDoctorFeedback(feedback);
        //  props.getSingleDoctor(doctor.id);
         //if(userType==="doctor")
           // props.getDoctorAppointments(id);
        //   if(userType==="patient")
        //     props.getPatientAppointments(id)
        setFeedbacks([feedback,...feedbacks])
         toggle();
         
      
      };
      const toggle = () => {
        //Clear Errors
        // props.clearErrors();
        console.log(modal);
        setModal(!modal);
    };

console.log(feedbacks)

return(
  

 <div className="DoctorDetail-feedback container">
  { props.user.userType === "patient" &&<button data-toggle="modal" onClick={toggle} className="btn btn-warning text-light"> 
    <span className="fa fa-plus btn btn-warning text-light"/> 
    </button> 
}

    <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Add Feedback
                    </ModalHeader>
                        <ModalBody>
                        <Form onSubmit={onSubmit}>
                              <FormGroup >
                              <Label for='feedback'>
                                      feedback
                                  </Label>
                                  <Input
                                  type='text'
                                  name='feedback'
                                  id="feedback"
                                  className="mb-3"
                                  onChange={onChange}
                                  placeholder="Enter doctor's Feedback"
                                  />
                                    <div>
                                  <Button
                                  color="primary"
                                  // style = {{marginTop: '2rem'}}
                                  onClick={onSubmit}
                                  // className={classes.button}
                                  // startIcon={<SaveIcon />}
                                  variant="contained"
                                  size="large"
                                  
                                  block
                                  >
                                  Update Details</Button>
                                  </div>

                                  </FormGroup>
                              </Form>
                        </ModalBody>
                        </Modal>
                        {console.log(props.singleDoctor.feedbacks)}
    {props&&feedbacks.map((feedback,index)=>{
      const user=props.users.find(user=>user._id===feedback.patientId)
      return(
        user&&(
        <div key={index} className="Feedback">
        <div className="d-flex">
          <div className="Doctor-img">
            <img src={user.image} alt="Avatar" />
          </div>
          <div className="Doctor-info d-flex justify-content-between w-100">
            <div>
            <h6 className="Feedback-title"> {user.name}</h6>

              <p className="Doctor-feedback"> {feedback.feedback}</p>
              <p className="Doctor-feedback-date"> {feedback.date}</p>
              
            </div>
            
          </div>
        </div>
        
      </div>
        )


    //   <div className="content">
    //   <p className="date">10 days ago</p>
    //   <h6>Verified User - {feedback.patientName}</h6>
    //   <p>
    //    
    //   </p>
    // </div>


      ) 
      }
        
        )
    }
    
    {/* <div className="content">
      <p className="date">10 days ago</p>
      <h6>Verified User - 1</h6>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem expedita
        velit laudantium voluptate ullam perspiciatis mollitia! Placeat
        sapiente odit, vitae minima libero exercitationem alias non eos
        necessitatibus quam ut nisi rem, nesciunt maiores et, quisquam quaerat
        amet impedit ullam itaque magni voluptates reprehenderit debitis.
        Voluptatum ullam architecto laudantium quidem nemo minima expedita
        omnis voluptatem ea, necessitatibus quo, commodi fuga perspiciatis.
      </p>
    </div>
    <div className="content">
      <p className="date">10 days ago</p>
      <h6>Verified User - 1</h6>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem expedita
        velit laudantium voluptate ullam perspiciatis mollitia! Placeat
        sapiente odit, vitae minima libero exercitationem alias non eos
        necessitatibus quam ut nisi rem, nesciunt maiores et, quisquam quaerat
        amet impedit ullam itaque magni voluptates reprehenderit debitis.
        Voluptatum ullam architecto laudantium quidem nemo minima expedita
        omnis voluptatem ea, necessitatibus quo, commodi fuga perspiciatis.
      </p>
    </div>
    <div className="content">
      <p className="date">10 days ago</p>
      <h6>Verified User - 1</h6>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem expedita
        velit laudantium voluptate ullam perspiciatis mollitia! Placeat
        sapiente odit, vitae minima libero exercitationem alias non eos
        necessitatibus quam ut nisi rem, nesciunt maiores et, quisquam quaerat
        amet impedit ullam itaque magni voluptates reprehenderit debitis.
        Voluptatum ullam architecto laudantium quidem nemo minima expedita
        omnis voluptatem ea, necessitatibus quo, commodi fuga perspiciatis.
      </p>
    </div> */}
  </div>
)} ;
const mapStateToProps = state => ({
  user: state.auth.user,
  users:state.auth.users,
  singleDoctor:state.doctor.singleDoctor
});

export default connect (mapStateToProps,{addDoctorFeedback})(DoctorFeedback);
