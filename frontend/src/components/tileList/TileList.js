import { Axios } from "axios";
import React, { useEffect } from "react";
import { Tile } from "../tile/Tile";
import { useAuth } from "../../contexts/AuthContext";

export const TileList = (props) => {
  const {currentUser} = useAuth();

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <div className='tileList'>
      {
        props.renderInformation.map((info, index) => {
          try {
            
            return (
              <Tile info={info} isAppointment={props.isAppointment} onSubmit={props.onSubmit} 
              removeContact={props.removeContact} removeAppointment={props.removeAppointment} key={index} 
              setIsEdit={props.setIsEdit} isEdit={props.isEdit} setIsEditContact={props.setIsEditContact} 
              isEditContact={props.isEditContact} contacts={props.contacts} handleSubmit={props.handleSubmit} />
            )
            
          } catch {

          }
        })
      }
    </div>
  );
};
