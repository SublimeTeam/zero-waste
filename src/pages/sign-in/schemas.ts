import { boolean, InferType, object, string } from "yup";

export const signInSchema = object({
  email: string()
    .email("E-mail deve ser válido")
    .required("O E-mail é obrigatório"),
  password: string().required("Senha é obrigatório"),
  rememberMe: boolean().default(false),
});

export type SignInData = InferType<typeof signInSchema>;
