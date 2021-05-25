import React, { useState} from 'react';
import { connect } from 'react-redux';

const DocumentsTab = (props) =>{
  // const { errors, register } = useForm();


//  const [document, setDocument] = useState({document:"",docId:props.user._id,date:new Date()});
  const [modal, setModal] = useState(false);
  const [documents, setDocuments] = useState({...props.documents});
//   var doctor = {...props.user};
//   const {id} = props.user;
//   const {userType} = props.user;
 
  // const onChange = (e) => {

  //   setDocument({...document, [e.target.name]: e.target.value});
  //   }
      // const onSubmit = (data, e) => {
      //   // setAppointment({ ...appointment })
      //   console.log(document);
      //    props.addDoctorFeedback(document);
      //   //  props.getSingleDoctor(doctor.id);
      //    //if(userType==="doctor")
      //      // props.getDoctorAppointments(id);
      //   //   if(userType==="patient")
      //   //     props.getPatientAppointments(id)
      //   setDocuments([...documents,document])
      //    toggle();
         
      
      // };
      const toggle = () => {
        //Clear Errors
        // props.clearErrors();
        console.log(modal);
        setModal(!modal);
    };

console.log(documents)

return(
  

 <div className="DoctorDetail-feedback container">

    {props&&(props.documents[0])?(props.documents.reverse().map((document)=>{if(document&&document.document&&document.fileName){
    const doctor=props.users.find(user=>user._id===document.docId)
    return(doctor&&
        <div className="Doctor">
        <div className="d-flex">
          <div className="Doctor-img">
            <img src={doctor.image} alt="Avatar" />
          </div>
          <div className="Doctor-info d-flex justify-content-between w-100">
            <div>
            <h6 className="Feedback-title"> Dr.{doctor.name}</h6>
            <a href={document.document}  >{document.fileName}</a>
              {document.date&&<p className="Doctor-feedback-date"> {document.date.slice(0,10)}</p>}
              
            </div>
            
          </div>
        </div>
        
      </div>
        
        


    //   <div className="content">
    //   <p className="date">10 days ago</p>
    //   <h6>Verified User - {feedback.patientName}</h6>
    //   <p>
    //    
    //   </p>
    // </div>


      ) 
      }
    }
        
        ))
        :
        <div>
        <h6 className="Feedback-title">No Documents Yet</h6>
        </div>
    }
    
    {/* <div className="content">
      <p className="date">10 days ago</p>
      <h6>Verified User - 1</h6>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem expedita
        velit laudantium voluptate ullam perspiciatis mollitia! Placeat
        sapiente odit, vitae minima libero exercitationem alias non eos
        necessitatibus quam ut nisi rem, nesciunt maiores et, quisquam quaerat
        amet impedit ullam itaque magni voluptates reprehenderit debitis.
        Voluptatum ullam architecto laudantium quidem nemo minima expedita
        omnis voluptatem ea, necessitatibus quo, commodi fuga perspiciatis.
      </p>
    </div>
    <div className="content">
      <p className="date">10 days ago</p>
      <h6>Verified User - 1</h6>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem expedita
        velit laudantium voluptate ullam perspiciatis mollitia! Placeat
        sapiente odit, vitae minima libero exercitationem alias non eos
        necessitatibus quam ut nisi rem, nesciunt maiores et, quisquam quaerat
        amet impedit ullam itaque magni voluptates reprehenderit debitis.
        Voluptatum ullam architecto laudantium quidem nemo minima expedita
        omnis voluptatem ea, necessitatibus quo, commodi fuga perspiciatis.
      </p>
    </div>
    <div className="content">
      <p className="date">10 days ago</p>
      <h6>Verified User - 1</h6>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem expedita
        velit laudantium voluptate ullam perspiciatis mollitia! Placeat
        sapiente odit, vitae minima libero exercitationem alias non eos
        necessitatibus quam ut nisi rem, nesciunt maiores et, quisquam quaerat
        amet impedit ullam itaque magni voluptates reprehenderit debitis.
        Voluptatum ullam architecto laudantium quidem nemo minima expedita
        omnis voluptatem ea, necessitatibus quo, commodi fuga perspiciatis.
      </p>
    </div> */}
  </div>
)} ;
const mapStateToProps = state => ({
  user: state.auth.user,
  users:state.auth.users,
  singleDoctor:state.doctor.singleDoctor
});

export default connect (mapStateToProps,null)(DocumentsTab);
