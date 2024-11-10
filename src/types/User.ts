import { PersonalType } from "@/pages/sign-up/schemas";

export type UserOrder = {
  id: string;
  name: string;
  businessName: string;
  date: string;
  status: "preparado" | "entregue" | "cancelado";
};

export type User = {
  id?: number;
  orders?: UserOrder[];
} & Required<Omit<PersonalType, "passwordConfirmation">>;
