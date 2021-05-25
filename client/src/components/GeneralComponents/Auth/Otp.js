import React, { Component ,Fragment } from 'react';
import { authenticator } from 'otplib';
import store from '../../../store';
// import logo from './logo.svg';
// import './App.css';
import styles from './TokenValidate.module.css';
import { connect, useDispatch } from 'react-redux';
import AdminUsers from '../../AdminComponents/AdminUsers';
import { otpEmail } from '../../../actions/authActions';
// const {authenticator}  = window.otplib.authenticator
const newSecret=authenticator.generateSecret()
const Pass = props => <span className={styles.pass}>{props.value}</span>;
const Fail = props => <span className={styles.fail}>{props.value}</span>;
const Message = ({user,onClick, delta, token }) => {
    const dispatch=useDispatch();
    console.log(delta);
  if (!token) {
    return 'Please input a token.';
  }

  if (!delta) {
    return <Fail value="The token is invalid." />;
  }

  if (delta === true) {
    // onClose();
      // dispatch({
      //     type:"OTP_SUCCESS"
      // })

    return (

      <Fragment>
        The token <Pass value="is valid" /> in this current window.
      </Fragment>
    );
  }

  return (
    <Fragment>
      The token <Fail value="was valid" /> at {delta} window(s).
    </Fragment>
  );
};

class Otp extends Component {
  state = {
    text: {
        recipient: '',
    token:authenticator.generate(newSecret),
    },
    verifyToken:'',
    isSent:false,
    delta:false

    }
  

  checkOtp = () => {
    const { text } = this.state;
    if(this.state.verifyToken===this.state.text.token){ 
        this.props.onClick(this.props.user)
      this.props.onClose()
    }
    
    else{
      alert('wrong token')
    }
           

    //pass text message GET variables via query string
    // if(process.env.NODE_ENV ==='production')
    // {
    // fetch(`https://https://exoclinic.herokuapp.com/send-text?recipient=${text.recipient}&textmessage=${text.token}`)
    // .then(this.setState({isSent:true}))
    // .catch(err => console.error(err));

    // }else{
    //   fetch(`http://localhost:5000/send-text?recipient=${text.recipient}&textmessage=${text.token}`).
    // then(this.setState({isSent:true}))
    // .catch(err => console.error(err))
    // }
    
  }
  sendOtpText = () => {
    this.props.otpEmail(this.state.text.token);
    this.setState({isSent:true})
    //pass text message GET variables via query string
    // fetch(`http://localhost:5000/send-text?recipient=${text.recipient}&textmessage=${text.token}`).
    // then(this.setState({isSent:true}))
    // .catch(err => console.error(err))
  }
  render() {
      console.log(newSecret)
    const { text } = this.state;
    const spacer = {
      margin: 8
    }
    const textArea = {
      borderRadius: 4
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={null} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        {this.state.isSent? <div style={{ marginTop: 10 }} >
          <h2> Enter the otp sent Message </h2>
          <label>Please input the  sent token</label>
          <br />
          <input
          className={styles.input}
          onChange={evt => this.setState({verifyToken:evt.target.value})}
          maxLength={6}
          value={this.state.verifyToken}
          placeholder="000000"
        />
       
       <button onClick={this.checkOtp}> Submit </button>
       <Message delta={this.state.verifyToken===this.state.text.token} token={this.state.text.token}  />
        </div>
        :<div>{this.sendOtpText()}</div>
        
        // <div style={{ marginTop: 10 }} >
        //   <h2> Send Text Message </h2>
        //   <label> Your Phone Number </label>
        //   <br />
        //   <input value={text.recipient}
        //     onChange={e => this.setState({ text: { ...text, recipient: e.target.value } })} />
        //   <div style={spacer} />
        //   <button onClick={this.sendText}> Send Text </button>
        // </div>
        }
      </div>
    );
  }
}

export default connect(null,{otpEmail}) (Otp);
