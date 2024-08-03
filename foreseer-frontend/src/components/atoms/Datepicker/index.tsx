import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CalendarContainerProps {
  className: string;
  children: React.ReactNode;
}

// const LocalCalendarContainer = ({
//   className,
//   children,
// }: CalendarContainerProps) => {
//   console.log({ className });
//   return (
//     <div
//       style={{
//         backgroundColor: "grey",
//       }}
//     >
//       <CalendarContainer className={className}>
//         <div style={{ position: "relative" }}>{children}</div>
//       </CalendarContainer>
//     </div>
//   );
// };

interface DatepickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  clearable?: boolean;
}

const Datepicker: React.FC<DatepickerProps> = ({
  selectedDate,
  onChange,
  placeholder,
  clearable,
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
      />
    </div>
  );
};

export default Datepicker;
