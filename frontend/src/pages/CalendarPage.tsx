import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CalendarComponent from '../components/CalendarComponent';
import CalendarComponentRangeOfDays from '../components/CalendarComponentRangeOfDays';


/* interface is defining the structure of object that represents a selected date and time range 
Props: `justDate`, `startDateTime`, and `endDateTime`, can be either a `Date` object or `null`. 
Props used to store selected start and end dates and times in calendar component. */
interface DateType {
  justDate: Date | null;
  startDateTime: Date | null;
  endDateTime: Date | null;
}


/* interface is defining the structure of an object that represents a range of dates and times. 
Props: `startDate`, `startTime`, `endDate`, and `endTime`, can be either a `Date` object or `null`. 
Props used to store selected start and end dates and times in calendar component. */
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}


/* interface is defining the structure of the props that can be passed to the `CalendarPage` component. 
Prop `onBookingData`, takes parameter of type `DateType` or `DateRange` and returns `void` (nothing). 
Prop is used to pass selected date(s) or date range from `CalendarPage` component to another component or function. */
interface CalendarPageProps {
  onBookingData: (value: DateType | DateRange) => void;
}


function CalendarPage({onBookingData}: CalendarPageProps) {

  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState<'single' | 'multi' | null>(null);

/**
 * function sets the booking type based on the input type.
 * 
 * @param {'single' | 'multi'} type - `type` parameter can have two possible values: 'single' or 'multi'.
 */
  const handleBookingTypeChanges = (type: 'single' | 'multi') => {
    setBookingType(type);
  }


/**
 * function logs selected time, start time, and end time, saves the booking data to local storage, 
 * passes the data to another function, navigates to a booking form page, and resets the booking type.
 * 
 * @param {DateType} datetype - `datetype` parameter is type `DateType`.
 */
  const handleSingleBookingSubmit = (datetype: DateType) => {
    // console.log('Selected Time:', datetype.justDate);
    // console.log('Start Time:', datetype.startDateTime);
    // console.log('End Time:', datetype.endDateTime);
    localStorage.setItem('bookingData', JSON.stringify(datetype));
    onBookingData(datetype); // pass data to CreateBooking 
    navigate('/booking'); // navigate to booking form page
    setBookingType(null);
  }


/**
 * function takes `dateRange` object as input, stores it in local storage, 
 * passes it to the `onBookingData` function, navigates to the booking form page, and sets the booking type to null.
 * 
 * @param {DateRange} dateRange - `dateRange` is an object that represents a range of dates and times. 
 * It typically contains the following properties:
 */
  const handleMultiBookingSubmit = (dateRange: DateRange) => {
    // console.log('Start Date:', dateRange.startDate);
    // console.log('Start Time:', dateRange.startTime);
    // console.log('End Date:', dateRange.endDate);
    // console.log('End Time:', dateRange.endTime);
    localStorage.setItem('bookingData', JSON.stringify(dateRange));
    onBookingData(dateRange); // pass data to CreateBooking 
    navigate('/booking'); // navigate to booking form page 
    setBookingType(null);
  }


  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }

  
// rendering JSX elements to be displayed on the page. 
  return (
    <div>
      {!bookingType && (
      <div className='booking-type-buttons'>
        <button style={buttonStyle} onClick={() => handleBookingTypeChanges('single')}>Single Day Booking</button>
        <button style={buttonStyle} onClick={() => handleBookingTypeChanges('multi')}>Multi Day Booking</button>
      </div>
      )}
      {bookingType === 'single'  && (
        <CalendarComponent onSubmit={handleSingleBookingSubmit} />  
      )}
      {bookingType === 'multi'  && (
        <CalendarComponentRangeOfDays onSubmit={handleMultiBookingSubmit} />
      )}
    </div>
  );
}

export default CalendarPage;