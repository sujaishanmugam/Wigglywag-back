import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import like from '../../assets/images/like.png';
import share from '../../assets/images/share.png';
import { addRecommendation } from '../../actions/doctorActions';
import { connect } from 'react-redux';
import '../../App.css';
import { Button } from 'reactstrap';

const Doctor = ({ doctor ,addRecommendation}) => {
  const {
    _id,
    name,
    category,
    description,
    fee,
    exp,
    image,
    recommendations
  } = doctor;
  return (
    <div className="Doctor">
      <div className="d-flex">
        <div className="Doctor-img">
          <img src={image} alt="Avatar" />
        </div>
        <div className="Doctor-info d-flex justify-content-between w-100">
          <div>
            <h4 className="Doctor-title">{`Dr. ${name}`}</h4>
            <p className="Doctor-category">{category}</p>
            <p className="Doctor-description">{description}</p>
            <div className="Doctor-exp d-flex">
              <p>{`$${fee}`}</p>
              <p>{`${exp} yrs of experience`}</p>
              <p>{`${recommendations} yrs of experience`}</p>
              <p>
                <img src={like} onClick={()=>addRecommendation(_id)} alt="likes" />
                <span>{recommendations}</span>
              </p>
            </div>
           {/* {localStorage.setItem("doctor", JSON.stringify(doctor))} */}
          </div>
          <div>
            <img src={share} alt="share icon" />
          </div>
        </div>
      </div>
      <div className="Doctor-cta d-flex">
    
        <Link
          to={{
            pathname: `/doctors/${_id}/book`,
            state: { doctor },
          }}
          className="btn btn-full flex-grow-1 flex-md-grow-0"
          // onClick={()=>localStorage.setItem("doctor", JSON.stringify(doctor))}
        >
          Book
        </Link>

        <NavLink
              to={{
                pathname: `/doctors/${_id}`,
                state: { doctor },
              }}
              className="btn btn-full flex-grow-1 flex-md-grow-0"  
              activeStyle={{ color: 'red' }}   
            >
              View Profile
        </NavLink>
      </div>
    </div>
  );
};

Doctor.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default connect(null,{addRecommendation}) (Doctor);
