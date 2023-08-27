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
  }
  
  const startTimes = getTimes(date.startDate);
  const endTimes = getTimes(date.endDate);
  
  const handleSubmit = () => {
    if (date.startTime && date.endTime) {
      /* notifying parent component of selection */
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

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      {!date.startDate ? (
        <ReactCalendar minDate={new Date()}
          onClickDay={handleStartDateSelection}
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
        <div>Your booking is set</div>
      )}

      {date.endTime && (
        <button style={submitButtonStyle} onClick={handleSubmit}>Submit</button>
      )}
    </div>
  )

}

export default CalendarComponentRangeOfDays