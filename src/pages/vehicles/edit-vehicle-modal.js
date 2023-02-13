import { Button, TextField, Box } from "@mui/material";
import { useQueryClient } from "react-query";

import { useUpdateVehicle } from "../../hooks";
import { GenericModal, Loading } from "../../components";
import { useFormik } from "formik";
import { vehicleSchema } from "./vehicle-schema";
import { useEffect } from "react";

export default function EditVehicleModal({ onClose, open, data }) {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    alert("Veículo atualizado com sucesso!");
    queryClient.invalidateQueries("vehicles");
    onClose();
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  const { mutate, isLoading } = useUpdateVehicle(onSuccess, onError);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setValues,
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

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [setValues, data]);

  const handleCancel = () => {
    onClose();
  };

  return (
    <GenericModal open={open} title="Editar Veículo" onClose={handleCancel}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box style={{ width: 400 }}>
            <TextField
              id="model"
              label="modelo"
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
              Atualizar
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
