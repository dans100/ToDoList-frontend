import React, { SyntheticEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom';

interface Props {
  onCloseDatePicker: (e: SyntheticEvent) => void;
  onChange: (e: Date) => void;
  date: Date | null;
}

export const Calendar = (props: Props) => {
  const CalendarBackdrop = () => {
    return <div className="backdrop" onClick={props.onCloseDatePicker}></div>;
  };

  return (
    <>
      {ReactDOM.createPortal(
        <CalendarBackdrop />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <DatePicker
          wrapperClassName="datePicker"
          selected={props.date}
          onChange={(date) => props.onChange(date as Date)}
          withPortal
          portalId="root-portal"
          inline
        />,
        document.getElementById('root-portal') as HTMLElement
      )}
    </>
  );
};
