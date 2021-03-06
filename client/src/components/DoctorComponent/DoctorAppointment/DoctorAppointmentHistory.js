import React, { useEffect, useState } from 'react';
import spinner from '../../../images/icon/spinner_1.gif'
import './DoctorAppointment.css'
import Sidebar from '../Sidebar/Sidebar';
import AppointmentCalendar from './AppointmentCalender';
import AppNavbar from '../../GeneralComponents/AppNavbar';
import { connect } from 'react-redux';
import Table from '../Dashboard/Table';
import { getDoctorAppointments } from '../../../actions/appointmentActions';

const DoctorAppointmentHistory = (props) => {

  const {id} = props.user;
  useEffect(() => {
    props.getDoctorAppointments(id);
 }, [getDoctorAppointments])

  

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

        if (Date.parse(today) >= Date.parse(date) )
            return true;
        else
            return false;
    }
    const sortedAppointments=()=>{
      return props.appointments.sort((a,b)=>{ 
        return (new Date(b.date+ " "+b.time) - new Date(a.date+ " "+a.time))
        ;}).filter(appointment=> dateComapre(appointment.date))
    }
 // const {appointments} = props || {};
// typeof array[index] == 'undefined'
  console.log( typeof props.appointments[0])
    return (
        <div className="container-fluid bg-light">
                <AppNavbar backBtn={props.history.goBack}/>
                  <div className='row'>
                    <Sidebar/>
                    {/* <AppointmentCalendar /> */}
                    {typeof props.appointments[0] &&
              
                         <Table 
                         rows={ sortedAppointments() }

                          
                            columns={ props.columns }
                            />    
}



                     </div> 
            </div>

    );
};


const mapStateToProps = state => ({
    appointments: state.appointment.appointments,
    user: state.auth.user,
    columns: state.table.appointmentsHistoryTable.columns,
  });
  
export default connect(mapStateToProps, { getDoctorAppointments })(DoctorAppointmentHistory);





