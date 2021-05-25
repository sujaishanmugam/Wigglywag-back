import React, { lazy,useState,useEffect } from 'react'
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

import { getUsers } from '../../actions/authActions';
import MainChartExample from './MainChartExample.js'

import { useSelector, useDispatch } from 'react-redux'
import{approveDoctor} from "../../actions/authActions"
import { connect } from 'react-redux';
const WidgetsDropdown = lazy(() => import('./WidgetsDropdown'))
const WidgetsBrand = lazy(() => import('./WidgetsBrand'))


const AdminDashboard = (props) => {
  const statusHandler =  async(e,user) => {
    e.persist();
    e.target.value==="approved"?
     user = {...user,[e.target.name]:true }:
     user= {...user,[e.target.name]:false };
   console.log(user)
    await props.approveDoctor(user);
    props.getUsers()
    setNotApprovedDoctors(users.filter(user=>{return user.isApproved===false}))
    alert(`Appointment ${e.target.value}`);
   }
  const users = useSelector(state => state.auth.users)

  const appointments=useSelector(state => state.appointment.allAppointments)
  const doctors=useSelector(state => state.doctor.doctors)
  const [notApprovedDoctors,setNotApprovedDoctors]=useState(users&&users.filter(user=>{return user.isApproved===false}));


  // useEffect(() => {
  //   // console.log(notApprovedDoctors,users);
    
  //   // setNotAprovedDoctors(users.filter(user=>{return user.isApproved===false}))\
  //  props.getUsers();
  //   props.getAllAppointments();
  //   props.getDoctors({category:"All"})
  //  }, [users])

  const labels= [ 
    // 'All',
    'General Doctor',
    'Pet Mental Health',
    'Pet Skin',
    'Pet Hair care',
    'Pet Nutrition',
    'Second Vet consultation',
    'Pet Parenting consultation',
];
const getAppointmentsData=()=>{
  const data=[];
  
    data[0]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Jan'}).length;
    data[1]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Feb'}).length;
    data[2]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Mar'}).length;
    data[3]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Apr'}).length;
    data[4]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='May'}).length;
    data[5]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Jun'}).length;
    data[6]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Jul'}).length;
    data[7]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Aug'}).length;
    data[8]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Sep'}).length;
    data[9]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Oct'}).length;
    data[10]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Nov'}).length;
    data[11]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Dec'}).length;

  
 
  return data;
}


const getDataDoctors=()=>{
  const data=[];
  for (let index = 0; index < labels.length; index++) {
    data[index]=doctors.filter(doctor=>{return doctor.category===labels[index]}).length;
    
  }
    // data[0]=doctors.filter(doctor=>{return doctor.category===labels[0]}).length;
    // data[1]=doctors.filter(doctor=>{return doctor.category===labels[1]}).length;
    // data[2]=doctors.filter(doctor=>{return doctor.category===labels[2]}).length;
    // data[3]=doctors.filter(doctor=>{return doctor.category===labels[3]}).length;
    // data[4]=doctors.filter(doctor=>{return doctor.category===labels[4]}).length;
    // data[5]=doctors.filter(doctor=>{return doctor.category===labels[5]}).length;
    // data[6]=doctors.filter(doctor=>{return doctor.category===labels[6]}).length
    // data[7]=doctors.filter(doctor=>{return doctor.category===labels[7]}).length
    // data[8]=doctors.filter(doctor=>{return doctor.category===labels[8]}).length
    // data[9]=doctors.filter(doctor=>{return doctor.category===labels[9]}).length
   

  
 
  return data;
}
  return (
    <>
    {/* {console.log(notApprovedDoctors)} */}
      <WidgetsDropdown />
      <CCardGroup columns className = "cols-2" >
      <CCard>
        <CCardHeader>
          Bar Chart
          {/* <DocsLink href="http://www.chartjs.org"/> */}
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'Exo-Clinics Appointments',
                backgroundColor: '#41B883',
                data: getAppointmentsData()
              }
            ]}
            labels="months"
            options={{
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Pie Chart
        </CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DA1B15',
                  '#FD1B16',
                  '#AB1B17',
                  '#AD1B18',
                  '#WD1B19',
                  '#F46651',


                ],
                data: getDataDoctors()
              }
            ]}
            labels={ labels}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      </CCardGroup>



      
      
      

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Traffic {' & '} Sales
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Monday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="34" />
                      <CProgress className="progress-xs" color="danger" value="78" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Tuesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="56" />
                      <CProgress className="progress-xs" color="danger" value="94" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Wednesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="12" />
                      <CProgress className="progress-xs" color="danger" value="67" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Thursday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                      <CProgress className="progress-xs" color="danger" value="91" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Friday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="22" />
                      <CProgress className="progress-xs" color="danger" value="73" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Saturday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="53" />
                      <CProgress className="progress-xs" color="danger" value="82" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Sunday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="9" />
                      <CProgress className="progress-xs" color="danger" value="69" />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      New clients
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user-female" />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="37" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-globe-alt" />
                      <span className="title">Organic Search</span>
                      <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="56" />
                    </div>
                  </div>


                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-facebook" className="progress-group-icon" />
                      <span className="title">Facebook</span>
                      <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="15" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-twitter" className="progress-group-icon" />
                      <span className="title">Twitter</span>
                      <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="11" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-linkedin" className="progress-group-icon" />
                      <span className="title">LinkedIn</span>
                      <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="8" />
                    </div>
                  </div>
                  <div className="divider text-center">
                    <CButton color="link" size="sm" className="text-muted">
                      <CIcon name="cil-options" />
                    </CButton>
                  </div>

                </CCol>
              </CRow>

              <br />

              <table className="table ">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Doctor Name</th>
                    <th className="text-center">Country</th>
                    <th>Usage</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {notApprovedDoctors&&notApprovedDoctors.map(doctor => {
                    return(
                    <tr>
                      {console.log(doctor.name)}
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={doctor.image} className="c-avatar-img" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>{doctor.name}</div>
                      <div className="small text-muted">
                        {/* <span>New</span> | Registered: Jan 1, 2015 */}
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="50" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    
                    <td>

      <select onChange={(e)=>statusHandler(e,doctor)} className="form-control-sm text-light select" name="isApproved">
                 <option selected disabled hidden>{doctor.isApproved?"approve":'not approve'}</option>
                 <option value="approved">Approve</option>
                 <option value="cancelled">Cancel</option>
                 </select>
                    </td>
                  </tr>
                    
                  )})}

                  
                </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default connect(null, {approveDoctor,getUsers} ) (AdminDashboard)
