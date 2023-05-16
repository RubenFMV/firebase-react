import { useEffect, useState } from "react";
import { login } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const { user } = useUserContext();
  const navigation = useNavigate();

  useEffect(() => {
    if (user) {
      navigation("/dashboard");
    }
  }, [user]);

  const onSubmit = async (
    { email, password },
    { setErrors, resetForm, setSubmitting }
  ) => {
    try {
      const credencialUser = await login({ email, password });
      console.log(credencialUser);
      resetForm();
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        return setErrors({ email: "Usuario no registrado" });
      }
      if (error.code === "auth/wrong-password") {
        return setErrors({ password: "Contraseña incorrecta" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("email no valido").required("Campo requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 caracteres")
      .required("Campo requerido"),
  });

  return (
    <Box sx={{ mt: 8, maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#111" }}>
        <AddAPhotoIcon />
      </Avatar>
      <Typography variant="h5" component="h1">
        Login
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <Box onSubmit={handleSubmit} component="form">
            <TextField
              type="email"
              placeholder="ingrese email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              id="email"
              label="Ingrese email"
              fullWidth
              sx={{ mb: 3 }}
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />

            {/* <input
              type="email"
              id=""
              placeholder="ingrese email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email} */}

            <TextField
              type="password"
              placeholder="ingrese password"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese contraseña"
              fullWidth="true"
              sx={{ mb: 3 }}
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />

            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth="true"
              sx={{ mb: 3 }}
            >
              Acceder
            </LoadingButton>

            <Button fullWidth component={Link} to="/register">
              ¿No tienes cuenta? Regístrate
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
