import React, { useEffect, useRef, useState } from "react";
import Select, {
  DropdownIndicatorProps,
  GroupBase,
  components,
} from "react-select";
import ReactSelectCreatable from "react-select/creatable";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  selected?: string[];
  multiple?: boolean;
  onChange: (value: any) => void;
  placeholder?: string;
  onBlur?: () => void;
  loading?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  forceFocus?: boolean;
}

const CreatableDropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  multiple = false,
  onChange,
  placeholder,
  onBlur,
  loading,
  disabled,
  bordered = true, // Default to true
  forceFocus,
}) => {
  const selectRef = useRef<any>(null);

  const selectedOptions = multiple
    ? options.filter((option) => selected?.includes(option.value))
    : options.find((option) => option.value === selected?.[0]);
  const customStyles = {
    base: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      borderColor: bordered ? "grey" : state.isFocused ? "grey" : "transparent", // Apply border only when focused or menu is open
      borderRadius: "1rem", // Set border radius to 1rem

      boxShadow: state.isFocused ? "#fff" : "none", // Example focus style
      // Other styles as previously defined
      backgroundColor: "traansparent",
      cursor: "pointer",
      "min-width": selected ? "fit-content" : "156px",
      width: state.isFocused ? "12rem" : "fit-content",
      caretColor: "white", // Set the color of the cursor
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white", // Set the text color for the input field
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#161822", // Change the dropdown menu background color
      "z-index": 999,
    }),
    option: (provided: any, state: { isSelected: any; isFocused: any }) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "rgba(97, 96, 97, 0.3)"
        : "transparent",
      "&:active": {
        backgroundColor: "rgba(97, 96, 97, 0.3)",
      },
      "&:hover": {
        backgroundColor: "rgba(97, 96, 97, 0.1)",
      },
      wrap: "break-word",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: "white", // This sets the text color of the selected value
    }),
  };

  // Custom Dropdown Indicator component
  const DropdownIndicator = (
    props: React.JSX.IntrinsicAttributes &
      DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>
  ) => {
    return null; // Do not render the dropdown arrow unless the select box is focused or the menu is open
  };

  useEffect(() => {
    if (forceFocus) {
      selectRef.current.focus();
    }
  }, [forceFocus]);

  return (
    <ReactSelectCreatable
      isMulti={multiple}
      options={options}
      value={selectedOptions}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
      isLoading={loading}
      isDisabled={disabled}
      styles={customStyles}
      ref={selectRef}
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
    />
  );
};

export default CreatableDropdown;
