import { useEffect, useState } from 'react'
import ReactCalendar from 'react-calendar';
import instance from '../api/axios';
import { add, format, isWithinInterval } from 'date-fns';

const UNAVAILABLE_DATES = '/bookings/unavailableDates'


/* interface is defining the structure of object that represents an unavailable date range. 
Props: startDate and endDate, represent start and end dates of unavailable range. */
interface UnavailableDateRange {
  startDate: string;
  endDate: string;
}

/* interface is defining the structure of object that represents a selected date and time range 
Props: `justDate`, `startDateTime`, and `endDateTime`, can be either a `Date` object or `null`. 
Props used to store selected start and end dates and times in calendar component. */
interface DateType {
  justDate: Date | null;
  startDateTime: Date | null;
  endDateTime: Date | null;
}



/* interface is defining the structure of props that can be passed to the `CalendarComponent` component. 
Prop `onSubmit` function, takes parameter of type `DateType` and returns nothing (`void`). 
`onSubmit` function is used to notify parent component when a date and time range is selected in the calendar. */
interface CalendarComponentProps {
  onSubmit: (value: DateType) => void
}

/* CalendarComponent React functional component represents a calendar
component with date and time selection functionality. */
function CalendarComponent({onSubmit}: CalendarComponentProps) {

  const [unavailableDates, setUnavailableDates] = useState<UnavailableDateRange[]>([]);
  
  /* `useEffect` hook is used to fetch unavailable dates from the server when the component mounts. 
  Makes HTTP GET request to the `/bookings/unavailableDates` endpoint using the `instance` axios instance. */
  useEffect(() => {
    instance.get(UNAVAILABLE_DATES).then((response) => {
      setUnavailableDates(response.data);
    }).catch((error) => {
      console.error('Error fetching unavailable dates', error);
    })
  }, []);

  // handling date/time selection, initially set to null 
  const [date, setDate] = useState<DateType>({
    justDate: null,
    startDateTime: null,
    endDateTime: null
  });
  
/* getTimes function generates an array of available times for the selected date. */
  const getTimes = () => {
    if (!date.justDate) {
      return;
    }

    const { justDate } = date;
    // displaying opening and closing hours for a day/week 9-7 
    const beginning = add(justDate, {hours: 9});
    const end = add(justDate, {hours: 17});
    const interval = 30; // minutes

    const times = [];
    for (let i = beginning; i <= end; i = add(i, {minutes: interval})) {
      times.push(i);
    }

    return times;
  }


/**
 * handleTimeSelection function updates `startDateTime` or `endDateTime` 
 * property of `date` object based on the `type` parameter.
 * 
 * @param {Date} time - time represents the selected time value.
 * @param {'start-time' | 'end-time'} type - `type` that can have two possible values: 
 * `'start-time'` or `'end-time'`. 
 * Used to determine whether the `time` parameter is for the start time or the end time.
 */
  const handleTimeSelection = (time: Date, type: 'start-time' | 'end-time') => {
    if (type === 'start-time') {
      setDate((prev) => ({...prev, startDateTime: time}));
    } else {
      setDate((prev) => ({...prev, endDateTime: time}));
    }
  }
  
/**
 * handleSubmit function checks if startDateTime and endDateTime are selected 
 * and notifies parent component if they are, otherwise it displays an alert.
 */
  const handleSubmit = () => {
    // notify parent component of selection 
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


/**
 * function checks if a given date is within any of the unavailable date ranges.
 * 
 * @param {Date} date - `date` object represents a specific date.
 * 
 * @returns boolean value indicating whether the given date is unavailable or not.
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
 * @returns boolean value indicating whether the given time is within any of the unavailable date ranges.
 */
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


// rendering JSX elements that make up the calendar component. 
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