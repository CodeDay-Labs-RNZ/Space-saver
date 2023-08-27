import React, { FormEvent, useEffect, useState } from 'react';
import CalendarPage from './CalendarPage';


/* data types for booking data */
interface DateType {
  justDate: Date | null;
  startDateTime: Date | null;
  endDateTime: Date | null;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}

/* data types for form data */
interface FormData {
  clientName: string;
  clientEmail: string;
  company: string;
  typeOfSpaceNeeded: string;
  attendees: string;
  reminder: boolean;
}


export function CreateBooking() {

  /* capture additional booking details by grabbing user's info from backend before submitting form */

  const [bookingData, setBookingData] = useState<DateType | DateRange | null>(null);
  const [formData, setFormData] = useState<FormData>({
    /* grab client name and email from backend */
    clientName: '',
    clientEmail: '',
    company: '',
    typeOfSpaceNeeded: '',
    attendees: '',
    reminder: false,
    /* add additional fields based on bookingSchema and bookingDetailsSchema */
  })

  /* additional state for start and end dates/times */
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);


  /* handling data from CalendarPage */
  const handleBookingData = (data: DateType | DateRange) => {
    setBookingData(data);
  }

  /* handling form submission */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* validate formData based on bookingSchema and bookingDetailsSchema,
    then send formData and bookingData to backend */
    
  }

  /* handling form input changes */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => { 
    const saveBookingData = localStorage.getItem('bookingData');
    if (saveBookingData) {
      const parseData = JSON.parse(saveBookingData) as DateType | DateRange;
      setBookingData(parseData);

      /* populate start and end dates/times based on bookingData */
      if ('justDate' in parseData) {
        setStartDate(parseData.justDate);
        /* setting end date same as start date for single-day booking */
        setEndDate(parseData.justDate);
        setStartTime(parseData.startDateTime);
        setEndTime(parseData.endDateTime);
      } else {
        setStartDate(parseData.startDate);
        setEndDate(parseData.endDate);
        setStartTime(parseData.startTime);
        setEndTime(parseData.endTime);
      }
    }
  }, []);


  return (
    <div>
      <h1>Create Booking</h1>
      {/* conditionally render calendar component based on bookingData */}
      {bookingData === null && <CalendarPage onBookingData={handleBookingData} />}
      
      {/* booking form */}
      <form onSubmit={handleSubmit}>

        {/* display booking dates/times (readonly) */}
        <div>
          <label>Start Date:</label>
          <input
            type='text'
            name='startDate'
            value={startDate ? startDate.toString() : ''}
            readOnly
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type='text'
            name='endDate'
            value={endDate ? endDate.toString() : ''}
            readOnly
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type='text'
            name='startTime'
            value={startTime ? startTime.toString() : ''}
            readOnly
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type='text'
            name='endTime'
            value={endTime ? endTime.toString() : ''}
            readOnly
          />
        </div>

        
        {/* todo: after getting user's name/email, add into these input fields and disable input fields */}
        <div>
          <label htmlFor='clientName'>Client Name:</label>
            <input
              type='text'
              id='clientName'
              name='clientName'
              value={formData.clientName}
              onChange={handleInputChange}
            />
        </div>
        <div>
          <label htmlFor='clientEmail'>Client Email:</label>
            <input
              type='email'
              id='clientEmail'
              name='clientEmail'
              value={formData.clientEmail}
              onChange={handleInputChange}
            />
        </div>

        <div>
          <label htmlFor='company'>Company:</label>
            <input
              type='text'
              id='company'
              name='company'
              value={formData.company}
              onChange={handleInputChange}
            />
        </div>
        <div>
          <label htmlFor='typeOfSpaceNeeded'>Type Of Space Needed:</label>
            <select
              id='typeOfSpaceNeeded'
              name='typeOfSpaceNeeded'
              value={formData.typeOfSpaceNeeded}
              onChange={handleInputChange}
            >
              <option value=''>Select Type</option>
              <option value='ROOMRENTAL'>Rent A Room</option>
              <option value='DESKRENTAL'>Rent A Desk</option>
              <option value='FLOORRENTAL'>Rent A Floor</option>
            </select>
        </div>

        {/* todo: change this input to invite additional emails added by comma */}
        <div>
          <label htmlFor='attendees'>Attendees:</label>
            <input
              type='text'
              id='attendees'
              name='attendees'
              value={formData.attendees}
              onChange={handleInputChange}
            />
        </div>

        {/* todo: after backend has implemented funcionality for setting reminders, tailor this input for that case */}
        <div>
          <label htmlFor='reminder'>Set Reminder:</label>
            <input
              type='checkbox'
              id='reminder'
              name='reminder'
              checked={formData.reminder}
              onChange={(e) => setFormData({...formData, reminder: e.target.checked})}
            />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateBooking