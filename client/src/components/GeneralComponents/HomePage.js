import React, { Component} from 'react';
import { connect } from 'react-redux';

import DoctorPanel from './../DoctorComponent/DoctorPanel';
import PatientPanel from '../PatientComponents/PatientPanel';
import AppNavbar from './AppNavbar';
import { getUsers, verify } from '../../actions/authActions';
import { getDoctors } from '../../actions/patientActions';

import { getAllAppointments } from '../../actions/appointmentActions';
import { TheLayout } from '../AdminComponents/containers';


class HomePage extends Component {
    
     checkType = (userType) => {
        console.log(userType)
        console.log("inside")
        switch(userType){
            case "patient":
                return <PatientPanel/>
            case "doctor":
                return <DoctorPanel/>
            case "admin":
                console.log("bug"); 
                return <TheLayout/> 
            default:
                return;
        }
        }
        


    render(){
        const {user, auth} = this.props;
        const userType = (( user || {} ).userType || {})
        
        return(
            <div>
                  <AppNavbar />
                  {user?
                this.checkType(userType):auth===false && <h4 className="mb-3 ml-4">Please Log in to manage account</h4>}
                 {/* : <h1 className="mb-3 ml-4">Transition</h1> } */}
            </div>
        )
    }


}

const mapStateToProps = state => ({
    user: state.auth.user,
    auth: state.auth.isAuthenticated,
    otp:state.auth.otp

});

export default connect(mapStateToProps, {getUsers,getAllAppointments,getDoctors, verify} )(HomePage);