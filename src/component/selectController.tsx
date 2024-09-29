import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export interface InputBasePropsSizeOverrides {}
interface SelectContolProps {
  /** Filed name form will return input value from this name */
  name: string;
  /** React hook form control */
  control: any;
  /** list of object for passing in select options */
  select_option: any;
  /** Determines input disable */
  disable?: boolean;
  /** Helper Object with error messages works matching with field name */
  helperObject?: any;
  /** Determines input placeholder text */
  placeholder?: string;
  /** Determines input label */
  label?: string;
  /** optional handle change function  */
  handleChange?: Function;
  /** The size of the component. 'small' | 'medium'*/
  size?: any;
  /** classname for custome style of the component */
  className?: any;
  /** default value for the select component */
  defaultValue?: unknown;
  /**boolean value for required field */
  required?: boolean;
}

/**
 * @author Shilpa Veronica
 * @param SelectContolProps - refer interface
 * @returns React JSXElement - A custom select component.
 */

const SelectController = (props: SelectContolProps) => {
  const {
    control,
    disable = false,
    name,
    label,
    defaultValue,
    size,
    select_option = [],
    className,
    required,
  } = props;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required }}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
              onChange={onChange}
              size={"small"}
              label={label}
              error={error !== undefined}
              className={"text-base"}
              disabled={disable}
              value={value}
              defaultValue={defaultValue}
              multiple
            >
              {select_option?.map((datas: any, i: number) => {
                return (
                  <MenuItem key={i} value={datas.value}>
                    {datas.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      }}
    />
  );
};

export default SelectController;
