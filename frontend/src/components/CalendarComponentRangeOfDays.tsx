import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import { add, format } from 'date-fns';

/* interface for selecting a range of days */
interface DateRange {
  startDate: Date | null;
  startTime: Date | null;
  endDate: Date | null;
  endTime: Date | null;
}

interface CalendarComponentProps {
  onSubmit: (value: DateRange) => void;
}

function CalendarComponentRangeOfDays({onSubmit}: CalendarComponentProps) {
  const [date, setDate] = useState<DateRange>({
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null
  });


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


  const handleStartDateSelection = (date: Date) => {
    setDate((prev) => ({...prev, startDate: date, startTime: null, endDate: null, endTime: null}));
  }

  const handleStartTimeSelection = (time: Date) => {
    setDate((prev) => ({...prev, startTime: time}));
    /* handle end date after start time selection */
  }

  const handleEndDateSelection = (date: Date) => {
    setDate((prev) => ({...prev, endDate: date, endTime: null}));
  }

  const handleEndTimeSelection = (time: Date) => {
    setDate((prev) => ({...prev, endTime: time}));
    onSubmit(date); /* notifying parent component of selection */
  }


  const startTimes = getTimes(date.startDate);
  const endTimes = getTimes(date.endDate);




  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {!date.startDate ? (
        <ReactCalendar minDate={new Date()}
          onClickDay={handleStartDateSelection}
        />
      ) : !date.startTime ? (
        <div className='flex gap-4'>
          {startTimes?.map((time, i) => (
            <button key={`start-time-${i}`} type='button' onClick={() => handleStartTimeSelection(time)}>
                {format(time, 'hh:mm')}
            </button>
          ))}
        </div>
      ) : !date.endDate ? (
        <ReactCalendar minDate={date.startDate} 
          onClickDay={handleEndDateSelection}
        />
      ) : !date.endTime ? (
        <div className='flex gap-4'> 
          {endTimes?.map((time, i) => (
            <button key={`end-time-${i}`} type='button' onClick={() => handleEndTimeSelection(time)}>
              {format(time, 'hh:mm')}
            </button>
          ))}
        </div>
      ) : (
        <div>Your booking is set</div>
      )}
    </div>
  )
}

export default CalendarComponentRangeOfDays