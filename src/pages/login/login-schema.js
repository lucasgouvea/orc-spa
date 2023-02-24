import * as Yup from "yup";

export const loginSchema = Yup.object({
  user: Yup.string()
    .max(30, "O nome do usuário deve ter no máximo 30 letras")
    .required("Este campo é obrigatório"),
  password: Yup.string()
    .max(30, "A senha deve ter no máximo 30 letras")
    .required("Este campo é obrigatório")
});
