import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppNavbar from '../GeneralComponents/AppNavbar';

import { createAppointment } from '../../actions/appointmentActions';

const BookingForm = (props) => {
  const { location } = props;
  var { doctor, date, time } = location.state;
  const { createAppointment, user } = props;
  

  const [formData, setFormData] = useState({
    reason: '',
  });

  const { reason } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    var isTaken=false;
     if (!time || !date) {
      // eslint-disable-next-line no-alert
      alert('Selecting date and time is manadatory');
    } else {
      if(props.singleDoctor){
              doctor=props.singleDoctor

      }
      doctor.takenAppointments.forEach(object => {
        console.log(new Date(object.date),date);
        
          if(time&&new Date(object.date).getDate()===new Date(date).getDate()&&new Date(object.date).getMonth()===new Date(date).getMonth()&&new Date(object.date).getFullYear()===new Date(date).getFullYear())
         {  
          if(parseInt(object.time.slice(0,2))===parseInt(time.slice(0,2))&&parseInt(object.time.slice(3,5))===parseInt(time.slice(3,5)))
          {
            isTaken=true
           
            
          } 
        }
        });
      
          if(isTaken===true)
            {
              alert("The choosen appiontment is invalid");
            }
            else{ 

    if (!reason) {
      // eslint-disable-next-line no-alert
      alert('Please fill in your reason and patient name');
    } else {
      const { user } = props;
      console.log(user)
      
      const appointmentInfo = {
        reason,
        date,
        time,
        doctor: doctor,
        patient: user,
        status: "pending",
        prescription: ""
      };
      createAppointment(appointmentInfo);
    
      props.history.push({
        state: {user: user,
                appointment: appointmentInfo},
                pathname:'/confirmed'});
    }
  }
}
  };

  return (
    <div className="BookingForm">
      <AppNavbar backBtn={props.history.goBack}title="Confirm Booking" bg="#e0fdf7" />
      <div className="detail">
        <h5 className="title">{`Dr ${doctor.name}`}</h5>
        <p className="category">{doctor.category}</p>
        <p className="address">{doctor.address}</p>
        <p className="date">{`${date} | ${time}`}</p>
      </div>
      <form onSubmit={e => handleSubmit(e)} className="container">
        <div className="form-field">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user ? user.name : ''}
            disabled
          />
        </div>
        <div className="form-field">
          <label htmlFor="reason">Reason for visit</label>
          <input
            type="text"
            name="reason"
            id="reason"
            required
            value={reason}
            onChange={e => handleChange(e)}
            placeholder="Enter your reason for visit"
          />
        </div>
        
        <input className="book-btn" type="submit" value="Confirm Booking" />
      </form>
    </div>
  );
};

BookingForm.propTypes = {
  user: PropTypes.object,
  createAppointment: PropTypes.func,
};

const mapStateToProps = state => (
  {user: state.auth.user,
    singleDoctor: state.doctor.singleDoctor,
});

export default connect(mapStateToProps, { createAppointment })(BookingForm);
