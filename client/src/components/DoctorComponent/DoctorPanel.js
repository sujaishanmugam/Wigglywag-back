import React, { Component } from 'react';
import DoctorFirstSubmit from './DoctorFirstSubmit';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class DoctorPanel extends Component {

    render() {
      const {user} = this.props;
      console.log(user.isFirstTime);
      
      
        return (
          <div>
            {
            user &&(
           
            user.isFirstTime === true ? <DoctorFirstSubmit/>
            : (
            <div className="container-fluid bg-light">
             <div className="row">
             <Redirect to = "/doctorDashboard"/>
             </div>
             </div>  
            )      
          )
            }
          </div>
         
        );
      
      
      // else {
      //   if(user.isFirstTime === false){
      //     return (
           
      //     )
      //   }
      // }
      // return null;
       
    }

}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null )(DoctorPanel);
