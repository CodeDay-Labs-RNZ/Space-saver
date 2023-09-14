import { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import instance from '../api/axios';
import { add, format, isWithinInterval  } from 'date-fns';

const UNAVAILABLE_DATES = '/bookings/unavailableDates'

/* interface is defining the structure of object that represents an unavailable date range. 
Props: startDate and endDate, represent start and end dates of unavailable range. */
interface UnavailableDateRange {
  startDate: string;
  endDate: string;
}


/* interface is defining the structure of an object that represents a range of dates and times. 
Props: `startDate`, `startTime`, `endDate`, and `endTime`, can be either a `Date` object or `null`. 
Props used to store selected start and end dates and times in calendar component. */
interface DateRange {
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
}

/* interface is defining the structure of props that can be passed to the `CalendarComponentRangeOfDays` component. 
Props `onSubmit` function , takes `DateRange` object as its argument and returns nothing (`void`). 
This prop is used to handle the submission of the selected date range from the calendar component. */
interface CalendarComponentProps {
  onSubmit: (value: DateRange) => void;
}

/* CalendarComponentRangeOfDays React component renders calendar component for selecting range of dates and times. */
function CalendarComponentRangeOfDays({onSubmit}: CalendarComponentProps) {
  
  const [unavailableDates, setUnavailableDates] = useState<UnavailableDateRange[]>([]);
/* `useEffect` hook is used to fetch the unavailable dates from the server when the component is mounted. 
Makes HTTP GET request to the `/bookings/unavailableDates` endpoint using `instance` axios instance. */
  useEffect(() => {
    instance.get(UNAVAILABLE_DATES).then((response) => {
      setUnavailableDates(response.data);
    }).catch((error) => {
      console.error('Error fetching unavailable dates', error);
    })
  }, []);


  const [date, setDate] = useState<DateRange>({
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null
  });


  /* function generates an array of times for a given selected date. 
  takes `selectedDate` which can be a `Date` object or `null`. 
  If the `selectedDate` is `null`, function returns `undefined`. 
  Otherwise, calculates beginning and end times for the selected date (9 AM to 5 PM) 
  and generates an array of times at 30-minute intervals within that range. 
  Function returns the array of times. */
  const getTimes = (selectedDate: Date | null) => {
    if (!selectedDate) {
      return;
    }

    const beginning = add(selectedDate, {hours: 9}); 
    const end = add(selectedDate, {hours: 17});
    const interval = 30; // minutes

    const times = [];
    for (let i = beginning; i <= end; i = add(i, {minutes: interval})) {
      times.push(i);
    }

    return times;
  }


/**
 * function checks if a given date is within any of the unavailable date ranges.
 * 
 * @param {Date} date - `date`is `Date` object representing a specific date.
 * 
 * @returns a boolean value.
 */
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(range => 
      isWithinInterval(date, { start: new Date(range.startDate), end: new Date(range.endDate) })
    );
  };


/**
 * function checks if a given time is within any of the unavailable date ranges.
 * 
 * @param {Date} time - Date object representing a specific point in time.
 * 
 * @returns a boolean value indicating whether given time is within any of the unavailable date ranges.
 */
  const isTimeUnavailable = (time: Date) => {
    return unavailableDates.some(range => 
      isWithinInterval(time, { start: new Date(range.startDate), end: new Date(range.endDate) })
    );
  };


/**
 * function handleStartDateSelection updates the state with the selected start date if available,
 * otherwise displays an alert.
 * 
 * @param {Date} date - `date`is type `Date` and represents the selected start date.
 */
  const handleStartDateSelection = (date: Date) => {
    if (!isDateUnavailable(date)) {
      setDate((prev) => ({...prev, startDate: date, startTime: null, endDate: null, endTime: null}));
    } else {
      alert('The selected date is unavailable')
    }
  }


  /**
   * function handleStartTimeSelection updates the `startTime` property of the `date` object with
   * the provided `time` value.
   * 
   * @param {Date} time - `time`is type `Date` represents the selected start time.
   */
  const handleStartTimeSelection = (time: Date) => {
    setDate((prev) => ({...prev, startTime: time})); 
  }


/**
 * function handleEndDateSelection updates state by setting end date to selected date and resetting end time to null.
 * 
 * @param {Date} date - `date` is type `Date` and represents the selected end date.
 */
  const handleEndDateSelection = (date: Date) => {
    setDate((prev) => ({...prev, endDate: date, endTime: null}));
  }


/**
 * function handleEndTimeSelection updates the `endTime` property of the `date` object with the provided `time` value.
 * 
 * @param {Date} time - `time` is type `Date` represents the selected end time.
 */
  const handleEndTimeSelection = (time: Date) => {
    setDate((prev) => ({...prev, endTime: time}));
  }
  
  const startTimes = getTimes(date.startDate);
  const endTimes = getTimes(date.endDate);
  

/**
 * handleSubmit function checks if start and end times are selected 
 * and notifies parent component if they are, 
 * otherwise it displays an alert.
 */
  const handleSubmit = () => {
    if (date.startTime && date.endTime) {
      // notifying parent component of selection
      onSubmit(date);
    } else {
      alert("Please select start and end times");
    }
  }


  const labelStyle = {
    marginRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center'
  }
  const dropdownStyle = {
    padding: '10px',
    margin: '5px',
    fontSize: '15px'
  }
  const submitButtonStyle = {
    backgroundColor: 'blue',
    padding: '10px 20px',
    margin: '10px',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  }


  // rendering JSX elements that make up the calendar component. 
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {!date.startDate ? (
        <ReactCalendar minDate={new Date()}
          onClickDay={handleStartDateSelection}
          tileDisabled={({ date, view }) => view === 'month' && isDateUnavailable(date)}
        />
      ) : !date.startTime ? (
        <div className='flex align-items-center gap-4'>
          <label htmlFor='start-time' style={labelStyle}>Start Time:</label>
          <select 
            id='start-time'
            style={dropdownStyle} 
            value={(date.startTime as Date | null)?.toISOString() || ""}
            onChange={(e) => handleStartTimeSelection(new Date(e.target.value))}
          >
            <option value="" disabled selected>Start Time</option>
              {startTimes?.map((time, i) => (
                <option key={`start-time-${i}`} value={time.toISOString()}>
                  {format(time, 'hh:mm')}
                </option>
              ))}
          </select>
        </div>
      ) : !date.endDate ? (
        <ReactCalendar minDate={date.startDate} 
          onClickDay={handleEndDateSelection}
          tileDisabled={({ date, view }) => view === 'month' && isDateUnavailable(date)}
        />
      ) : !date.endTime ? (
        <div className='flex align-items-center gap-4'> 
        <label htmlFor='end-time' style={labelStyle}>End Time:</label>
          <select 
            id='end-time'
            style={dropdownStyle} 
            value={(date.endTime as Date | null)?.toISOString() || ""}
            onChange={(e) => handleEndTimeSelection(new Date(e.target.value))}
          >
            <option value="" disabled selected>End Time</option>        
              {endTimes?.map((time, i) => (
                <option key={`end-time-${i}`} value={time.toISOString()}>
                  {format(time, 'hh:mm')}
                </option>
                ))}
          </select>
        </div>
      ) : (
        <div>Please review your selected times and click "Continue To Form" to proceed</div>
      )}

      {date.endTime && (
        <button style={submitButtonStyle} onClick={handleSubmit}>Continue To Form</button>
      )}
    </div>
  )

}

export default CalendarComponentRangeOfDays