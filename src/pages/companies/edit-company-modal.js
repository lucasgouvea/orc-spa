import { Button, TextField, Box, MenuItem } from "@mui/material";
import { useQueryClient } from "react-query";

import { useUpdateCompany, COMPANY_TYPE } from "../../hooks";
import { GenericModal, Loading } from "../../components";
import { useFormik } from "formik";
import { companySchema } from "./company-schema";
import { useEffect } from "react";

export default function EditCompanyModal({ onClose, open, data }) {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    alert("Empresa atualizada com sucesso!");
    queryClient.invalidateQueries("companies");
    onClose();
  };

  const onError = () => {
    alert("Houve algum problema!");
  };

  const { mutate, isLoading } = useUpdateCompany(onSuccess, onError);
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
      name: "",
      type: ""
    },
    onSubmit: (company) => mutate(company),
    validationSchema: companySchema
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
    <GenericModal open={open} title="Editar empresa" onClose={handleCancel}>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box style={{ width: 400 }}>
            <TextField
              id="name"
              label="name"
              variant="outlined"
              error={touched.name && errors.name}
              helperText={errors.name || "Insira o nome da empresa"}
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
