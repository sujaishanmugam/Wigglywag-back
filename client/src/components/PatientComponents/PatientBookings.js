import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getPatientAppointments } from '../../actions/appointmentActions';

import AppNavbar from '../GeneralComponents/AppNavbar';
import BookingItem from '../PatientComponents/BookingItem';
import appointment from '../../reducers/appointmentReducer';
import { getDoctors } from '../../actions/patientActions';
const PatientBookings = ({history,appointments, doctors,getDoctors,getPatientAppointments,user, location}) => {
  
  const {id} = user || location.state.user;
  
      useEffect(() => {
        getPatientAppointments(id);
        getDoctors({category:"All"})
      }, []); 


      function todayConvert() {
        var dateString = new Date();
            let month = dateString.toLocaleString('en-us', { month: 'short' });
            var day = String(dateString.getDate());
        return [month, parseInt(day)+",",dateString.getFullYear()].join(" ");
        }

      const dateComapre = (date) => { 
        var today = todayConvert();
        // today = today.split("th,").join();
        // date = date.split("th,").join();
       console.log(date)

        if (Date.parse(today) <= Date.parse(date) )
            return true;
        else
            return false;
    }
  const sortedAppointments=()=>{
    return appointments.filter(appointment=>{
      return dateComapre(appointment.date)
    }

    ).sort((a,b)=>{ 
      console.log(a.time<b.time);
      return (new Date(a.date+ " "+a.time) - new Date(b.date+ " "+b.time))
      ;})
      
  }

//   const sortedArr=arr.sort(function(a, b){
//     if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
//     if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
//     return 0;
// })

  return (
    <div className="Bookings">
      <AppNavbar bg="#e0fdf7" title="Your Bookings" backBtn={history.goBack} />
      <div className="container"> 
     
      {sortedAppointments().map((appointment)=>
        (<BookingItem key={appointment._id} appointment={appointment} doctor={doctors.find(doctor=>doctor._id===appointment.doctor._id)}/>))  
}
{/* {console.log("asd")} */}
      {
        
      sortedAppointments().length===0 &&
      <h1>You don't have any upcoming appointments!</h1>
      }
      
      </div>
    </div>
  );
};

PatientBookings.propTypes = {
  appointments: PropTypes.array.isRequired,
  getPatientAppointments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  doctors:state.doctor.doctors,
  user: state.auth.user
});

export default connect(mapStateToProps, { getDoctors,getPatientAppointments })(PatientBookings);
