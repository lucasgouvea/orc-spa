import { Button, TextField, Box, MenuItem } from "@mui/material";
import { GenericModal, Loading } from "../../components";
import { useFormik } from "formik";
import { companySchema } from "./company-schema";
import { useCreateCompany, COMPANY_TYPE } from "../../hooks";

export default function CreateCompanyModal({ onClose, open }) {
  const onSuccess = () => {
    alert("Empresa cadastrada com sucesso!");
    onClose();
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  const { mutate, isLoading } = useCreateCompany(onSuccess, onError);
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
      type: "none"
    },
    onSubmit: (company) => mutate(company),
    validationSchema: companySchema
  });

  const handleCancel = () => {
    setTimeout(() => resetForm(), 500);
    onClose();
  };

  return (
    <GenericModal open={open} title="Cadastrar Empresa" onClose={handleCancel}>
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
              helperText={errors.name || "Insira o nome do empresa"}
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
          </Box>
          <Box style={{ marginTop: 20, width: 400 }}>
            <TextField
              id="type"
              name="type"
              fullWidth
              value={values.type}
              label="Tipo"
              onChange={handleChange}
              select>
              <MenuItem value={"none"}>Selecione o tipo da compania</MenuItem>
              <MenuItem value={"AGGREGATE"}>{COMPANY_TYPE.AGGREGATE}</MenuItem>
              <MenuItem value={"CONTRACT"}>{COMPANY_TYPE.CONTRACT}</MenuItem>
            </TextField>
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
