import * as Yup from "yup";

export const companySchema = Yup.object({
  name: Yup.string()
    .max(30, "O nome da empresa deve ter no máximo 30 letras.")
    .required("Este campo é obrigatório."),
  type: Yup.string().not(["none"])
});
