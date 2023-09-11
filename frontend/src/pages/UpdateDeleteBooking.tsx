import React, { useState, useEffect } from 'react';
import instance from '../api/axios';
import { DateTime } from 'luxon';
const styles = require('../styles/UpdateDeleteBooking.css');

// api endpoints
const GET_USER_BOOKINGS_ENDPOINT = '/bookings/getClientBookings';
const UPDATE_BOOKINGS_ENDPOINT = '/bookings/updateBooking';
const DELETE_BOOKINGS_ENDPOINT = '/bookings/deleteBooking';


/* `enum TypeOfSpaceNeeded` is used to represent different types of space that can be rented. */
export enum TypeOfSpaceNeeded {
  ROOMRENTAL = 'Rent A Room',
  DESKRENTAL = 'Rent A Desk',
  FLOORRENTAL = 'Rent A Floor',
}


/* Interface is defining the structure of an object that represents a booking. 
It specifies the properties and their types that a booking object should have. */
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


/* Interface is defining the structure of an object that represents a client. 
Interface defines the `client` property in the `BookingType` interface, 
which represents the client associated with a booking. */
export interface ClientType {
  id: string;
  name: string;
  email: string;
}


/**
 * function `toReadableFormat` converts an ISO string to a readable format using the specified format string.
 * 
 * @param {string} isoString - `isoString` represents a date and time in ISO 8601 format.
 * It should be in the format `YYYY-MM-DDTHH:mm:ss.sssZ`
 * @param {string} [format=yyyy LLL dd, HH:mm] - `format` specifies the desired format for the output.
 * It uses a combination of letters and special characters to represent different parts of the date and time.
 * 
 * @returns Returns a formatted string representation of the provided ISO string using the specified format.
 */
const toReadableFormat = (isoString: string, format: string = 'yyyy LLL dd, HH:mm') => {
  return DateTime.fromISO(isoString).toFormat(format);
}


/* TypeScript React component is responsible for fetching existing bookings from a backend API, 
displaying them in a list, and providing functionality to update or delete each booking. */
export const UpdateDeleteBooking: React.FC = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // console.log('bookings', bookings);


/* `useEffect` hook is used to perform side effects in a functional component. 
In this case, `useEffect` hook is fetching existing bookings from backend API when component is mounted. */
  useEffect(() => {
    // fetch existing bookings from backend 
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await instance.get(GET_USER_BOOKINGS_ENDPOINT);
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

  
/**
 * handleUpdate function updates a booking by sending PUT request to server 
 * and updates bookings state with the updated booking.
 * 
 * @param {BookingType} updatedBooking - `updatedBooking` is an object of type
 * `BookingType` that represents the updated booking information.
 */
  const handleUpdate = async (updatedBooking: BookingType) => {
    const isConfirmed = window.confirm('Are you sure you want to update this booking?');
    if (isConfirmed) {
      try {
        // console.log("ID being sent:", updatedBooking._id); 
        // console.log("Data being sent:", updatedBooking);  

        const { client, ...bookingWithoutClient } = updatedBooking;

        const response =  await instance.put(`${UPDATE_BOOKINGS_ENDPOINT}/${updatedBooking._id}`, bookingWithoutClient);
        console.log('Update API response:', response);
        console.log('Updated bookings:', bookings);
        setBookings(bookings.map(theBooking => theBooking._id === updatedBooking._id ? updatedBooking : theBooking));
        setEditingId(null); // reseting editing ID after update 
      } catch (error) {
        console.error('Failed to update bookings', error);
      }
    } else {
      // if user clicked cancel, exit edit mode 
      setEditingId(null);
    }
  }


/**
 * handleDelete function is used to delete a booking by making an API call and updating the bookings state.
 * 
 * @param {string} bookingId - `bookingId` represents the unique identifier of booking that needs to be deleted.
 */
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
      // if user clicked cancel, exit edit mode
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