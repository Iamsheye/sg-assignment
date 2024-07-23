import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface FormFieldProps extends React.HTMLProps<HTMLDivElement> {
  type?: string;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errorText?: string;
}

const FormField = ({
  label,
  type = "text",
  name,
  register,
  errorText,
  ...rest
}: FormFieldProps) => {
  if (type === "textarea") {
    return (
      <div {...rest}>
        <Label htmlFor={name}>{label}</Label>
        <Textarea id={name} className="resize-none" {...register(name)} />
        {errorText && (
          <span className="text-rose-600 text-xs pt-1 font-medium">
            {errorText}
          </span>
        )}
      </div>
    );
  }
  
  return (
    <div {...rest}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} {...register(name)} type={type} />
      {errorText && (
        <span className="text-rose-600 text-xs pt-1 font-medium">
          {errorText}
        </span>
      )}
    </div>
  );
};

export default FormField;
