import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatepickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  clearable?: boolean;
  showTimeSelect: boolean;
}

const Datepicker: React.FC<DatepickerProps> = ({
  selectedDate,
  onChange,
  placeholder,
  clearable,
  showTimeSelect,
}) => {
  return (
    <div className={"datepickerContainer"}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
        className={"input"}
        // calendarContainer={LocalCalendarContainer}
        placeholderText={placeholder}
        isClearable={clearable}
        clearButtonClassName="clearButton"
        showTimeSelect={showTimeSelect}
        timeIntervals={1}
      />
    </div>
  );
};

export default Datepicker;
