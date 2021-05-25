import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../actions/patientActions';

class FilterPop extends Component {
  constructor(props) {
    super(props); //   TODO============================================================

    this.state = {
      name: '',
      category: '',
      fee: '',
      exp: '',
      recommendations: '',
    };
  }


  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
    
  };

  handleSubmit = e => {
    const { setFilter } = this.props;
    e.preventDefault();
    const filterObj = {};
    Object.entries(this.state).forEach(([key, value]) => {
      if (value !== '' && !value.includes('--')) {
        if (parseInt(value)) {
          filterObj[key] = parseInt(value);
        } else {
          filterObj[key] = value;
        }
      }
    });
    console.log(this.state,filterObj)
    setFilter({ ...filterObj });
  };

  handleReset = e => {
    const { setFilter } = this.props;
    e.preventDefault();
    this.setState({
      name: '',
      category: '',
      fee: '',
      exp: '',
      recommendations: '',
    });
    setFilter({});
  };

  render() {
    const { categories } = this.props;
    const {
      name,
      category,
      fee,
      exp,
      recommendations,
    } = this.state;
    return (
      <form className="mb-5">
        <div className="form-row">
          <div className="form-group col-6 col-md-3">
            <h6><strong>Filter by Category</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={category}
              name="category"
            >
              <option> -- select an option -- </option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
          <h6><strong>Filter by Fee</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={fee}
              name="fee"
            >
              <option> -- select an option -- </option>
              <option value={200}>$200 or less</option>
              <option value={300}>$300 or less</option>
              <option value={400}>$400 or less</option>
              <option value={500}>$500 or less</option>
              <option value={600}>$600 or less</option>
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
          <h6><strong>Filter by Experience</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={exp}
              name="exp"
            >
              <option> -- select an option -- </option>
              <option value={2}>2 years or more</option>
              <option value={4}>4 years or more</option>
              <option value={6}>6 years or more</option>
              <option value={8}>8 years or more</option>
              <option value={10}>10 years or more</option>
              <option value={12}>12 years or more</option>
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
          <h6><strong>Filter by Recommendations</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={recommendations}
              name="recommendations"
            >
              <option> -- select an option -- </option>
              <option value={10}>10 recommendations or more</option>
              <option value={20}>20 recommendations or more</option>
              <option value={30}>30 recommendations or more</option>
              <option value={40}>40 recommendations or more</option>
              <option value={50}>50 recommendations or more</option>
              <option value={60}>60 recommendations or more</option>
            </select>
          </div>
        </div>
        {/* <div className="row">
          <div className="form-group col-12">
            <label>Search by name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control form-control-lg"
              placeholder="Ex: Joesph Wisoky"
              onChange={this.handleSelect}
            />
          </div>
        </div> */}
        <div className="mt-2">
          <button
            onClick={this.handleSubmit}
            className="btn btn-lg btn-primary mr-3"
            type="submit"
          >
            Apply Filter
          </button>
          <button
            onClick={this.handleReset}
            className="btn btn-lg btn-danger"
            type="button"
          >
            Reset All
          </button>
        </div>
      </form>
    );
  }
}

FilterPop.defaultProps = {
  categories: [
    'All',
    'General Doctor',
    'Mental Health',
    'Skin',
    'Child Care',
    'Women Health',
    'Dentist',
    'ENT',
    'Homeopathy',
    'Ayurveda',
    'Heart',
    'Neurologist'
  ],
};

FilterPop.propTypes = {
  setFilter: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

export default connect(null, { setFilter })(FilterPop);
