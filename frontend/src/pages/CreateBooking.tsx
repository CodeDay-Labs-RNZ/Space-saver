import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useAuth } from '../context/AuthContext';
import CalendarPage from './CalendarPage';
import axios from '../api/axios';
import * as yup from 'yup';
const styles = require('../styles/CreateBooking.css');

// api endpoint for creating new booking
const NEW_BOOKING_ENDPOINT = '/bookings/newBooking';


/* Interface defines the structure of an object that represents a date or a range of dates. 
Props: `justDate`, `startDateTime`, and `endDateTime`, can be a `Date` object or `null`. 
Interface is used to store and pass around the selected date or range of dates for a booking. */
interface DateType {
  justDate: Date | null;
  startDateTime: Date | null;
  endDateTime: Date | null;
}

/* Interface defines the structure of an object that represents a range of dates and times. 
Props: `startDate`, `endDate`, `startTime`, and `endTime`, can be a `Date` object or `null`. 
Interface is used to store and pass around the selected start and end dates and times for a booking. */
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}


/* Interface defines the structure of an object that represents the form data for creating a booking. 
Props: `clientId`, `clientName`, `clientEmail`, `company`, `typeOfSpaceNeeded`, and `reminder`. 
These properties correspond to the input fields in the booking form and their respective values. */
interface FormData {
  clientId: string;
  clientName: string;
  clientEmail: string;
  company: string;
  typeOfSpaceNeeded: string;
  reminder: boolean;
  // attendees: string;
}


/**
 * function `toReadableFormat` converts an ISO string to a readable format using the specified format string.
 * 
 * @param {string} isoString - `isoString` represents a date and time in ISO 8601 format. 
 * It should be in the format `YYYY-MM-DDTHH:mm:ss.sssZ`
 * @param {string} [format=yyyy LLL dd, hh:mm A] - `format` specifies the desired format for the output. 
 * It uses a combination of letters and special characters to represent different parts of the date and time.
 * 
 * @returns Returns a formatted string representation of the provided ISO string using the specified format.
 */
const toReadableFormat = (isoString: string, format: string = 'yyyy LLL dd, hh:mm A') => {
  return DateTime.fromISO(isoString).toFormat(format);
}


/* validating booking/bookingDetails schema */
/* Validation schema using Yup library for a booking form in a TypeScript React application. 
The validation schema specifies the validation rules for each field in the form. */
const bookingValidationSchema = yup.object().shape({
  clientName: yup.string(),
  // clientEmail: yup.string().email('Invalid email').required('Client email is required'),
  company: yup.string().required('Company is required'),
  typeOfSpaceNeeded: yup.string().required('Type of space needed is required'),
  bookingStartDate: yup.date().nullable().required('Start date is required'),
  bookingStartTime: yup.date().nullable().required('Start time is required'),
  bookingEndDate: yup.date().nullable().required('End date is required'),
  bookingEndTime: yup.date().nullable().required('End time is required'),
  reminder: yup.boolean(),
  // attendees: yup.string().required('Attendees is required'),
})


/* TypeScript React component is responsible for creating a new booking 
by capturing booking details from the user and submitting them to the backend. */
export function CreateBooking() {

  // capture additional booking details by grabbing user's info from backend before submitting form 
  const { username, email, clientId } = useAuth();

  // state variables for showing booking success message 
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<DateType | DateRange | null>(null);
  const [formData, setFormData] = useState<FormData>({
    /* grab client name and email from backend */
    clientId: clientId || '',
    clientName: username || '',
    clientEmail: email || '',
    company: '',
    typeOfSpaceNeeded: '',
    reminder: false,
    // attendees: '',
    // add additional fields based on bookingSchema
  })

  /* additional state for start and end dates/times */
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);


/**
 * function `handleBookingData` sets the booking data based on the provided data.
 * 
 * @param {DateType | DateRange} data - `data` can be of type `DateType` or `DateRange`.
 */
  const handleBookingData = (data: DateType | DateRange) => {
    setBookingData(data);
  }


/**
 * handleSubmit function is responsible for handling form submission, validating the form data, 
 * and making a POST request to create a new booking.
 * 
 * @param e - Parameter `e` is an event object of type `FormEvent<HTMLFormElement>`. 
 * Represents the event that is triggered when the form is submitted.
 */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log("ClientId:", clientId);
    // backend isn't expected clientId, clientName clientEmail so currently commented out 
    if (startDate instanceof Date && startTime instanceof Date && endDate instanceof Date && endTime instanceof Date) {
      const payload = {
        clientId,
        clientName: formData.clientName,
        // clientEmail: formData.clientEmail,
        company: formData.company,
        typeOfSpaceNeeded: formData.typeOfSpaceNeeded.trim(),
        bookingStartDate: DateTime.fromJSDate(startDate).toISO(),
        bookingStartTime: DateTime.fromJSDate(startTime).toISO(),
        bookingEndDate: DateTime.fromJSDate(endDate).toISO(),
        bookingEndTime: DateTime.fromJSDate(endTime).toISO(),
        reminder: formData.reminder,
        // attendees: formData.attendees,
      };

      
      try {
        
        // validate payload against schema before sending to backend
        // console.log("Payload:", payload)
        await bookingValidationSchema.validate(payload);

        const token = localStorage.getItem('Token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        // console.log("Token:", token)
        // console.log("Headers:", config.headers)
        // console.log("Payload:", payload)
        
        const response = await axios.post(NEW_BOOKING_ENDPOINT, payload, config)

        if (response.status === 201) {
          console.log('Booking created successfully');
          setBookingSuccess(true);
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          console.log('Failed to create booking');        
        }
        
      } catch (error) {
        console.error('Error:', error);
      }

    } else {
      console.error('One of the date variables is not a Date object')
    }
  }


/**
 * function `handleInputChange` updates state of form data object when user types in a form field.
 * 
 * @param e - React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

/* useEffect hook is responsible for retrieving saved booking data from localStorage 
and setting the state variables accordingly. */
  useEffect(() => { 
    const saveBookingData = localStorage.getItem('bookingData');
    if (saveBookingData) {
      const parseData = JSON.parse(saveBookingData) as DateType | DateRange;
      setBookingData(parseData);

      // safely converting to date object if string is passed in
      const safeDateConversion = (date: Date | null | string) => {
        if (typeof date === 'string') {
          return new Date(date);
        }
        return date;
      }

      // populating start and end dates/times based on bookingData 
      if ('justDate' in parseData) {
        // setting end date same as start date for single-day booking
        setStartDate(safeDateConversion(parseData.justDate));
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
    <div className='form-container'>
      <h1>Create Booking</h1>
      {bookingSuccess && <div className='success-message'>Booking has been successfully created! Redirecting...</div> }

      {/* conditionally render calendar component based on bookingData */}
      {bookingData === null && <CalendarPage onBookingData={handleBookingData} />}
      
      {/* booking form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date:</label>
          <input
            type='text'
            name='startDate'
            value={startDate ? toReadableFormat(DateTime.fromJSDate(startDate).toISO() || '', 'yyyy-MM-dd') : ''}
            readOnly
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type='text'
            name='endDate'
            value={endDate ? toReadableFormat(DateTime.fromJSDate(endDate).toISO() || '', 'yyyy-MM-dd') : ''}
            readOnly
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type='text'
            name='startTime'
            value={startTime ? toReadableFormat(DateTime.fromJSDate(startTime).toISO() || '', 'HH:mm') : ''}
            readOnly
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type='text'
            name='endTime'
            value={endTime ? toReadableFormat(DateTime.fromJSDate(endTime).toISO() || '', 'HH:mm') : ''}
            readOnly
          />
        </div>

        <div>
          <label htmlFor='clientName'>Client Name:</label>
            <input
              type='text'
              id='clientName'
              name='clientName'
              value={formData.clientName}
              onChange={handleInputChange}
              readOnly
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
              readOnly
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

        {/* todo: change this input to invite additional emails added by comma 
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
        */}

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