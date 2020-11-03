import { Box, Input, Paper } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import FormWrapper from "../components/FormWrapper";
import InputField from "../components/InputField";

interface registerProps {}

const Register: React.FC<registerProps> = () => {
  return (
    <div
      style={{
        background: "linear-gradient(45deg, #0e305d 30%, #0361ff 90%)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormWrapper variant="small">
        <Paper
          elevation={1}
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              firstname: "",
              lastname: "",
            }}
            onSubmit={() => console.log("submit")}
          >
            <Form
              style={{
                flex: 1,
                padding: "40px",
                height: "100%",
              }}
            >
              <Box
                display="flex"
                height="100%"
                flexDirection="column"
                justifyContent="space-between"
              >
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                />
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                />
                <InputField name="email" placeholder="email" label="Email" />
                <InputField
                  name="firstname"
                  placeholder="first name"
                  label="First Name"
                />
                <InputField
                  name="lastname"
                  placeholder="last name"
                  label="Last Name"
                />
              </Box>
            </Form>
          </Formik>
        </Paper>
      </FormWrapper>
    </div>
  );
};

export default Register;
