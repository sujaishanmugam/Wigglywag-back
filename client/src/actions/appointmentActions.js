import axios from 'axios';
import {
	APPOINTMENT_ERROR,
	UPDATE_APPOINTMENT_STATUS,
	GET_STATUS_COUNT,
	CREATE_PRESCRIPTION,
	UPDATE_MEDICINE, 
	CREATE_APPOINTMENT, 
	GET_APPOINTMENTS, 
	ADD_TAKEN_APPOINTMENT,
	DELETE_APPOINTMENT,
	UPDATE_APPOINTMENT_PRESCRIPTION,
	UPDATE_APPOINTMENT,
	GET_APPOINTMENTS_BY_DATE,
	CREATE_REPORT,
	GET_ALL_APPOINTMENTS
} from './types';
import { setAlert } from './alertActions';
import { tokenConfig } from './authActions';
import { addNotification } from './patientActions';


export const updateAppointment = (appointmentObj) => (dispatch, getState) => {
	const { _id } = appointmentObj;
	// console.log(appointmentObj)
	axios.post(`api/appointments/updateAppointment/${_id}`, appointmentObj, tokenConfig(getState))
	.then(res =>{ 
		console.log(getState().auth.user)
		if(getState().auth.user.id===appointmentObj.patient.id) 
		dispatch(addNotification({id:appointmentObj.doctor._id,notifyBy:getState().auth.user.id,notification:"update"}))
		else{
		dispatch(addNotification({id:appointmentObj.patient.id,notifyBy:getState().auth.user.id,notification:"update"}))
		}
		dispatch({
		type: UPDATE_APPOINTMENT,
		payload: res.data.appointment
	})}).catch(err => dispatch(setAlert(`${err}`, 'danger')));
	axios.post('api/doctors/addTakenAppointment', appointmentObj, tokenConfig(getState))
  .then(res => 
    {
      dispatch({
      type: ADD_TAKEN_APPOINTMENT,
      payload: res.data
  })
  dispatch(setAlert('Add Taken Appointment created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};
export const getAllAppointments = () => (dispatch, getState) => {
 axios.get(`api/appointments/getAllAppointments`, tokenConfig(getState))
 .then(res =>{ 
	console.log(res.data)  
   dispatch({
	 type: GET_ALL_APPOINTMENTS,
	 payload: res.data
 })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};



export const getPatientAppointments = (id) => (dispatch, getState) => {
  axios.get(`api/appointments/getPatientAppointments/${id}`, tokenConfig(getState))
  .then(res =>{ 
	 console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',res.data)  
	dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data
  })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};


export const getDoctorAppointments = (id) => (dispatch, getState) => {
	 
  axios.get(`api/appointments/getDoctorAppointments/${id}`, tokenConfig(getState))
  .then(res =>{ 
	// console.log(res.data)  
	dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data
  })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};

export const createAppointment = appointmentObj => (dispatch , getState) => {
  console.log(appointmentObj);
  
  axios.post('api/appointments/createAppointment', appointmentObj, tokenConfig(getState))
  .then(res => 
    {
		if(getState().auth.user.id===appointmentObj.patient.id) 
		dispatch(addNotification({id:appointmentObj.doctor._id,notifyBy:getState().auth.user.id,notification:"add"}))
		else{
		dispatch(addNotification({id:appointmentObj.patient.id,notifyBy:getState().auth.user.id,notification:"add"}))
		}
		
      dispatch({
      type: CREATE_APPOINTMENT,
      payload: res.data
  })
  dispatch(setAlert('Appointment created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));


  axios.post('api/doctors/addTakenAppointment', appointmentObj, tokenConfig(getState))
  .then(res => 
    {
      dispatch({
      type: ADD_TAKEN_APPOINTMENT,
      payload: res.data
  })
  dispatch(setAlert('Add Taken Appointment created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};


export const deleteAppointment = id => (dispatch, getState) => {
  console.log(id);
  axios.delete(`api/appointments/delete/${id}`, tokenConfig(getState))
  .then(res =>{
	if(getState().auth.user.id===res.data.appointment.patient.id) 
	dispatch(addNotification({id:res.data.appointment.doctor._id,notifyBy:getState().auth.user.id,notification:"delete"}))
	else{
	dispatch(addNotification({id:res.data.appointment.patient.id,notifyBy:getState().auth.user.id,notification:"delete"}))
	} 
	dispatch({
      type: DELETE_APPOINTMENT,
      payload: id
})})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};

export const updateAppointmentPrescription = appointmentObj => (dispatch , getState) => {
  console.log(appointmentObj);
  axios.post('api/appointments/updateAppointmentPrescription', appointmentObj, tokenConfig(getState))
  .then(res => 
    {
      dispatch({
      type: UPDATE_APPOINTMENT_PRESCRIPTION,
      payload: res.data
  })
  dispatch(setAlert('Appointment created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));

  
};


//////////////////////////////////////////////
//GET ALL APPOINTMENTS BY DATE
export const getAppointmentsByDate = (date = new Date()) => async (dispatch,getState) => {
	
	function convert(date) {
		var dateString = new Date(date.year, date.month-1, date.day);
		let month = dateString.toLocaleString('en-us', { month: 'short' });
	
		// console.log(month)
		return [month,date.day+",",date.year].join(" ");
	}
	try {
		const res = await axios.get(`api/appointments/${convert(date)}`, tokenConfig(getState));
		dispatch({
			type: GET_APPOINTMENTS_BY_DATE,
			payload: res.data
		});
		console.log(res)
	} catch (error) {  
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};
// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = (appointment, textData) => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		await axios.post(
			`/api/appointments/action/${appointment._id}`,
			{ status: textData },
			config
		);

		dispatch({
			type: UPDATE_APPOINTMENT_STATUS,
			payload: {
				data: appointment,
				value: textData,
			},
		});
		dispatch(
			setAlert(`Appointment Status Updated into ${textData}`, "success")
		);
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};


export const makeReport = (appointmentID,report) => async (dispatch,getState) => {
	var bodyReport={report:report}
	console.log(appointmentID,report)
	try {
		const res = await axios.post(`api/appointments/makeReport/${appointmentID}`,{report},tokenConfig(getState));
		console.log(res)

		dispatch({
			type: CREATE_REPORT,
			payload: res.data,
		});
		dispatch(setAlert(`Report Created Successfully`, "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};





// GET ALL GET STATUS COUNT
export const getStatusCount = (date) => async (dispatch) => {
	try {
		const res = await axios.get(`api/appointments/statuscount`);
		dispatch({
			type: GET_STATUS_COUNT,
			payload: res.data,
		});
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};

// PUT VISITED APPOINTMENT
export const updateVisitedAppointment = (data) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		await axios.post(`/api/appointments/visitstatus/${data._id}`, config);
		dispatch(setAlert("Appointment Updated Successfully", "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};

export const makePrescription = (appointmentID) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post(`/api/prescription/${appointmentID}`, config);
		dispatch({
			type: CREATE_PRESCRIPTION,
			payload: res.data,
		});
		dispatch(setAlert(`Prescription Created Successfully`, "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};
export const updateMedicine = (appointmentID, formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.put(
			`/api/prescription/medicean/${appointmentID}`,
			formData,
			config
		);
		dispatch({
			type: UPDATE_MEDICINE,
			payload: res.data,
		});
		dispatch(setAlert(`Medicean Added`, "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};
