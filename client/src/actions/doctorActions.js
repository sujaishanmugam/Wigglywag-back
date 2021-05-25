// import axios from 'axios';
// import {
// ADD_DOCTOR,
// GET_DOCTORS,
// GET_SINGLE_DOCTOR,
// DOCTOR_FILTER,
// GET_APPOINTMENTS,
// IMAGE_CLICKED
// } from './types';
// import { setAlert } from './alertActions';
// import { returnErrors } from './errorActions';
// import { tokenConfig } from './authActions';



// export const submitInfo = ({...doctorData}) => (dispatch , getState) => {
//     axios.post('/api/doctors', doctorData, tokenConfig(getState))
//     .then(res => {
//     dispatch({
//     type: ADD_DOCTOR,
//     payload: res.data
//     });

//     }
//     )
//     .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// };


// export const clickedImage = ({ imageURL }) => dispatch => {
//     console.log(imageURL);
//     dispatch({
//         type: IMAGE_CLICKED,
//         payload: imageURL
//         });
// };








import axios from 'axios';
import {
ADD_DOCTOR,
GET_DOCTORS,
GET_SINGLE_DOCTOR,
DOCTOR_FILTER,
GET_APPOINTMENTS,
IMAGE_CLICKED,
GET_PATIENTS,
ADD_FEEDBACK
,UPDATE_DOCTOR_DETAILS,
ADD_DOCUMENT,
REGISTER_FAIL
} from './types';
import { setAlert } from './alertActions';
import { returnErrors } from './errorActions';
import { tokenConfig, update, updateDocState } from './authActions';


export const getDoctorPatients = (id) => async(dispatch , getState) => {
    console.log(id)

   const patients = await axios.get(`api/appointments/getDoctorPatients/${id}`,tokenConfig(getState));
   console.log(patients)
       dispatch({
         type: GET_PATIENTS,
         payload: patients.data
         });
   }




export const submitInfo = (user,{...doctorData}) => (dispatch , getState) => {
    console.log(doctorData)
    axios.post('/api/doctors', doctorData, tokenConfig(getState))
    .then(res => {
    dispatch(
    updateDocState(user))
    dispatch({
    type: ADD_DOCTOR,
    payload: res.data
    });

    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateDoctorDetails
= ({...doctorData}) => (dispatch , getState) => {
    console.log(doctorData)
    axios.post('/api/doctors/updateDoctorDetails', doctorData, tokenConfig(getState))
    .then(res => {
        console.log(res.data)
    dispatch(update({image:doctorData.image}))
    dispatch({
    type: UPDATE_DOCTOR_DETAILS,
    payload: res.data
    });

    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const addDoctorFeedback= (feedbackObj) => (dispatch , getState) => {


const {id}=feedbackObj
axios.post(`/api/doctors/addFeedBack/${id}`, feedbackObj, tokenConfig(getState))
  .then(res => 
    {
        console.log(res.data)
      dispatch({
      type: ADD_FEEDBACK,
      payload: res.data
  })
  dispatch(setAlert('Feedback created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};
export const clickedImage = ({ imageURL }) => dispatch => {
    console.log(imageURL);
    dispatch({
        type: IMAGE_CLICKED,
        payload: imageURL
        });
};
export const addRecommendation = (id) => (dispatch) => {


  const config = {
      headers: {
          'Content-Type' : 'application/json'
      }
  }

  axios.post(`/api/doctors/addRecommendation/${id}`,config)
  .then(res => {
      console.log(res.data.recommendations)
  //     dispatch({
  //     type: REGISTER_SUCCESS,
  //     payload: res.data
  // });
 
  
})
  .catch(err => {
     
      dispatch(returnErrors(err.response.data, err.response.status, 'VERIFY_FAIL'));
      dispatch({
          type: REGISTER_FAIL//VERIFY_FAIL
      });
  });

};
