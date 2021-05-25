import React, { lazy,useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CCardGroup
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
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
import MainChartExample from './MainChartExample.js'
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch, Provider } from 'react-redux'
import{approveDoctor,deleteUser,getUsers} from "../../actions/authActions"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import '../DoctorComponent/Dashboard/style.css'

import { connect } from 'react-redux';
import Otp from '../GeneralComponents/Auth/Otp.js'
import { useState } from 'react';
const WidgetsDropdown = lazy(() => import('./WidgetsDropdown'))
const WidgetsBrand = lazy(() => import('./WidgetsBrand'))


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


  
      
const AdminUsers = (props) => {
 const classes = useStyles();
  // const users = (useSelector(state => state.auth.users)).filter(user=>{return user.userType!=="admin"})
//   const appointments=useSelector(state => state.appointment.allAppointments)
//   const doctors=useSelector(state => state.doctor.doctors)
 var [modal,setModal]=useState(false)
 var {users}=props;
var [user,setUser]=useState(null)
// const [users,setUsers] = useState(null)
const {getUsers}=props
useEffect(() => {
    if(!props.users)
    {
      getUsers()
    }
    
},[props.users,getUsers]);
//   const notApprovedDoctors=users.filter(user=>{return user.isApproved===true});
 const handleClickDelete = (user) => {
  props.deleteUser(user);
  
  // getUsers();

  console.log("delete");
}

const toggle = () => {
  //Clear Errors
  // props.clearErrors();
  console.log(modal);
  setModal(!modal);
};

const submit = (user) => {
  setModal(!modal);
  setUser(user)

 
  

  // confirmAlert({
  //   customUI: ({ onClose }) => { 
  //     return (
  //       <div >
  //         <h1>Are you sure?</h1>
  //         <p>You want to delete this file?</p>
  //         <button onClick={onClose}>No</button>
  //         <button
  //           onClick={() => {
  //             handleClickDelete(user);
  //             setUser(user)
  //             onClose();
  //           }}
  //         >
  //           Yes, Delete it!
  //         </button>
  //       </div>
  //     );
  //   }
  // });
};
  return (
    <>
    
     

      <CRow>
        <CCol>

              <br />

              <table className="table ">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>User Name</th>
                    <th >Email</th>
                    <th>User Type</th>
                    
                  
                  </tr>
                </thead>
                <tbody>
                  {users&&users.map(user => {
                    return(
                    <tr>
                      {console.log(user.name)}
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={user.image} className="c-avatar-img" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>{user.name}</div>
                      <div className="small text-muted">
                        {/* <span>New</span> | Registered: Jan 1, 2015 */}
                      </div>
                    </td>
                    <td>
                    <div>{user.email}</div>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                        {user.userType}
                        </div>
                      </div>
                    </td>
                    
                    <td>

                    <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={()=>submit(user)}
                startIcon={<DeleteIcon />}
              >
                Delete
           </Button>

                    </td>
                  </tr>
                    
                  )})}

                  
                </tbody>
              </table>
        </CCol>
      </CRow>
      

 <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Delete User
                    </ModalHeader>
                        <ModalBody>
                        <Otp user={user} onClose={toggle} onClick={handleClickDelete} />
                        </ModalBody>
                        </Modal>

    </>
  )
}
const mapStateToProps = state => ({
  users: state.auth.users&& state.auth.users.filter(user=>{return user.userType!=="admin"}),
});



export default connect(mapStateToProps, {getUsers,approveDoctor,deleteUser} ) (AdminUsers)
