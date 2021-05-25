import axios from 'axios';

import {
ADD_DOCTOR,
GET_DOCTORS,
GET_SINGLE_DOCTOR,
DOCTOR_FILTER,
ADD_UPLOADS,
GET_UPLOADS
} from './types';
import { setAlert } from './alertActions';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { addDocument } from './patientActions';


export const uploadFiles = (onUploadProgress,file,fileName,closeChat,patientId) => async (dispatch , getState) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    
    const config = {     
        onUploadProgress: progressEvent => onUploadProgress(progressEvent)
    }

    const response = await axios.post('/api/uploads',formData,config)
    .then(res => {
    if(patientId)
    {
        dispatch(addDocument(patientId,{fileName:fileName,document:res.data.Location,docId:getState().auth.user.id,date:new Date()}))
        closeChat();
    }
    dispatch({
        type: ADD_UPLOADS,
        payload: {data:res.data,fileName:fileName}
        });
        return res;
        }
        )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    console.log(response);

    return response;
};



export const getUserFiles = () => (dispatch , getState) => {
    axios.get('/api/uploads', tokenConfig(getState))
    .then(res => {
    dispatch({
    type: GET_UPLOADS,
    payload: res.data
    });

    console.log(res.data);
    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const getUserImage = (id) => async (dispatch , getState) => {
    console.log(id);
    axios.get(`/api/auth/getUserImage/${id}`, tokenConfig(getState))
   
    .then(res => {
    dispatch({
    type: "GET_IMAGE",
    payload: res.data
    });

    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};