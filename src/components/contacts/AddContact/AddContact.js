import React,{useState,useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom';
import { ContactService } from "../../../services/ContactService";

const AddContact=()=>{
    let navigate=useNavigate();
   let [state,setState]=useState({
    contact:{
        name:'',
        photo:'',
        email:'',
        phone:''
    },
    errorMessage:''
   });
  
   let updateInput=(event)=>{
    setState({
        ...state,
        contact:{
            ...state.contact,
            [event.target.name]:event.target.value
        }
    });
   }

   let submitForm=async (event)=>{
      event.preventDefault();
      try{
          let response=await ContactService.createContact(state.contact);
          if(response){
            navigate('/contacts/list',{replace:true})
          }
      }
      catch(error){
        setState({
            ...state,
            errorMessage:error.message
          });
          navigate('/contacts/add',{replace:false})
        }
   }

   let {contact,errorMessage}=state;
    return(
     <React.Fragment>
        <section className="add-contact p3">
           <div className="container">
             <div className="row">
                <div className="col">
                  <p className="h4  fw-bold">Create Contact</p>
                  <p className="fst-italic">Fill the below details to create a new contact.</p>
                </div>
             </div>
             <div className="row">
                <div className="col-md-4">
                    <form onSubmit={submitForm}>
                        <div className="ab-2">
                            <input name="name" 
                                   required="true"
                                   value={contact.name}
                                   onChange={updateInput}
                                   type="text" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="ab-2">
                            <input 
                                   name="photo"
                                   required="true" 
                                   value={contact.photo}
                                   onChange={updateInput}
                                   type="text" className="form-control" placeholder="Photo link"/>
                        </div>
                        <div className="ab-2">
                            <input 
                                   name="phone" 
                                   required="true"
                                   value={contact.phone}
                                   onChange={updateInput}
                                   type="number" className="form-control" placeholder="Mobile"/>
                        </div>
                        <div className="ab-2">
                            <input 
                                   name="email" 
                                   required="true"
                                   value={contact.email}
                                   onChange={updateInput}
                                   type="email" className="form-control" placeholder="Email id"/>
                        </div>
                        <div className="ab-2">
                            <input 
                                   name="address" 
                                   required="true"
                                   value={contact.address}
                                   onChange={updateInput}
                                   type="text" className="form-control" placeholder="Address"/>
                        </div>
                        <div className="ab-2">
                            <input type="submit" className="btn btn-success" value="Create"/>
                             <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                        </div>
                    </form>
                </div>
             </div>
           </div>
        </section>
     </React.Fragment>
    );
}
export default AddContact;