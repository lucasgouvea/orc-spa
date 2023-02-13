import { Button, TextField, Box } from "@mui/material";
import { GenericModal, Loading } from "../../components";
import { useFormik } from "formik";
import { vehicleSchema } from "./vehicle-schema";
import { useCreateVehicle } from "../../hooks";

export default function CreateVehicleModal({ onClose, open }) {
  const onSuccess = () => {
    alert("Veículo cadastrado com sucesso!");
    onClose();
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  const { mutate, isLoading } = useCreateVehicle(onSuccess, onError);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    resetForm,
    isValid,
    dirty
  } = useFormik({
    initialValues: {
      model: "",
      licensePlate: ""
    },
    onSubmit: (vehicle) => mutate(vehicle),
    validationSchema: vehicleSchema
  });

  const handleCancel = () => {
    setTimeout(() => resetForm(), 500);
    onClose();
  };

  return (
    <GenericModal open={open} title="Cadastrar Veículo" onClose={handleCancel}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box style={{ width: 400 }}>
            <TextField
              id="model"
              label="Modelo"
              variant="outlined"
              error={touched.model && errors.model}
              helperText={errors.model || "Insira o modelo do veículo"}
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.model}
            />
          </Box>

          <Box style={{ marginTop: 20 }}>
            <TextField
              id="licensePlate"
              label="Placa"
              variant="outlined"
              error={touched.licensePlate && errors.licensePlate}
              helperText={errors.licensePlate || "Insira a placa do veículo"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.licensePlate}
              fullWidth
            />
          </Box>

          <Box
            style={{
              marginTop: 50,
              display: "flex",
              width: "100%",
              justifyContent: "space-around"
            }}>
            <Button variant="contained" type="submit" disabled={!isValid || !dirty}>
              Cadastrar
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancelar
            </Button>
          </Box>
        </form>
      )}
    </GenericModal>
  );
}
