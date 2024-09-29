import TextField from "@mui/material/TextField";
import React, { FC } from "react";
import { Controller } from "react-hook-form";

interface Props {
    control: any;
    disable?: boolean;
    varient?: "standard" | "outlined" | "filled";
    endIcon?: "search" | "select" | "remove" | "calendar" | string | React.ReactNode;
    startIcon?: "inr" | "calendar" | string | React.ReactNode;
    handleClick?: React.MouseEventHandler<HTMLDivElement>;
    name: string;
    helperObject?: any;
    required?: boolean;
    placeholder?: string;
    label?: string;
    multiline?: boolean;
    validate?: any;
    maxLength?: number;
    onFieldClear?: React.MouseEventHandler<SVGSVGElement> | undefined;
    upperCase?: boolean
    fieldType?: any
    readOnly?: boolean
    handleOnChange?: Function
    className?: string
}

export const InputController:FC<Props> = (props) => {
    const {
        control,
        disable = false,
        varient,
        handleClick,
        name,
        helperObject,
        required = false,
        placeholder,
        label,
        multiline,
        validate,
        maxLength,
        upperCase,
        fieldType,
        handleOnChange,
        className = ""
    } = props;
    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            rules={{
                required: required,
                ...(validate && { validate }),
            }}
            render={({ field: { onChange, value, ...field }, fieldState: { error } }:any) => {
                return (
                    <TextField
                        {...field}
                        autoComplete="off"
                        onChange={handleOnChange ? ({ target: { value } }) => {
                            handleOnChange(onChange, value)
                        } : onChange}
                        required={required}
                        value={value ?? ""}
                        placeholder={placeholder}
                        label={label}
                        variant={varient || "outlined"}
                        id={name}
                        sx={{
                            mb: 2,
                            width: "100%",
                        }}
                        disabled={disable}
                        size="small"
                        multiline={multiline}
                        error={error !== undefined}
                        type={fieldType}
                        className={className || ""}
                        helperText={
                            error !== undefined && error?.message
                                ? error?.message
                                : error !== undefined && typeof helperObject === "string"
                                    ? helperObject
                                    : error !== undefined && helperObject
                                        ? helperObject[name] !== undefined
                                            ? helperObject[name][error.type]
                                            : `${name} is required`
                                        : ""
                        }
                        inputProps={{
                            ...(maxLength && { maxLength: maxLength }),
                            ...(upperCase && { style: { textTransform: "uppercase" } })
                        }}
                        onClick={disable ? undefined : handleClick}
                    />
                );
            }}
        />
    )
}