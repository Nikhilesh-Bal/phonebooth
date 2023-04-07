import React,{useState,useEffect} from "react";
import {Link,useParams,useNavigate} from 'react-router-dom';
import { ContactService } from "../../../services/ContactService";
const EditContact=()=>{
    let navigate=useNavigate();
    let {contactId}=useParams();
    let [state,setState]=useState({
        contact:{
            name:'',
            photo:'',
            email:'',
            phone:''
        },
        errorMessage:''
       });

       useEffect(()=>{
        (async () =>{
        try{
              setState({...state,loading:true});
              let response=await ContactService.getContact(contactId);
              setState({
                ...state,
                loading:false,
                contact:response.data
              });
              //console.log(contact);
              }
        catch(error){
            setState({
                ...state,
                loading:false,
                errorMessage:error.message
              });
            }
    })()},[contactId]);

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
            let response=await ContactService.updateContact(state.contact,contactId);
            if(response){
              navigate('/contacts/list',{replace:true})
            }
        }
        catch(error){
          setState({
              ...state,
              errorMessage:error.message
            });
            navigate(`/contacts/edit/${contact.id}`,{replace:false})
          }
     }
  

    let {contact,errorMessage}=state;
    return(
        <React.Fragment>
        <section className="add-contact p3">
           <div className="container">
             <div className="row">
                <div className="col">
                  <p className="h4  fw-bold">Edit Contact</p>
                  <p className="fst-italic">Fill the below details to edit.</p>
                </div>
             </div>
             <div className="row align-items-center">
                <div className="col-md-4">
                    <form onSubmit={submitForm}>
                        <div className="ab-2">
                            <input 
                                required="true"
                                name="name"
                                value={contact.name}
                                onChange={updateInput} 
                                type="text" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="ab-2">
                            <input type="text"  
                                required="true"
                                name="photo"
                                value={contact.photo}
                                onChange={updateInput} 
                                className="form-control" placeholder="Photo link"/>
                        </div>
                        <div className="ab-2">
                            <input type="number"
                                required="true"
                                name="phone"
                                value={contact.phone}
                                onChange={updateInput} 
                                className="form-control" placeholder="Mobile"/>
                        </div>
                        <div className="ab-2">
                            <input type="email"
                                required="true"
                                name="email"
                                value={contact.email}
                                onChange={updateInput} 
                                className="form-control" placeholder="Email id"/>
                        </div>
                        <div className="ab-2">
                            <input type="text"
                                required="true"
                                name="address"
                                value={contact.address}
                                onChange={updateInput} 
                                className="form-control" placeholder="Address"/>
                        </div>
                        <div className="ab-2">
                            <input type="submit" className="btn btn-primary" value="Update"/>
                             <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-6"> 
                    <img src={contact.photo} alt="" className="contact-img"/>
                </div>
             </div>
           </div>
        </section>
     </React.Fragment>
    );
}
export default EditContact;