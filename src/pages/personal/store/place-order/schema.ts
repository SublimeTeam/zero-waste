import * as yup from "yup";

export const creditCardSchema = yup.object({
  cardNumber: yup
    .string()
    .required("Insira o número do cartão")
    .length(16, "Número de cartão inválido"),
  cvv: yup.string().required("Insira o CVV").length(3, "CVV inválido"),
  expirationDate: yup.string().required("Insira a data de validade"),
});
