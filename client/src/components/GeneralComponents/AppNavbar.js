import React, {Component, Fragment } from 'react';
import { 
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Container, 
    Button,
    NavbarToggler
} from 'reactstrap';
import RegisterModal from './Auth/RegisterModal';
import LoginModal from './Auth/LoginModal';
import Logout from './Auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getUsers, readNotification } from '../../actions/authActions';
import leftArrow from'../../assets/images/left-arrow.png'
  
class AppNavbar extends Component {
    state = {
        isOpen: false,
        notificationsNumber:0,
        notifications:this.props.notifications&&this.props.notifications,
        isRead:this.props.auth.user&&this.props.auth.user.notificationIsRead
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    // componentDidUpdate(){
    //     if(!this.props.users)
    //     this.props.getUsers("All")
    
    // }
componentDidMount(){
    if(!this.props.users && this.props.auth.user){
      this.props.getUsers()
    }
    if (this.state.isRead===false) {
      this.setState({...this.state,notificationsNumber:this.props.auth.user&&this.props.auth.user.notificationsNumber})
    }
}


    render(){
        const { isAuthenticated,user,users } = this.props.auth;
        const getUser=(id)=>{
          return users.find(user=>
              user._id===id
          )
      }
        const notificationCheck=((notification)=>{
            switch (notification.notification) {
                case "add":
                    return ("book                                                                appointment")
                    // break;
                case "delete":
                    return ("delete                                                                    appointment")
                    // break;
                case "update":
                    return ("update                                                  appointment")
                        // break;
                default:
                    break;
            }
        }
        )
        const dropDownMenu=(
          <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle onClick={()=>{
        if(this.state.isRead===false){
        this.props.readNotification(user.id)
        this.setState({...this.state,isRead:true,notificationsNumber:0})}
      } 
    }
        className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{user&& user.notifications&& this.state.notificationsNumber}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end"  >
        <CDropdownItem
          header
          tag="div"
          color="dark"
          
        >
          {/* <strong>You have user.notifications.length messages</strong> */}
        </CDropdownItem>
        {users&&this.state.notifications && user? 
            this.state.notifications
            .map(notification=>{
                // this.state&&this.setState({...this.state,isRead:false})
                if (notification.userId){
                 const userNotify=getUser(notification.userId);
                 console.log(userNotify);
                return (
        <CDropdownItem href="#">
          {userNotify&&
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <CImg
                  src={userNotify.image}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">{userNotify.name}</small>
              <small className="text-muted float-right mt-1">Just now</small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Important message
            </div>
            <large  className="small text-muted text-truncate">
              {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...     */}
            {notificationCheck(notification)}
            {/* asdfghjkl;'wertyuiop[/////////////////////////////////////////////////////////////////////////////////////////////' */}
           </large>
          </div>
                }
         </CDropdownItem>
                 )
            }}):
             <div>No Notifications</div>
         }  
        
        <CDropdownItem href="#" className="text-center border-top"><strong>View all messages</strong></CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
        )
        const adminLinks = (
          <Fragment>
             <NavItem>
                  <Logout/>
              </NavItem>
          </Fragment>
        )
        const patientLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>
                            { user ? `Welcome ${user.name}` : ''}
                        </strong> 
                    </span>
                </NavItem>
                <NavItem>
                {dropDownMenu}
                </NavItem>
                <NavItem>
                  <Logout/>
                </NavItem>
                {user &&
                <Link className="profile-link"
                
             to={{
                pathname: `/userProfile/${user.id}`,
                state: { user: this.props.auth.user },
              }}
            //   className="d-flex justify-content-center"
            >
              VIEW PROFILE
              </Link>
    }

          
              <Link className="bookings-link"
             to={{
                pathname: `/bookings`,
                state: { user: this.props.auth.user },
              }}
            //   className="d-flex justify-content-center"
            >
              VIEW BOOKINGS
              </Link>
             
        
            </Fragment>
    
        );




        
        const doctorLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>
                            { user ? `Welcome Dr. ${user.name}` : ''}
                        </strong> 
                    </span>
                </NavItem>
                <NavItem>
                {dropDownMenu}
                </NavItem>
                <NavItem>
                  <Logout/>
                </NavItem>
                

               {
                   user&& <Link className="profile-link"

                
              to={{
                pathname: `/doctors/${user.id}`,
                state: { doctor: {_id:user.id,...user} },
              }}
            //   className="d-flex justify-content-center"
            >
              VIEW PROFILE
            </Link>
               }

               
            </Fragment>
        );


        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        return (
        <div className="appnav">
            <Navbar color="dark" dark expand="sm" className="mb-5" >
                <Container>
                {this.props.backBtn && (
            <img className="left-icon" src={leftArrow} alt="Left icon" width="30" height="30" onClick={this.props.backBtn} />
        )}
                <div
      className="Navbar d-flex justify-content-between"
    >
    
      {/* <div className="d-flex">
       
        <h2 color='red' className="title mb-0">{this.props.title}</h2>
      </div> */}
    </div>
                    <NavbarBrand href="/" className='brand'>Exo Clinic</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? (user.userType === 'patient' ? patientLinks :
                              user.userType === 'doctor' ? doctorLinks : adminLinks) 
                              :  guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
        
    }

}

const mapStateToProps = state => ({
    auth: state.auth,
    notifications:state.auth.user&&state.auth.user.notifications,
    singleDoctor:state.doctor.singleDoctor

});

export default connect(mapStateToProps, {readNotification,getUsers})(AppNavbar);




