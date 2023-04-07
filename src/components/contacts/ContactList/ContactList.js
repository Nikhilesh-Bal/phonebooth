import React ,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import { ContactService } from "../../../services/ContactService";
const ContactList=()=>{
    let [state,setState]=useState({
        loading:false,
        contacts:[],
        errorMessage:''
    });
   
    
    useEffect(()=>{
        (async () =>{
        try{
              setState({...state,loading:true});
              let response=await ContactService.getAllContacts();
              //console.log(response.data);
              setState({
                ...state,
                loading:false,
                contacts:response.data
              });
              }
        catch(error){
            setState({
                ...state,
                loading:false,
                errorMessage:error.message
              });
            }
    })()},[]);
   
    let clickDelete=async (contactId)=>{
        try{
              let response=await ContactService.deleteContact(contactId);
              if(response){
                setState({...state,loading:true});
              let response=await ContactService.getAllContacts();
              //console.log(response.data);
              setState({
                ...state,
                contacts:response.data
              });
              }
        }
        catch(error){
            setState({
                ...state,
                errorMessage:error.message
              });
        }
    }

    let {contacts,errorMessage}=state;

    return(
     <React.Fragment>
        <section className="contact-search p-3">
           <div className="container">
            <div className="grid">
                <div className="row">
                    <div className="col">
                        <p className="h3 fw-bold">Save Contacts
                        <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                            <i className="fa fa-plus-circle me-2"/>
                             New </Link>
                        </p>
                        <p className="fst-italic">Stay in touch, stay on top with our Phone Booth's Contact managing system.</p>
                        <p className="fst-italic">This application creates,updates,views and deletes a contact.</p>
                    </div>
                </div>
            </div>
           </div>
        </section>
        <section className="contact-list">
             <div className="container">
                <div className="row">
                    {
                        contacts.length>0 && contacts.map(
                            contact=>{
                                return(
                     <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                            <div className="card-body">
                              <div className="row align-items-center d-flex justify-content-around">
                                <div className="col-md-4">
                                   <img className="contact-img" src={contact.photo}/>
                                </div>
                                <div className="col-md-7">
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
                                <div className="col-md-1 d-flex flex-column align-items-center">
                                     <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                        <i className="fa fa-eye"/>
                                     </Link>
                                     <Link to={`/contacts/edit/${contact.id}`} className="btn btn-primary my-1">
                                        <i className="fa fa-pen"/>
                                     </Link>
                                     <button className="btn btn-danger my-1" onClick={()=>{clickDelete(contact.id);alert("Contact deleted successfully!")}}>
                                        <i className="fa fa-trash"/>
                                     </button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                                );
                            }
                        )
                    }
                </div>
             </div>
        </section>
     </React.Fragment>
    );
}
export default ContactList;