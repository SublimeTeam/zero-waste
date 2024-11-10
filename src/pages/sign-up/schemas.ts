import * as Yup from "yup";
import type { InferType } from "yup";

const generalAccountSchema = Yup.object({
  email: Yup.string()
    .email("E-mail deve ser válido")
    .required("O E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
  passwordConfirmation: Yup.string()
    .required("Por favor, confirme sua senha")
    .oneOf([Yup.ref("password")], "As senhas não batem"),
  cep: Yup.string()
    .required("O CEP é obrigatório")
    .length(8, "CEP deve conter 8 caracteres.")
    .matches(/^\d+$/, { message: "CEP deve conter apenas números." }),
  state: Yup.string().required("O estado é obrigatório"),
  city: Yup.string().required("O município é obrigatório"),
  street: Yup.string().required("A rua é obrigatória"),
  district: Yup.string().required("O bairro é obrigatório"),
});

export type GeneralAccountSchema = InferType<typeof generalAccountSchema>;

export const personalSchema = Yup.object({
  username: Yup.string().required("Digite o seu nome completo"),
  cpf: Yup.string()
    .length(11, "O CPF deve ter 11 caracteres")
    .matches(/^\d+$/, { message: "CPF deve conter apenas números." })
    .required(),
}).concat(generalAccountSchema);

export type PersonalType = InferType<typeof personalSchema>;

export const businessSchema = Yup.object({
  name: Yup.string().required("Digite o nome do seu negócio"),
  cnpj: Yup.string()
    .length(14, "O CNPJ deve ter 14 caracteres")
    .matches(/^\d+$/, { message: "CNPJ deve conter apenas números." }),
}).concat(generalAccountSchema);

export type BusinessType = InferType<typeof businessSchema>;
