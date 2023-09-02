import React, { useState, useEffect } from 'react';
import instance from '../api/axios';
import { DateTime } from 'luxon';
const styles = require('../styles/UpdateDeleteBooking.css');

/* controller put and delete endpoints require booking id 
http://localhost:3000/bookings/updateBooking/:id */
const GET_ALL_BOOKINGS_ENDPOINT = '/bookings/getAllBookings';
const UPDATE_BOOKINGS_ENDPOINT = '/bookings/updateBooking';
const DELETE_BOOKINGS_ENDPOINT = '/bookings/deleteBooking';


export enum TypeOfSpaceNeeded {
  ROOMRENTAL = 'Rent A Room',
  DESKRENTAL = 'Rent A Desk',
  FLOORRENTAL = 'Rent A Floor',
}

/*
export interface BookingDetailsType {
  bookingStartDate: string;
  bookingStartTime: string;
  bookingEndDate: string;
  bookingEndTime: string;
  attendees: string;
  reminder: boolean;
  // bookingStatus?: BookingStatus;  // Uncomment this line if you activate the bookingStatus field later
}
*/

export interface BookingType {
  _id: string;  // Assuming that each booking has an 'id'
  client: ClientType;  // Assuming that the client is represented by a string ID
  clientName: string;
  clientEmail: string;
  company: string;
  typeOfSpaceNeeded: TypeOfSpaceNeeded;
  bookingStartDate: string;
  bookingStartTime: string;
  bookingEndDate: string;
  bookingEndTime: string;
  reminder: boolean;
  // bookingStatus?: BookingStatus;  // Uncomment this line if you activate the bookingStatus field later
  // attendees: string;
  // bookings: BookingDetailsType[];
}

export interface ClientType {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

/* untility function for dates */
const toReadableFormat = (isoString: string, format: string = 'yyyy LLL dd, HH:mm') => {
  return DateTime.fromISO(isoString).toFormat(format);
}


export const UpdateDeleteBooking: React.FC = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  console.log('bookings', bookings);

  useEffect(() => {
    /* fetch existing bookings from backend */
    const fetchBookings = async () => {
      try {
        setLoading(true);
        /* why is instance.get(api) working but not axios.get(api)? */
        const response = await instance.get(GET_ALL_BOOKINGS_ENDPOINT);
        setBookings(response.data);
        console.log('Get api call response:', JSON.stringify(response.data));
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  
  if (loading) {
    return <p>Loading...</p>;
  }
  
  const handleUpdate = async (updatedBooking: BookingType) => {
    const isConfirmed = window.confirm('Are you sure you want to update this booking?');
    if (isConfirmed) {
      try {
        console.log("ID being sent:", updatedBooking._id); 
        console.log("Data being sent:", updatedBooking);  

        const { client, ...bookingWithoutClient } = updatedBooking;

        const response =  await instance.put(`${UPDATE_BOOKINGS_ENDPOINT}/${updatedBooking._id}`, bookingWithoutClient);
        // await instance.put(`${UPDATE_BOOKINGS_ENDPOINT}/${updatedBooking.id}`, updatedBooking);
        console.log('Update API response:', response);
        setBookings(bookings.map(theBooking => theBooking._id === updatedBooking._id ? updatedBooking : theBooking));
        setEditingId(null); /* reseting editing ID after update */
      } catch (error) {
        console.error('Failed to update bookings', error);
      }
    } else {
      /* if user clicked cancel, exit edit mode */
      setEditingId(null);
    }

  }


  const handleDelete = async (bookingId: string) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this booking?');
    if (isConfirmed) {
      try {
        const response = await instance.delete(`${DELETE_BOOKINGS_ENDPOINT}/${bookingId}`);
        console.log('Delete API response:', response);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      } catch (error) {
        console.error('Failed to delete booking', error);
      }
    } else {
      /* if user clicked cancel, exit edit mode */
      setEditingId(null);
    }
  }

  
  return (
    <div>
      <h1 className='update-delete-h1'>Update or Delete Booking</h1>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            {editingId === booking._id ? (
              <div>
                {/* editing form will go here. When form is submitted, call handleUpdate(booking) */}
                <form onSubmit={(e) => {
                  e.preventDefault();

                  const formData = new FormData(e.target as HTMLFormElement);

                  /* fetch updated data from form */
                  const updatedBooking: BookingType = {
                    /* populate updated fields */
                    ...booking,
                    company: formData.get('company') as string,
                    typeOfSpaceNeeded: formData.get('typeOfSpaceNeeded') as TypeOfSpaceNeeded,
                    bookingStartDate: formData.get('bookingStartDate') as string,
                    bookingEndDate: formData.get('bookingEndDate') as string,
                    bookingStartTime: formData.get('bookingStartTime') as string,
                    bookingEndTime: formData.get('bookingEndTime') as string,
                    reminder: formData.get('reminder') !== null  
                  }; 
                  handleUpdate(updatedBooking);
                }}>
                  <label>Company:</label>
                  <input type='text' defaultValue={booking.company} name='company' /> <br />

                  <label>Type of Space Needed: </label>
                  <select defaultValue={booking.typeOfSpaceNeeded} name="typeOfSpaceNeeded">
                    <option value={TypeOfSpaceNeeded.ROOMRENTAL}>Rent A Room</option>
                    <option value={TypeOfSpaceNeeded.DESKRENTAL}>Rent A Desk</option>
                    <option value={TypeOfSpaceNeeded.FLOORRENTAL}>Rent A Floor</option>
                  </select><br />
                  
                  <label>Booking Start Date: </label>
                  <input type="date" defaultValue={DateTime.fromISO(booking.bookingStartDate).toFormat('yyyy-MM-dd')} name="bookingStartDate" /><br />
                  
                  <label>Booking End Date: </label>
                  <input type="date" defaultValue={DateTime.fromISO(booking.bookingEndDate).toFormat('yyyy-MM-dd')} name="bookingEndDate" /><br />

                  <label>Booking Start Time: </label>
                  <input type="time" defaultValue={DateTime.fromISO(booking.bookingStartTime).toFormat('HH:mm')} name="bookingStartTime" /><br />

                  <label>Booking End Time: </label>
                  <input type="time" defaultValue={DateTime.fromISO(booking.bookingEndTime).toFormat('HH:mm')} name="bookingEndTime" /><br />

                  <label>Reminder: </label>
                  <input type="checkbox" defaultChecked={booking.reminder} name="reminder" /><br />

                  <button onClick={() => handleUpdate(booking)}>Save</button>
                </form>
              </div>
            ) : (
              <div>
                {/* <strong>Client Name:</strong> {booking.client.name} <br /> */}
                {/* <strong>Client Email:</strong> {booking.client.email} <br /> */}
                <strong>Company:</strong> {booking.company} <br />
                <strong>Type of Space Needed:</strong> {booking.typeOfSpaceNeeded} <br />
                <strong>Booking Start Date:</strong> {toReadableFormat(booking.bookingStartDate, 'yyyy LLL dd')} <br /> 
                <strong>Booking End Date:</strong> {toReadableFormat(booking.bookingEndDate, 'yyyy LLL dd')} <br /> 
                <strong>Booking Start Time:</strong> {toReadableFormat(booking.bookingStartTime, 'HH:mm')} <br /> 
                <strong>Booking End Time:</strong> {toReadableFormat(booking.bookingEndTime, 'HH:mm')} <br /> 
                <strong>Reminder:</strong> {booking.reminder ? "Yes" : "No"} <br /> 
                {/* <strong>Attendees:</strong> {booking.attendees} <br />  */}

                <button className='update-button' onClick={() => setEditingId(booking._id)}>Update</button>
                <button className='delete-button' onClick={() => handleDelete(booking._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>

  )

}

export default UpdateDeleteBooking;