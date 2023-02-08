import * as Yup from "yup";

export const driverSchema = Yup.object({
  name: Yup.string()
    .max(30, "O nome do motorista deve ter no máximo 30 letras")
    .required("Este campo é obrigatório"),
  age: Yup.number()
    .min(18, "A idade deve ser maior que 18 anos")
    .max(100, "A idade deve ser menor que 100 anos")
    .required("Este campo é obrigatório"),
  licenseA: Yup.boolean(),
  licenseB: Yup.boolean(),
  licenseC: Yup.boolean(),
  licenseD: Yup.boolean()
});
