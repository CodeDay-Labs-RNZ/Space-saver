import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CalendarComponent from '../components/CalendarComponent';
import CalendarComponentRangeOfDays from '../components/CalendarComponentRangeOfDays';

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

interface CalendarPageProps {
  onBookingData: (value: DateType | DateRange) => void;
}


function CalendarPage({onBookingData}: CalendarPageProps) {

  const navigate = useNavigate();

  const [bookingType, setBookingType] = useState<'single' | 'multi' | null>(null);

  const handleBookingTypeChanges = (type: 'single' | 'multi') => {
    setBookingType(type);
  }

  /* logging user's selection for booking date(s) (will need to be passed to backend) */
  const handleSingleBookingSubmit = (datetype: DateType) => {
    console.log('Selected Time:', datetype.justDate);
    console.log('Start Time:', datetype.startDateTime);
    console.log('End Time:', datetype.endDateTime);

    localStorage.setItem('bookingData', JSON.stringify(datetype));
    onBookingData(datetype); /* pass data to CreateBooking */
    navigate('/booking'); /* navigate to booking form page */
    setBookingType(null);
  }

  const handleMultiBookingSubmit = (dateRange: DateRange) => {
    console.log('Start Date:', dateRange.startDate);
    console.log('Start Time:', dateRange.startTime);
    console.log('End Date:', dateRange.endDate);
    console.log('End Time:', dateRange.endTime);

    localStorage.setItem('bookingData', JSON.stringify(dateRange));
    onBookingData(dateRange); /* pass data to CreateBooking */
    navigate('/booking'); /* navigate to booking form page */
    setBookingType(null);
  }


  /* todo: add inline styling to separate css file */
  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }

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