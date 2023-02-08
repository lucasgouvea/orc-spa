import { Button, Checkbox, TextField, Typography, Box, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function CreateDriverModal({ onCancel }) {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      age: "",
      licenseA: false,
      licenseB: false,
      licenseC: false,
      licenseD: false
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object({
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
    })
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box style={{ marginTop: 50, width: 400 }}>
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
        </Box>

        <Box style={{ marginTop: 20, width: 100 }}>
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
          />
        </Box>

        <Box
          style={{ marginTop: 50, display: "flex", width: "100%", justifyContent: "space-around" }}>
          <Button variant="contained" type="submit">
            Atualizar
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
        </Box>
      </form>
    </>
  );
}