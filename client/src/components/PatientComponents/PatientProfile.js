import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReportsHistorty from './ReportsHistorty';
import AppNavbar from '../GeneralComponents/AppNavbar';

import { clearErrors } from '../../actions/errorActions';
import { update } from '../../actions/authActions';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import FileUpload from '../GeneralComponents/FilesComponents/FileUpload';
import { getPatientAppointments } from '../../actions/appointmentActions';
import DocumentsTab from './DocumentsTab';

const PatientProfile = (props) => {
  const idMatch = String(props.match.params.id)
      if(props.user.userType === 'doctor'){
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",idMatch);
        var user = props.users&& (props.users).find(user => user._id === idMatch);
        //var user = props.user

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", user)
      }
      else  {
        var {user} = props;
      }
      console.log(user);
  const
  {
    id,
    _id,
    name,
    email
  } = user||{ };

    const [userState,setUserState]=useState({email:email,
        id:id||_id,
        name:name,
       })
  const [tab, setTab] = useState(0);
  const [modal,setModal]=useState(false)
   
  useEffect(() => {
    console.log(userState.id);
    props.getPatientAppointments(idMatch);
 }, [])
 



  const handleClick = (e) => {
    const id = parseInt(e.target.id.split('-')[1]);
    setTab(id);
  };


  const toggle = () => {
    //Clear Errors
    props.clearErrors();
    setModal(!modal);
};
  const renderTab = () => {
    switch (tab) {
      case 0:
        return <ReportsHistorty/>;  ////////////////////////////////////////////changeeeeeeeee
      case 1:
        return <DocumentsTab documents={user.documents}/>;
    //   case 2:
    //     return <DoctorFeedback />;
      default:
        return 0;
    }
  };
  const onChange = (e) => {
    setUserState({...userState, [e.target.name]: e.target.value});
}
 PatientProfile.propTypes={
    update:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired

}
const onSubmit=(e)=>{
            e.preventDefault();
            console.log(userState)
            props.update({...userState,image:props.image});
            toggle();
}
  return (
    <div className="PatientProfile">
      <AppNavbar backBtn={props.history.goBack} bg="#266a61" title="Details" />
      {user&&<div>
          <div className="detail-card">
            <div className="UserDetail-info">
              <h4 className="title text-black font-weight-bold">
                {`User Profile`} 
              </h4>
              <div className="d-flex justify-content-center align-items-center">
                <img className="avatar" src={user.image} alt="Avatar" />
                {/* <img className="cta" src={email} alt="email" /> */}
              </div>
              {/* <p className="category">{singleDoctor.category}</p> */}
              <div className="container">
                <p>{`${email}`}</p>
                <p>{`${name}`}</p>
                <p>
                  {/* <img src={like} alt="likes" /> */}
                  {/* <span>{singleDoor.likes}</span> */}
                </p>
              </div>
            </div>
          </div>
          
          <div className="container d-flex tab-content">
            <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 0 ? 'tab-focus' : ''}`}
              id="tab-0"
              onClick={e => handleClick(e)}
            >
              History 
            </button>
            {/* {/* <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 1 ? 'tab-focus' : ''}`}
              id="tab-1"
              onClick={e => handleClick(e)}
            >
              Clinic Info
            </button> */}
            <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 1 ? 'tab-focus' : ''}`}
              id="tab-1"
              onClick={e => handleClick(e)}
            >
              Documents tab
            </button> 
          </div>
          {renderTab(props.user)}
          {props.user.userType==="patient"&&<Button onClick={toggle}
            className="book-btn"
          >
            Update Profile
          </Button>}
        </div>
}
        <Modal 
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    User Profile Update
                    </ModalHeader>
                        <ModalBody>
                            {/* { this.UserState.msg ? ( 
                            <Alert color='danger'> {this.UserState.msg} </Alert> 
                            ) : null} */}
                           <FileUpload type="image"/>
                          <Form onSubmit={onSubmit}>
                              <FormGroup>
                                {/* <Label for='email'>
                                      Email
                                  </Label>
                                  <Input
                                  type='email'
                                  name='email'
                                  id="email"
                                  
                                  className="mb-3"
                                  onChange={onChange}
                                  defaultValue={UserState.email}/> */}
                               
                                <Label for='name'>
                                      name
                                  </Label>
                                  <Input
                                  type='name'
                                  name='name'
                                  id="name"
                                  className="mb-3"
                                  onChange={onChange}
                                  defaultValue={userState.name}/>
                                
                                  <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
                                  block
                                  >
                                      Update</Button>
                              </FormGroup>
                              </Form>  
                        </ModalBody>
                </Modal>
    </div>
  );
};
const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user,
  users: state.auth.users,
  image:state.upload.image,
  error: state.error,

});

export default connect(mapStateToProps,{clearErrors,update, getPatientAppointments})(PatientProfile);
