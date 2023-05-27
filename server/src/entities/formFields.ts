export interface FormField {
  id: string;
  value?: string;
  isSubmitButton?: boolean;
}

export type loginUnipFields = "userId" | "password" | "submitButton";
