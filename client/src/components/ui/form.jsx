import * as React from "react";
import { Controller, FormProvider } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const Form = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <FormProvider {...props}>
      <form ref={ref} className={cn("space-y-6", className)}>
        {children}
      </form>
    </FormProvider>
  );
});
Form.displayName = "Form";

const FormField = ({ name, control, render }) => {
  if (!control || !name || !render) return null;
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => render({ field, fieldState })}
    />
  );
};
FormField.displayName = "FormField";

const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <label ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
));
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp ref={ref} className={cn("mt-2", className)} {...props} />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  if (!children) return null;
  return (
    <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
};