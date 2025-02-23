import { Button } from "/src/components/ui/button.jsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "/src/components/ui/form.jsx";
import { Input } from "/src/components/ui/input.jsx";
import { zodResolver } from "/@fs/C:/Users/abc/Desktop/WealthWizard1/node_modules/.vite/deps/@hookform_resolvers_zod.js?v=30423252";
import { useForm } from "/@fs/C:/Users/abc/Desktop/WealthWizard1/node_modules/.vite/deps/react-hook-form.js?v=30423252";
import * as z from "/@fs/C:/Users/abc/Desktop/WealthWizard1/node_modules/.vite/deps/zod.js?v=30423252";
import { jsxDEV } from "react/jsx-dev-runtime";

const FormSchema = z.object({
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2023),
  amount: z.number().min(0),
});

function BudgetForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      month: 1,
      year: new Date().getFullYear(),
      amount: 0,
    },
    mode: "onChange",
  });

  function handleSubmit(values) {
    onSubmit(values);
  }
  return jsxDEV(
    Form,
    {
      ...form,
      onSubmit: form.handleSubmit(handleSubmit),
      children: [
        jsxDEV(
          FormField,
          {
            control: form.control,
            name: "category",
            render: ({ field }) =>
              jsxDEV(
                FormItem,
                {
                  children: [
                    jsxDEV(
                      FormLabel,
                      { children: "Category" },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 48,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormControl,
                      {
                        children: jsxDEV(
                          Input,
                          { placeholder: "Enter category", ...field },
                          void 0,
                          false,
                          {
                            fileName:
                              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                            lineNumber: 50,
                            columnNumber: 17,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 49,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormMessage,
                      {},
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 52,
                        columnNumber: 15,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                  lineNumber: 47,
                  columnNumber: 9,
                },
                this
              ),
          },
          void 0,
          false,
          {
            fileName:
              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
            lineNumber: 43,
            columnNumber: 9,
          },
          this
        ),
        jsxDEV(
          FormField,
          {
            control: form.control,
            name: "month",
            render: ({ field }) =>
              jsxDEV(
                FormItem,
                {
                  children: [
                    jsxDEV(
                      FormLabel,
                      { children: "Month" },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 61,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormControl,
                      {
                        children: jsxDEV(
                          Input,
                          { type: "number", placeholder: "Enter month", ...field },
                          void 0,
                          false,
                          {
                            fileName:
                              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                            lineNumber: 63,
                            columnNumber: 17,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 62,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormMessage,
                      {},
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 65,
                        columnNumber: 15,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                  lineNumber: 60,
                  columnNumber: 9,
                },
                this
              ),
          },
          void 0,
          false,
          {
            fileName:
              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
            lineNumber: 56,
            columnNumber: 9,
          },
          this
        ),
        jsxDEV(
          FormField,
          {
            control: form.control,
            name: "year",
            render: ({ field }) =>
              jsxDEV(
                FormItem,
                {
                  children: [
                    jsxDEV(
                      FormLabel,
                      { children: "Year" },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 74,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormControl,
                      {
                        children: jsxDEV(
                          Input,
                          { type: "number", placeholder: "Enter year", ...field },
                          void 0,
                          false,
                          {
                            fileName:
                              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                            lineNumber: 76,
                            columnNumber: 17,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 75,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormMessage,
                      {},
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 78,
                        columnNumber: 15,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                  lineNumber: 73,
                  columnNumber: 9,
                },
                this
              ),
          },
          void 0,
          false,
          {
            fileName:
              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
            lineNumber: 69,
            columnNumber: 9,
          },
          this
        ),
        jsxDEV(
          FormField,
          {
            control: form.control,
            name: "amount",
            render: ({ field }) =>
              jsxDEV(
                FormItem,
                {
                  children: [
                    jsxDEV(
                      FormLabel,
                      { children: "Amount" },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 87,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormControl,
                      {
                        children: jsxDEV(
                          Input,
                          {
                            type: "number",
                            placeholder: "Enter amount",
                            ...field,
                          },
                          void 0,
                          false,
                          {
                            fileName:
                              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                            lineNumber: 89,
                            columnNumber: 17,
                          },
                          this
                        ),
                      },
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 88,
                        columnNumber: 15,
                      },
                      this
                    ),
                    jsxDEV(
                      FormMessage,
                      {},
                      void 0,
                      false,
                      {
                        fileName:
                          "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                        lineNumber: 95,
                        columnNumber: 15,
                      },
                      this
                    ),
                  ],
                },
                void 0,
                true,
                {
                  fileName:
                    "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
                  lineNumber: 86,
                  columnNumber: 9,
                },
                this
              ),
          },
          void 0,
          false,
          {
            fileName:
              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
            lineNumber: 82,
            columnNumber: 9,
          },
          this
        ),
        jsxDEV(
          Button,
          { type: "submit", children: "Create" },
          void 0,
          false,
          {
            fileName:
              "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
            lineNumber: 100,
            columnNumber: 9,
          },
          this
        ),
      ],
    },
    void 0,
    true,
    {
      fileName:
        "C:/Users/abc/Desktop/WealthWizard1/client/src/components/forms/budget-form.jsx",
      lineNumber: 42,
      columnNumber: 5,
    },
    this
  );
}

export default BudgetForm;