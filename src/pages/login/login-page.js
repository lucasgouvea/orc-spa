import "./login-page.css";

import { Button, TextField, Box } from "@mui/material";
import { useFormik } from "formik";
import { useAuth, useLogin } from "../../hooks";
import { Loading } from "../../components";
import { loginSchema } from "./login-schema";

export function LoginPage() {
  const { login } = useAuth();
  const onSuccess = (user) => {
    login(user);
  };

  const onError = (e) => {
    alert(e.response.data);
  };

  const { mutate, isLoading } = useLogin(onSuccess, onError);
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
      user: "",
      password: ""
    },
    onSubmit: (user) => mutate(user),
    validationSchema: loginSchema
  });

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src="/logo512.png" />
      </div>
      <div className="login-form">
        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit}>
            <Box style={{ width: 400 }}>
              <TextField
                id="user"
                label="Usuário"
                variant="outlined"
                error={touched.user && errors.user}
                helperText={errors.user || "Insira o nome do usuário"}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.user}
              />
            </Box>

            <Box style={{ marginTop: 20 }}>
              <TextField
                id="password"
                label="Senha"
                variant="outlined"
                error={touched.password && errors.password}
                helperText={errors.password || "Insira a senha do usuário"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                fullWidth
                type="password"
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
                Entrar
              </Button>
            </Box>
          </form>
        )}
      </div>
    </div>
  );
}
