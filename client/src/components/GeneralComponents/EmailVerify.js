
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Form from "../../components/Form";
// import Row from "../../components/Row";
// import Input from "../../components/Input";
// import Button from "../../components/Button";
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
    NavItem,
    Row
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { postVerify } from '../../actions/authActions';
import {withRouter , Link} from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from "./HomePage";
const EmailVerify = ({postVerify,location,match}) => {
  
  const id= location.pathname.split("verifyemail/")[1]
  const user = useSelector(state => state.auth.user)


    return (
    <div>{postVerify(match.params.verifyToken)}
    {user && (user.isVerified === true &&
     <HomePage/>)}
    </div>
      
        
    );
};

export default withRouter(connect(null, {postVerify})(EmailVerify));