import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDoctors, setFilter } from '../../actions/patientActions';

import Doctor from './Doctor';
import filterImg from '../../assets/images/filter.png';
import FilterPop from '../PatientComponents/FilterPop';       
import Navbar from './../GeneralComponents/AppNavbar'

const DoctorsList = ({ doctors, getDoctors, setFilter,filterStore,location,history }) => {
  const {state}=location
  const [filterObj, setFilterObj] = useState(state&&state.filterObj);
  console.log(filterStore)
  console.log(filterObj)
  //console.log(doctors)
  useEffect(() => { 
    if(filterStore.category||filterStore.name){
      setFilterObj(filterStore)
      getDoctors(filterStore);
    }
    else{



      getDoctors(filterStore);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStore]);

  return (
    <div className="DoctorList">
      <Navbar backBtn={history.goBack} title="Doctors" bg="#e0fdf7" />     
      <div className="container">
        {<FilterPop />}              

        <h4 className="result-title">
          {doctors.length === 0
            ? 'There are No doctors for this search'
            : 'Results showing Doctors'}
        </h4>
        <div>
          {doctors.map(doctor => (
            <Doctor key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

DoctorsList.propTypes = {
  doctors: PropTypes.array.isRequired,
  getDoctors: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  doctors: state.doctor.doctors,
  filterStore: state.doctor.filter,
});

export default connect(mapStateToProps, { getDoctors,setFilter })(DoctorsList);
