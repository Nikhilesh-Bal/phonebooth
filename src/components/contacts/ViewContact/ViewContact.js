import React,{useEffect,useState} from "react";
import {Link,useParams} from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
const ViewContact=()=>{
    let {contactId}=useParams();
    let [state,setState]=useState({
        loading:false,
        contact:{},
        errorMessage:''
    })

    useEffect(()=>{
        (async () =>{
        try{
              setState({...state,loading:true});
              let response=await ContactService.getContact(contactId);
              setState({
                ...state,
                contact:response.data
              });
              console.log(contact);
              }
        catch(error){
            setState({
                ...state,
                errorMessage:error.message
              });
            }
    })()},[contactId]);

    let {contact,errorMessage}=state;
    return(
     <React.Fragment>
        <section className="view-contact-intro">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h3  fw-bold">View Contact</p>
                        <p className="fst-italic">{`You are viewing ${contact.name}'s details `}</p>
                    </div>
                </div>
            </div>
        </section>
      <React.Fragment>
        {Object.keys(contact).length>0 &&
             <section className="view-contact mt-3">
             <div className="container">
                 <div className="row align-items-center">
                     <div className="col-md-4">
                        <img className="contact-img" src={contact.photo}/>
                     </div>
                     <div className="col-md-8">
                     <ul className="list-group">
                                         <li className="list-group-item list-group-item-action">
                                             Name:<span className="fw-bold">{contact.name}</span>
                                         </li>
                                         <li className="list-group-item list-group-item-action">
                                             email:<span className="fw-bold">{contact.email}</span>
                                         </li>
                                         <li className="list-group-item list-group-item-action">
                                             Number:<span className="fw-bold">{contact.phone}</span>
                                         </li>
                                         <li className="list-group-item list-group-item-action">
                                             Address:<span className="fw-bold">{contact.address}</span>
                                         </li>
                                     </ul>
                     </div>
                 </div>
                 <div className="row">
                     <div className="col">
                           <Link to={'/contacts/list'} className="btn btn-warning">Back</Link>
                     </div>
                 </div>
             </div>
         </section>
        }
        </React.Fragment>
     </React.Fragment>
    );
}
export default ViewContact;