import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';
import { getUsers } from '../../actions/authActions';
import { addDocument } from '../../actions/patientActions';
import { getUserImage } from '../../actions/uploadActions';
import FileUpload from '../GeneralComponents/FilesComponents/FileUpload';
import AppointmentModal from './AppointmentModal';

//import appointment from '../../../reducers/appointmentReducer';

const InsertField = ({ row, accessor, CustomFunction ,getUsers,getUserImage,image,fileName,users,addDocument}) => {
 // const [modal,setModal]=useState(false);
  const [showModal,setModal]=useState(false);
  let  [state,setState]=useState(null)
	const closeChat = () => setModal(false)
// useEffect(()=>{
//   if(!image){
//     getUserImage(row['patient']['id'])
//   }

// },
// [image,getUserImage,row])
// useEffect(()=>{
//   if(!users){
//     getUsers();
//   }

// },
// [users,getUsers])

switch(accessor){
  // case 'firstname':{
  //   if(row['doctor']){
  //     return row['patient']['name']
  //   }
  //   return row[accessor]

  // }
  case 'patientFirstName':
    if(row['patient']){
      return row['patient']['name']
    }
    return row['name']

    case 'doctorFirstName':
      if(row['doctor']){
        return row['doctor']['name']
      }
      return row['name']
  case 'email':
    if(row['patient']){
    const icon = CustomFunction({ email: row['patient'][accessor] });
    return <span>{ icon } { row['patient'][accessor] }</span>
    }
    const icon = CustomFunction({ email: row[accessor] });
    return <span>{ icon } { row[accessor] }</span>
    


  case 'phone':
    if(row['patient']){
    return row['patient'][accessor] 
    }
    return row[accessor]

  case 'image':
    const getImage=(id)=>{
      console.log(id);
               console.log(users);
               var user=null;
       if(users){
         user=users.find((user)=>{
           return user._id===id
         })
         if (user){
          return user.image

         }
       }
      
    }
    const clicked = () =>{
      // console.log(getImage(row['patient']['id']))
      if(row['patient']){
      CustomFunction({ imageURL:getImage(row['patient']['id'])
    });
      return;
    }
     CustomFunction({ imageURL: row[accessor] });
  }
    return <span style={{height: 200, width: 200, backgroundColor: 'grey'}}>
            <img onClick={ clicked } src={ row['patient']?getImage(row['patient']['id']):row[accessor] } className="img-fluid" width="200" height="200" alt=''/>
          </span>
    

  case 'action':
    return (
      <AppointmentModal id={"ap"+row['_id']} appointment={row} ></AppointmentModal> 
    )
      
    
  case 'join':   
    var url = row['_id'];
    return(
      <Link to={{pathname:`/${url}`,state:row}} variant="contained" color="primary" 
      style={{ margin: "20px" }}>
        Open Meeting
        </Link>
      )

    case 'report':
      return(
         <div>
               <Button variant="contained" color="primary" onClick={()=>setModal(true)} 
              style={{ margin: "20px" }}>View Report </Button>
              <Modal show={showModal} onHide={closeChat} style={{ zIndex: "999999" }}>
							<Modal.Header closeButton>
								<Modal.Title>Report</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "400px", textAlign: "left" }}>
                <p>{row['report']}</p>
							</Modal.Body>
            </Modal>

         </div>

      )

      case 'viewProfile':   
      const userProfile=users&& users.find(user=>user._id===row["id"])
      return(
        <Link to={{pathname:`/userProfile/${row["id"]}`,state:{ user: userProfile }}} variant="contained" color="primary" 
        style={{ margin: "20px"}}>
          View Profile
          </Link>
        )
      case 'upload':   
      

      const onChange = (e) => {
        setState({ [e.target.name]: e.target.value});
        }
// const onUpload=(e)=>{
//             e.preventDefault();
//             if(fileName&&image)
//             addDocument(row["id"],{fileName:fileName,document:image})
//             // closeChat();
// }

        return(
              <div>
              <Button variant="contained" color="primary" onClick={()=>setModal(true)} 
              style={{ margin: "20px" }}>Upload </Button>
              <Modal show={showModal} onHide={closeChat} style={{ zIndex: "999999" }}>
							<Modal.Header closeButton>
								<Modal.Title>Upload File</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "400px", textAlign: "left" }}>
              {/* <form onSubmit={onUpload}>
              <div> */}
                 <FileUpload type="document" closeChat={closeChat} patientId={row["id"]}/>
              {/* </div>
             

                    </form> */}
                                {/* {/* <Label for='name'>
                                      name
                                  </Label>
                                  <Input
                                  type='name'
                                  name='name'
                                  id="name"
                                  className="mb-3"
                                  onChange={onChange}
                                  /> */}
                                
                                  {/* <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
                                  onClick={onUpload}
                                  block
                                  >
                                      Send</Button>  */}
                  
							</Modal.Body>
            </Modal>

          {/* // <CIcon name="cil-4k" > </CIcon> */}
          </div>
          )


  default:
    return 0;
}
};
const mapStateToProps=(state)=>({
  image:state.upload.image,
  fileName:state.upload.fileName,
  users:state.auth.users
})
export default connect(mapStateToProps,{addDocument,getUsers,getUserImage}) (InsertField);
