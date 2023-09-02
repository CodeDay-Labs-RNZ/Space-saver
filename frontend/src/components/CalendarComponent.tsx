import React, { useEffect, useState } from 'react'
import ReactCalendar from 'react-calendar';
import instance from '../api/axios';
import { add, format, isWithinInterval } from 'date-fns';

const UNAVAILABLE_DATES = '/bookings/unavailableDates'

interface DateType {
  justDate: Date | null;
  startDateTime: Date | null;
  endDateTime: Date | null;
}

interface UnavailableDateRange {
  startDate: string;
  endDate: string;
}

interface CalendarComponentProps {
  onSubmit: (value: DateType) => void
  /* if want to add additional fields or functions, add below
    ex: an array or function displaying avaiable days */
}

function CalendarComponent({onSubmit}: CalendarComponentProps) {

  const [unavailableDates, setUnavailableDates] = useState<UnavailableDateRange[]>([]);

  useEffect(() => {
    instance.get(UNAVAILABLE_DATES).then((response) => {
      setUnavailableDates(response.data);
    }).catch((error) => {
      console.error('Error fetching unavailable dates', error);
    })
  }, []);


  /* handling date/time selection, initially set to null */
  const [date, setDate] = useState<DateType>({
    justDate: null,
    startDateTime: null,
    endDateTime: null
  });

  
  /* getting available times for the selected date */
  const getTimes = () => {
    if (!date.justDate) {
      return;
    }

    const { justDate } = date;
    /* displaying opening and closing hours for a day/week 9-7 */
    const beginning = add(justDate, {hours: 9});
    const end = add(justDate, {hours: 17});
    const interval = 30; // minutes

    const times = [];
    for (let i = beginning; i <= end; i = add(i, {minutes: interval})) {
      times.push(i);
    }

    return times;
  }


  const handleTimeSelection = (time: Date, type: 'start-time' | 'end-time') => {
    if (type === 'start-time') {
      setDate((prev) => ({...prev, startDateTime: time}));
    } else {
      setDate((prev) => ({...prev, endDateTime: time}));
    }
  }
  
  const handleSubmit = () => {
    /* notify parent component of selection */
    if (date.startDateTime && date.endDateTime) {
      onSubmit({
        justDate: date.justDate,
        startDateTime: date.startDateTime,
        endDateTime: date.endDateTime
      })
    } else {
      alert("Please select both start and end times");
    }
  }

  const times = getTimes();


  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(range => 
      isWithinInterval(date, { start: new Date(range.startDate), end: new Date(range.endDate) })
    );
  };

  const isTimeUnavailable = (time: Date) => {
    return unavailableDates.some(range => 
      isWithinInterval(time, { start: new Date(range.startDate), end: new Date(range.endDate) })
    );
  };


  const dropdownStyle = {
    padding: '10px',
    margin: '10px',
    fontSize: '16px',
  }

  const submitButtonStyle = {
    backgroundColor: 'blue',
    padding: '10px 20px',
    margin: '10px',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }


  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {/* when a user has only select a date, we want to show them available times */}
      {date.justDate ? (
        <div className='flex flex-col gap-4'>
          <div>

            {/* dropdown for selecting start or end time */}
            <label>
              Start Time:
              <select
                style={dropdownStyle}
                onChange={(e) => handleTimeSelection(new Date(e.target.value), 'start-time')}>
                <option value=''>Start Time</option>
                  {times?.map((time, i) => (
                    <option key={`start-time-${i}`} value={time.toISOString()}>
                      {format(time, 'hh:mm')}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              End Time:
              <select 
                style={dropdownStyle}
                onChange={(e) => handleTimeSelection(new Date(e.target.value), 'end-time')}>
                <option value=''>End Time</option>
                {times?.map((time, i) => (
                  <option key={`end-time-${i}`} value={time.toISOString()}>
                    {format(time, 'hh:mm')}
                  </option>
                ))}
              </select>
            </label>
            <p>Please select your desired times and click "Continue To Form" to proceed</p>

            <button style={submitButtonStyle} onClick={handleSubmit}>Continue To Form</button>
          </div>
        </div>
      ) : ( 
        <ReactCalendar 
          minDate={new Date()} 
          className='calendar p-2' 
          view='month' 
          onClickDay={(date) => setDate((prev) => ({...prev, justDate: date}))} 
          tileDisabled={({ date, view }) => view === 'month' && isDateUnavailable(date)
        }
        />
      )}
    </div>
  )
}

export default CalendarComponent;