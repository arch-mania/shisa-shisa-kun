export type ActionErrors = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  age?: string;
  rent?: string;
  annualIncome?: string;
  _form?: string;
};

export type FormData = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  age?: string;
  rent?: string;
  annualIncome?: string;
};

export type ActionData = {
  errors?: ActionErrors;
  success: boolean;
  message?: string;
};
