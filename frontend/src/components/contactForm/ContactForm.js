import React from "react";

export const ContactForm = ({name,setName,phoneNumber,setPhoneNumber,email,setEmail,handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label><input type='text' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
      <label>Phone Number</label><input value={phoneNumber} type='text' placeholder='xxx-xxx-xxxx' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={(e) => setPhoneNumber(e.target.value)} required/>
      <label>Email</label><input type='text' value={email} placeholder='exEmail@gmail.com' pattern="^\S+@\S+$" onChange={(e) => setEmail(e.target.value)} required/>
      <input type="submit" />
    </form>
  );
};
