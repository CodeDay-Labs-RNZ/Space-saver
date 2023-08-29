import React, { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CalendarPage from './CalendarPage';
import * as yup from 'yup';


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

/* validation schema definiton */
const bookingValidationSchema = yup.object().shape({
  clientName: yup.string(),
  clientEmail: yup.string().email('Invalid email').required('Client email is required'),
  company: yup.string().required('Company is required'),
  typeOfSpaceNeeded: yup.string().required('Type of space needed is required'),
  attendees: yup.string().required('Attendees is required'),
  reminder: yup.boolean(),
  startDate: yup.date().nullable().required('Start date is required'),
  endDate: yup.date().nullable().required('End date is required'),
  startTime: yup.date().nullable().required('Start time is required'),
  endTime: yup.date().nullable().required('End time is required')
})


export function CreateBooking() {

  /* capture additional booking details by grabbing user's info from backend before submitting form */
  const { username, email } = useAuth();

  const [bookingData, setBookingData] = useState<DateType | DateRange | null>(null);
  const [formData, setFormData] = useState<FormData>({
    /* grab client name and email from backend */
    clientName: username || '',
    clientEmail: email || '',
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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    /* validate formData based on bookingSchema and bookingDetailsSchema,
    then send formData and bookingData to backend */
    

    /* checking if date variables are date objecst */
    if (startDate instanceof Date && startTime instanceof Date && endDate instanceof Date && endTime instanceof Date) {
      const payload = {
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        company: formData.company,
        typeOfSpaceNeeded: formData.typeOfSpaceNeeded.trim(),
        reminder: formData.reminder,
        attendees: formData.attendees,
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        startTime: startTime.getTime(),
        endTime: endTime.getTime(),
      }

      /* convert unix timestamps back to date objects for validation */
      const payloadWithDates = {
        ...payload,
        startDate: startDate ? new Date(payload.startDate as number) : null,
        endDate: endDate ? new Date(payload.endDate as number) : null,
        startTime: startTime ? new Date(payload.startTime as number) : null,
        endTime: endTime ? new Date(payload.endTime as number) : null,
      }
      
      
      const api = 'http://localhost:3001/bookings';
      
      try {
        
        /* validate payload against schema */
        console.log("Payload before validation:", payload)
        console.log("Payload with dates before validation:", payloadWithDates)
        await bookingValidationSchema.validate(payloadWithDates);
        
        const response = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
        
        if (response.ok) {
          console.log('Booking created successfully');
        } else {
          console.log('Failed to create booking');        
        }
        
      } catch (error) {
        console.error('Error: ', error);
      }

    } else {
      console.error('One of the date variables is not a Date object')
    }
    
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

      /* safely converting to date object */
      const safeDateConversion = (date: Date | null | string) => {
        if (typeof date === 'string') {
          return new Date(date);
        }
        return date;
      }

      /* populate start and end dates/times based on bookingData */
      if ('justDate' in parseData) {
        setStartDate(safeDateConversion(parseData.justDate));
        /* setting end date same as start date for single-day booking */
        setEndDate(safeDateConversion(parseData.justDate));
        setStartTime(safeDateConversion(parseData.startDateTime));
        setEndTime(safeDateConversion(parseData.endDateTime));
      } else {
        setStartDate(safeDateConversion(parseData.startDate));
        setEndDate(safeDateConversion(parseData.endDate));
        setStartTime(safeDateConversion(parseData.startTime));
        setEndTime(safeDateConversion(parseData.endTime));
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
              <option value='Rent A Room'>Rent A Room</option>
              <option value='Rent A Desk'>Rent A Desk</option>
              <option value='Rent A Floor'>Rent A Floor</option>
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