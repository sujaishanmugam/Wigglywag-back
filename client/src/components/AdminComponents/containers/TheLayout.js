import React, { lazy,useState,useEffect } from 'react';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import AdminDashboard from'../AdminDashboard';
import { useSelector,connect  } from 'react-redux'
import { getUsers } from '../../../actions/authActions';
import { getDoctors } from '../../../actions/patientActions';

import { getAllAppointments } from '../../../actions/appointmentActions';
const TheLayout = (props) => {
  const users=useSelector(state=> state.auth.users)
  useEffect(() => {
    // console.log(notApprovedDoctors,users);
    
    // setNotAprovedDoctors(users.filter(user=>{return user.isApproved===false}))\
   props.getUsers();
    props.getAllAppointments();
    props.getDoctors({category:"All"})
   }, [props])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <AdminDashboard/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default connect(null, {getAllAppointments,getDoctors,getUsers} ) (TheLayout)
