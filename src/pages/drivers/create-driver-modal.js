import { Button, Checkbox, TextField, Typography, Box, FormControlLabel } from "@mui/material";
import { useMutation } from "react-query";
import { GenericModal, Loading } from "../../components";
import { useFormik } from "formik";
import { driverSchema } from "./driver-schema";
import { createDriver } from "../../hooks";

export default function CreateDriverModal({ onClose, open }) {
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
      name: "",
      age: "",
      licenseA: false,
      licenseB: false,
      licenseC: false,
      licenseD: false,
      licenseE: false
    },
    onSubmit: (driver) => mutate(driver),
    validationSchema: driverSchema
  });
  const { mutate, isLoading } = useMutation(createDriver, {
    onSuccess: () => {
      alert("Motorista cadastrado com sucesso!");
      onClose();
    },
    onError: (e) => {
      alert("Houve algum problema!");
    }
  });

  const handleCancel = () => {
    setTimeout(() => resetForm(), 500);
    onClose();
  };

  return (
    <GenericModal open={open} title="Cadastrar Motorista" onClose={handleCancel}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box style={{ width: 400 }}>
            <TextField
              id="name"
              label="Nome"
              variant="outlined"
              error={touched.name && errors.name}
              helperText={errors.name || "Insira o nome do motorista"}
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
          </Box>

          <Box style={{ marginTop: 20, width: 400 }}>
            <Typography id="title" variant="h8">
              Cartas:
            </Typography>
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            <FormControlLabel
              control={<Checkbox checked={values.licenseA} />}
              label="A"
              name="licenseA"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox checked={values.licenseB} />}
              label="B"
              name="licenseB"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox checked={values.licenseC} />}
              label="C"
              name="licenseC"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox checked={values.licenseD} />}
              label="D"
              name="licenseD"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox checked={values.licenseE} />}
              label="E"
              name="licenseE"
              onChange={handleChange}
            />
          </Box>

          <Box style={{ marginTop: 20 }}>
            <TextField
              id="age"
              label="Idade"
              variant="outlined"
              error={touched.age && errors.age}
              helperText={errors.age || "Insira a idade do motorista"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.age}
              type="number"
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
