import React, { Component, useState  } from 'react';
//import InfiniteCalendar from 'react-infinite-calendar';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { DatePicker } from "@material-ui/pickers";
import 'rc-time-picker/assets/index.css';
//import 'react-infinite-calendar/styles.css';
import like from '../../assets/images/like.png';
import Navbar from './../GeneralComponents/AppNavbar'
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { connect } from 'react-redux';
import { getDoctors } from '../../actions/patientActions';

class DoctorBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      selectedDate: new Date(),
      time:null
        };
  }

  componentDidMount(){
  this.props.getDoctors({category:"All"})
}

  
  handleDateSelect = date => {
    console.log(moment(date).format('ll'))
    this.setState({ selectedDate: date,time:null });
    
  };
  handleHourChange = value => {
    console.log(value)
    // this.setState({ time });
  };
  handleTimeChange = time => {
    if(time){
      console.log(
    (time).set("minute",null)
    )
     this.setState({time}); 
    }
    else{
      this.setState({time:null})

    }
    
    
  };

  handleSubmit = () => {
    const { time, selectedDate } = this.state;
    const { location, history } = this.props;
    // const { doctor } = location.state;
    const id=String(this.props.match.params.id)

    const doctor=		this.props.doctors.find(user=>id===user._id);
    const disabledTakenHours=[]
    var BreakException = {};
var breakF=true;
var isTaken=false;
     if (!time || !selectedDate) {
      // eslint-disable-next-line no-alert
      alert('Selecting date and time is manadatory');
    } else {
      
      doctor.takenAppointments.forEach(object => {
        console.log(new Date(object.date),this.state.selectedDate);
        
          if(this.state.time&&new Date(object.date).getDate()===this.state.selectedDate.getDate()&&new Date(object.date).getMonth()===this.state.selectedDate.getMonth()&&new Date(object.date).getFullYear()===this.state.selectedDate.getFullYear())
         {  
          if(parseInt(object.time.slice(0,2))===(this.state.time).get('hour')&&parseInt(object.time.slice(3,5))===(this.state.time).get('minute'))
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

            history.push({
        pathname: '/confirm-booking',
        state: {
          doctor,
          date: moment(selectedDate).format('ll'),
          time: time.format('HH:mm'),
        }, });
      
            }
 }
  };
   generateOptions( excludedOptions=[15]) {
    const arr = [];
    for (let value = 0; value < 60; value=value+15) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }

  render() {
    const { today } = this.state;
    console.log(this.state.today)
    console.log(this.state.today.getTime()===this.state.selectedDate.getTime())
    const { location } = this.props;
    const id=String(this.props.match.params.id)

    const doctor=		this.props.doctors.find(user=>id===user._id);

   console.log(id);
    console.log(this.generateOptions()) 
    var date=moment(this.state.selectedDate).format('ll');
    const disabledHours=()=>{
    
      const disabledHours=[]
      const {today}=this.state
      console.log(today.getHours()) 
      if(this.state.today.getDate()===this.state.selectedDate.getDate()&&this.state.today.getMonth()===this.state.selectedDate.getMonth()&&this.state.today.getFullYear()===this.state.selectedDate.getFullYear()){
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
      if((!this.state.time)){
        return [0,15,30,45]
      }
      doctor.takenAppointments.forEach(object => {
        
          if(this.state.time&&new Date(object.date).getDate()===this.state.selectedDate.getDate()&&this.state.today.getMonth()===this.state.selectedDate.getMonth()&&this.state.today.getFullYear()===this.state.selectedDate.getFullYear())
         {           
          if(parseInt(object.time.slice(0,2))===(this.state.time).get('hour'))
          disabledTakenMin.push(parseInt(object.time.slice(3,5)))
          
          
        }  
      })
    return disabledTakenMin;
  } 
    return (
      
      <div className="DoctorBooking">
        <Navbar
          bg="#266a61"
          title="Confirm Timing"
          backBtn={this.props.history.goBack}
        />
        <div className="container">
          <div className="time mt-5">
            <p>Select Time & Date:</p>
          
            <TimePicker
              showSecond={false}
              className="time-picker"
              onChange={this.handleTimeChange}
              format="HH:mm "
              minuteStep={15}
              onOpen={this.handleHourChange}
              disabledHours={disabledHours}
              disabledMinutes={disableTakenMinutes}
              // disabledMinutes={disabledMinutes}
              inputReadOnly
              
            />
          </div>      

      <p>
        <strong>
        Selected date: {this.state.selectedDate ? format(this.state.selectedDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
        </strong>
      </p>
      <DatePickerCalendar 
      locale={enGB} 
      autoOk
      orientation="landscape"
      variant="static"
      openTo="date"
      date={this.state.selectedDate}
      onDateChange={this.handleDateSelect} 
      width="100%"
      minimumDate={moment().toDate()}
      height={300}
       />
  
{doctor&&
          <div className="detail">
            <button type="submit" onClick={this.handleSubmit} className="book-btn">
              Book Appointment
            </button>
            <h5 className="title">{`Dr ${doctor.name}`}</h5>
            <p className="category">{doctor.category}</p>
            <p className="address">{doctor.address}</p>
            <div className="d-flex exp">
              <p>{`$${doctor.fee}`}</p>
              <p>{`${doctor.exp} yrs of experience`}</p>
              <p>
                <img src={like} alt="likes" />
                <span>{doctor.likes}</span>
              </p>
            </div>
          </div>
  }
        </div>
        
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  doctors: state.doctor.doctors,
});

export default connect(mapStateToProps,{getDoctors})(DoctorBooking);
