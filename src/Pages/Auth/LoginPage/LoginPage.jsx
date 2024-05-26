import React, { useEffect,useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Cookie from "cookie-universal";
import { useDispatch } from "react-redux";
import { JWTRegister, Paragraph, HashLoad, Data } from "../../../Components";
import { clearState, usePostActionsMutation } from "../../../Redux";
import { loginUrl } from "../../../Api";
import "./LoginPage.css";

const initialValues = {
  email: "",
  password: "",
};
//Validation for email and password
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid Email address")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [PostActions, { isLoading }] = usePostActionsMutation();

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

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  //Function to show or hidden the password
  const togglePasswordVisiblity = (e, type) => {
    e.preventDefault();
    setFlagData({
      ...flagData,
      passwordVisibility: !flagData.passwordVisibility,
    });
  };

  const handleLoginClick = async (formValues, formik) => {
    setFlagData({
      ...flagData,
      loading: true,
    });

    try {
      let result = await PostActions({
        credentials: {
          email: formValues.email,
          password: formValues.password,
        },
        dispatch,
        successMessage: "Welcome " + formValues.email.split("@")[0],
        errorMessage: "Falied Login",
        getUrl: loginUrl,
        loginpage: true,
      }).unwrap();

      if (result.token) {
        cookie.set("Token", result.token);

        setFlagData({
          ...flagData,
          loading: true,
        });
        console.log("Role = ", result.user.role);
        let remainUrl = result.user.role === "1995" ? "/users" : "/dashboard";
        navigate(remainUrl);
        //   window.location.pathname = remainUrl;
      } else {
        console.log("Enter");
        setFlagData({
          ...flagData,
          loading: false,
        });
      }
    } catch (err) {
      if (err.response.status === 401) {
        formik.setErrors({
          ...formik.errors,
          email: "Email or Password is Wrong",
          password: "Email or Password is Wrong",
        });
      }
      console.log("401 Enter");

      setFlagData({
        ...flagData,
        loading: false,
      });
    }
  };

  return (
    <>
      {isLoading && (
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
                backgroundImage: 'url("/assets/Logo2.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="background-image"
            ></Data.Grid>

            {/* The Data on the Right Side  */}
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
                  onSubmit={(values, formik) =>
                    handleLoginClick(values, formik)
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
                          id="email"
                          name="email"
                          label="Email"
                          variant="outlined"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          inputRef={focus}
                          sx={{
                            mb: 3,
                          }}
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
                          sx={{
                            mb: 3,
                          }}
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

                        {/* Login Button  */}
                        <Data.LoadingButton
                          type="submit"
                          color="primary"
                          loading={flagData.loading}
                          variant="contained"
                          sx={{ mb: 2, mt: 3 }}
                        >
                          Login
                        </Data.LoadingButton>

                        <Paragraph>
                          Create New Account ?
                          <NavLink
                            to="/register"
                            style={{ color: "#1976D2", marginLeft: 5 }}
                          >
                            Register
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
    </>
  );
};

export default LoginPage;
