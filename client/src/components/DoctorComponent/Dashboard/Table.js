import React, { useState, useEffect } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import PopUpAlert from './PopUpAlert';
import ImageModal from './ImageModal';
import { Row, Col } from 'reactstrap';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import { getAppointmentsByDate, getDoctorAppointments } from '../../../actions/appointmentActions';
import { connect } from 'react-redux';
import appointment from '../../../reducers/appointmentReducer';
import spinner from '../../../images/icon/spinner_1.gif'
import TextField from '@material-ui/core/TextField';

export const Table = ({ rows, columns, imageModal, toggleModal, tableCallbacks, getAppointmentsByDate }) => {
    var currentLocation = window.location.href;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = String(date.getDate());
    const defaultValue = {
      year: year,
      month: month+1,
      day: parseInt(day)
    };

    var selectedDay = defaultValue;
    var textFieldDate = defaultValue;
    const pickDateHandler = (date) => {
      selectedDay = {
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: String(date.getDate())
      };  

      // textFieldDate = selectedDay.year.toString() +'-' + selectedDay.month.toString()
      // +'-' + selectedDay.day.toString();
      console.log(textFieldDate);
      getAppointmentsByDate(selectedDay);
    };
    
    return (
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          { rows.length > 0 && <PopUpAlert totalResults={ rows.length } />}
          { currentLocation.includes("doctorDashboard") &&
          <div className="table-heading">
            <h1>Upcoming Appointments</h1>  
           <div className="st-date-picker">
             
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <KeyboardDatePicker

                placeholder=""
                value={textFieldDate}
                onChange={(date) => pickDateHandler(date)}
                disablePast={true}
                InputProps={{ readOnly: true }}
                invalidDateMessage={false}
             //  TextFieldComponent={TextFieldComponent}
           //   inputVariant="filled"
             />
           </MuiPickersUtilsProvider>
         </div>
          </div>
          }  

{currentLocation.includes("doctorAppointments") && 
          
           (<h1>Your Appointments</h1> )
          }
          <ReactCollapsingTable columns={ columns }
                                rows={ rows }
                                rowSize={ 5 }
                                column='email'
                                callbacks={ tableCallbacks }
                                showSearch={ false }
                                showPagination={ true } />
          { imageModal && 
          <ImageModal isOpen={ imageModal.isOpen }
                      toggle={ toggleModal }
                      imageURL={ imageModal.imageURL } />
          }
          

        </Col>
        
      
      </Row>
    );
}

const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getAppointmentsByDate })(Table);
