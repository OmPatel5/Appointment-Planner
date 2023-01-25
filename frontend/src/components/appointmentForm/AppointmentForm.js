import React from "react";
import { ContactPicker } from "../contactPicker/ContactPicker";

export const AppointmentForm = ({contacts, title, setTitle, contact, setContact, date, setDate, time, setTime, handleSubmit, twentyFourTime, setTwentyFourTime}) => {

  const getTodayString = () => {
    const [month, day, year] = new Date()
      .toLocaleDateString("en-US")
      .split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const onChangeEvent = (event) => {
    setContact(event.target.value)
  }

  
  function onTimeChange(target) {
    var timeSplit = target.value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    const time = hours + ':' + minutes + ' ' + meridian;
    setTime(time);
    setTwentyFourTime(target.value)
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label><input type='text' value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} style={{marginBottom: '10px'}} required/>
      <label>Date</label><input type='date' value={date} placeholder='yyyy-mm-dd' onChange={(e) => setDate(e.target.value)} min={getTodayString()} style={{marginBottom: '10px'}} required/>
      <label>Time</label><input type='time' value={twentyFourTime} onChange={(e) => onTimeChange(e.target)} style={{marginBottom: '10px'}} required/>
      <ContactPicker contacts={contacts} contact={contact} onChangeEvent={onChangeEvent}/>
      <input type="submit" />
    </form>
  );
};
