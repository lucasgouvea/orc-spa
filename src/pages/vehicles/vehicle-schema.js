import * as Yup from "yup";

export const vehicleSchema = Yup.object({
  model: Yup.string()
    .max(30, "O modelo do veículo deve ter no máximo 30 letras.")
    .required("Este campo é obrigatório."),
  licensePlate: Yup.string()
    .length(8, "A placa do veículo deve ter 8 letras.")
    .required("Este campo é obrigatório.")
});
