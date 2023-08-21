import React, { useState } from 'react'
import ReactCalendar from 'react-calendar';
import { add, format } from 'date-fns';

/* things to thing about:
    - need a calendar entry component to pick a time/date for a booking 
      - in addition, need to think about how time/day are being shown and selected 
    - need to indicate if a time/day is free or not (available/unavailable) 
*/

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

interface CalendarComponentProps {
  onSubmit: (value: DateType) => void
  /* if want to add additional fields or functions, add below
    ex: an array or function displaying avaiable days */
}

function CalendarComponent({onSubmit}: CalendarComponentProps) {

  /* handling date/time selection, initially set to null */
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null
  });

  console.log(date.dateTime)
  
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


  const handleTimeSelection = (time: Date) => {
    /* update state with selected time */
    setDate((prev) => ({...prev, dateTime: time}));

    /* notify parent component of selection */
    onSubmit({justDate: date.justDate, dateTime: time});
  }
  

  const times = getTimes();

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {/* when a user has only select a date, we want to show them available times */}
      {date.justDate ? (
        <div className='flex gap-4'>
           {/* Show available times for selected date  */}
           {times?.map((time, i) => (
            <div key={`time-${i}`} className='rounded-sm bg-gray-100 p-2'>
              {/* set up a callback to notify parent component of time selection */}
              <button type='button' onClick={() => handleTimeSelection(time)}>
                {format(time, 'hh:mm')}
              </button>
            </div>
           ))}
        </div>
      ) : ( 
        <ReactCalendar minDate={new Date()} 
          className='calendar p-2' 
          view='month' 
          onClickDay={(date) => setDate((prev) => ({...prev, justDate: date}))} 
        />
      )}
    </div>
  )
}

export default CalendarComponent;