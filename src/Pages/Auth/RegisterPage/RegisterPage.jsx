import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl, registerUrl } from "../../../Api";
import { JWTRegister, Paragraph, HashLoad, Data } from "../../../Components";
import Cookie from "cookie-universal";
import "./RegisterPage.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username must contain only letters, numbers, or underscores"
    )
    .required("Username is required!"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
});

const SignUp = () => {
  //Used Flag Data for Check Loading or see the password
  const [flagData, setFlagData] = useState({
    loading: false,
    passwordVisibility: false,
  });

  const cookie = Cookie();
  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  }, []);


  const togglePasswordVisiblity = (e, type) => {
    e.preventDefault();
    setFlagData({
      ...flagData,
      passwordVisibility: !flagData.passwordVisibility,
    });
  };

  const handleRegisterClick = async (formValues, formik) => {
    setFlagData({
      ...flagData,
      loading: true,
    });

    try {
      let res = await axios.post(baseUrl + registerUrl, formValues);
      setFlagData({
        ...flagData,
        loading: false,
      });
      console.log("res = ", res);
      if (res.status === 200) {
        //Save the Token Data
        cookie.set("Token", res.data.token);
        // Navigate("/login");

        window.location.pathname = "/login";
      }
    } catch (error) {
      // Set the error in formik.errors.email

      if (error.response.status === 422) {
        formik.setErrors({
          ...formik.errors,
          email: error.response.data.message,
        });
      }

      setFlagData({
        ...flagData,
        loading: false,
      });
    }
  };

  return (
    <>
      {flagData.loading && (
        <div className="overlay">
          <HashLoad />
        </div>
      )}
      <JWTRegister>
        <Data.Card className="card">
          <Data.Grid container style={{ height: "50vh" }}>
            {/* The Image behind the Input */}

            <Data.Grid
              item
              sm={6}
              xs={12}
              style={{
                backgroundImage: 'url("/assets/Logo4.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="background-image"
            ></Data.Grid>

            {/* The Element that on the right  */}
            <Data.Grid
              item
              sm={6}
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
              }}
              className="background-image2"
            >
              <Data.Box style={{ padding: "20px" }}>
                <Formik
                  // onSubmit={handleRegisterClick}
                  onSubmit={(values, formik) =>
                    handleRegisterClick(values, formik)
                  }
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Data.Box>
                        <Data.TextField
                          fullWidth
                          size="small"
                          id="name"
                          name="name"
                          label="User Name"
                          variant="outlined"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          sx={{ mb: 3 }}
                          inputRef={focus}
                          InputProps={{
                            startAdornment: (
                              <Data.InputAdornment position="start">
                                <Data.AccountCircle />
                              </Data.InputAdornment>
                            ),

                            endAdornment: (
                              <Data.InputAdornment position="end">
                                {touched.name && errors.name ? (
                                  <Data.ErrorOutlineIcon
                                    style={{ color: "#d32f2f" }}
                                  />
                                ) : touched.name && !errors.name ? (
                                  <Data.CheckCircleOutlineIcon
                                    style={{ color: "#478778" }}
                                  />
                                ) : null}
                              </Data.InputAdornment>
                            ),
                          }}
                        />

                        <Data.TextField
                          fullWidth
                          size="small"
                          id="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          sx={{ mb: 3 }}
                          InputProps={{
                            startAdornment: (
                              <Data.InputAdornment position="start">
                                <Data.MailOutlineIcon />
                              </Data.InputAdornment>
                            ),

                            endAdornment: (
                              <Data.InputAdornment position="end">
                                {touched.email && errors.email ? (
                                  <Data.ErrorOutlineIcon
                                    style={{ color: "#d32f2f" }}
                                  />
                                ) : touched.email && !errors.email ? (
                                  <Data.CheckCircleOutlineIcon
                                    style={{ color: "#478778" }}
                                  />
                                ) : null}
                              </Data.InputAdornment>
                            ),
                          }}
                        />

                        <Data.TextField
                          fullWidth
                          size="small"
                          id="password"
                          name="password"
                          label="Password"
                          variant="outlined"
                          type={
                            flagData.passwordVisibility ? "text" : "password"
                          }
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          sx={{ mb: 3 }}
                          InputProps={{
                            startAdornment: (
                              <Data.InputAdornment position="start">
                                <Data.KeyIcon />
                              </Data.InputAdornment>
                            ),
                            endAdornment: (
                              <Data.InputAdornment position="end">
                                <Data.IconButton
                                  onClick={(e) => togglePasswordVisiblity(e, 1)}
                                  edge="end"
                                >
                                  {flagData.passwordVisibility ? (
                                    <Data.VisibilityOffIcon />
                                  ) : (
                                    <Data.VisibilityIcon />
                                  )}
                                </Data.IconButton>
                              </Data.InputAdornment>
                            ),
                          }}
                        />

                        {/* Register Button  */}
                        <Data.LoadingButton
                          type="submit"
                          color="primary"
                          loading={flagData.loading}
                          variant="contained"
                          sx={{ mb: 2, mt: 3 }}
                        >
                          Regiser
                        </Data.LoadingButton>

                        <Paragraph>
                          Already have an account ?
                          <NavLink
                            to="/login"
                            style={{ color: "#1976D2", marginLeft: 5 }}
                          >
                            Login
                          </NavLink>
                        </Paragraph>
                      </Data.Box>
                    </form>
                  )}
                </Formik>
              </Data.Box>
            </Data.Grid>
          </Data.Grid>
        </Data.Card>
      </JWTRegister>
      )
    </>
  );
};

export default SignUp;
