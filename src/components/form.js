import {
    Container,
    TextField,
    InputAdornment,
    InputLabel,
    FormControl,
    Paper,
    FormHelperText,
    Grid,
    Button,
    Select,
    MenuItem,
    Typography,
  } from "@mui/material";
  import DatePicker from "@mui/lab/DatePicker";
  import moment from "moment";
  import { useFormik } from "formik";
  import AdapterMoment from "@mui/lab/AdapterMoment";
  import LocalizationProvider from "@mui/lab/LocalizationProvider";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import InputMask from "react-input-mask";
  import * as Yup from "yup";
  import axios from "axios";
  import Header from "../components/header";
  import Foooter from "../components/foooter";
  toast.configure();
  const validationSchema = Yup.object({
    lamount: Yup.number()
      .typeError("*Please enter valid loan amount")
      .min(2000, "*Loan Amount must be between $2000 and $20000")
      .max(20000, "*Loan Amount must be between $2000 and $20000")
      .required("*Loan Amount must be between $2000 and $20000"),
    lpurpose: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "*Write proper loan purpose")
      .required("*Required"),
    fname: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "*Write proper name")
      .required("*Required"),
    mname: Yup.string().matches(/^[aA-zZ\s]+$/, "*Write proper name"),
    lname: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "*Write proper name")
      .required("*Required"),
    dob: Yup.string().test(
      "Date of Birth",
      "Should be greather than 18 and less than 60",
      function (value) {
        if (
          moment().diff(moment(value), "years") >= 18 &&
          moment().diff(moment(value), "years") < 60
        ) {
          return moment().diff(moment(value), "years") >= 18;
        }
      }
    ),
    email: Yup.string()
      .email("*Please write valid email address")
      .max(255)
      .required("*Email is required"),
    hphone: Yup.string().test("len", "Invalid Phone Number", (val = "") => {
      const val_length_without_dashes = val.replace(/-|_(|_)/g, "").length;
      return val_length_without_dashes === 12;
    }),
    mphone: Yup.string().test("len", "Invalid Phone Number", (val = "") => {
      const val_length_without_dashes = val.replace(/-|_(|_)/g, "").length;
      return val_length_without_dashes === 12;
    }),
    ssn: Yup.string().test("len", "Invalid SSN", (val = "") => {
      const val_length_without_dashes = val.replace(/-|_(|_)/g, "").length;
      return val_length_without_dashes === 9;
    }),
    sa1: Yup.string().required("*Required"),
    city: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "*Write proper city")
      .required("*Required"),
    zip: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits")
      .required("*Required"),
    rd: Yup.date().required("Required").nullable(true).typeError("*Required"),
    rt: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "*Write proper residence type")
      .required("Required"),
    statess: Yup.string().required("Required"),
  });
  
  const Form = () => {
    const formik = useFormik({
      initialValues: {
        lamount: "",
        lpurpose: "",
        fname: "",
        mname: "",
        lname: "",
        dob: "",
        email: "",
        hphone: "",
        mphone: "",
        ssn: "",
        sa1: "",
        sa2: "",
        city: "",
        zip: "",
        rd: "",
        rt: "",
        statess: "",
      },
      onSubmit: (values) => {
        console.log(values);
        axios
          .post("http://localhost:5000/user/add", values)
          .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              toast("Form Submitted Successfully!!!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setTimeout(window.location.reload(), 5000);
            }
          })
          .catch((err) => {
            console.log(err)
            if (err.response.status === 400) {
              toast.warn("Error! ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            }
          });
      },
      validationSchema: validationSchema,
    });
    return (
      <div>
      <Header />
        <Container>
          <Paper>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <Typography variant="h4" mx={2} my={2} align="center">
                How much do you need?
              </Typography>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item mx={2} my={2} lg={5} md={6} xs={12}>
                  <TextField
                    fullWidth="true"
                    id="lamount"
                    name="lamount"
                    label="Loan Amount"
                    inputProps={{ maxLength: 5 }}
                    value={formik.values.lamount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lamount && Boolean(formik.errors.lamount)
                    }
                    helperText={formik.touched.lamount && formik.errors.lamount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    size="medium"
                  />
                </Grid>
                <Grid item lg={5} md={6} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    id="lpurpose"
                    name="lpurpose"
                    label="Loan Purpose"
                    inputProps={{ maxLength: 50 }}
                    value={formik.values.lpurpose}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lpurpose && Boolean(formik.errors.lpurpose)
                    }
                    helperText={formik.touched.lpurpose && formik.errors.lpurpose}
                    size="medium"
                  />
                </Grid>
              </Grid>
              <Typography variant="h4" mx={2} my={2} align="center">
                Tell us about yourself
              </Typography>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    size="medium"
                    id="fname"
                    name="fname"
                    label="First Name"
                    inputProps={{ maxLength: 50 }}
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                  />
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    size="medium"
                    id="mname"
                    name="mname"
                    label="Middle Name"
                    inputProps={{ maxLength: 50 }}
                    value={formik.values.mname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mname && Boolean(formik.errors.mname)}
                    helperText={formik.touched.mname && formik.errors.mname}
                  />
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    size="medium"
                    id="lname"
                    name="lname"
                    label="Last Name"
                    inputProps={{ maxLength: 50 }}
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField
                          fullWidth="true"
                          size="medium"
                          variant="outlined"
                          {...props}
                          error={formik.touched.dob && Boolean(formik.errors.dob)}
                          helperText={formik.touched.dob && formik.errors.dob}
                        />
                      )}
                      name="dob"
                      label="DOB"
                      value={formik.values.dob}
                      maxDate={moment(new Date())}
                      minDate={moment(new Date("08.15.1947"))}
                      onChange={(newValue) => {
                        formik.setFieldTouched("dob");
                        formik.setFieldValue("dob", moment(newValue));
                      }}
                      onKeyPress={() => formik.setFieldTouched("dob")}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    size="medium"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <InputMask
                    mask="(999)999-9999"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.hphone}
                  >
                    {() => (
                      <TextField
                        fullWidth="true"
                        size="medium"
                        type="text"
                        id="hphone"
                        label="Home Phone"
                        name="hphone"
                        variant="outlined"
                        helperText={
                          formik.touched.hphone ? formik.errors.hphone : ""
                        }
                        error={
                          formik.touched.hphone && Boolean(formik.errors.hphone)
                        }
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <InputMask
                    mask="(999)999-9999"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mphone}
                  >
                    {() => (
                      <TextField
                        fullWidth="true"
                        size="medium"
                        type="text"
                        label="Mobile Phone"
                        id="mphone"
                        name="mphone"
                        variant="outlined"
                        helperText={
                          formik.touched.mphone ? formik.errors.mphone : ""
                        }
                        error={
                          formik.touched.mphone && Boolean(formik.errors.mphone)
                        }
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <InputMask
                    mask="999-99-9999"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ssn}
                  >
                    {() => (
                      <TextField
                        fullWidth="true"
                        size="medium"
                        type="text"
                        label="SSN"
                        name="ssn"
                        variant="outlined"
                        helperText={formik.touched.ssn ? formik.errors.ssn : ""}
                        error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                      />
                    )}
                  </InputMask>
                </Grid>
              </Grid>
              <Typography variant="h4" mx={2} my={2} align="center">
                What is your home address?
              </Typography>
              <Grid item lg={4} md={4} xs={12} mx={2} my={2}>
                <TextField
                  id="sa1"
                  name="sa1"
                  label="Street Address 1"
                  value={formik.values.sa1}
                  inputProps={{ maxLength: 200 }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sa1 && Boolean(formik.errors.sa1)}
                  helperText={formik.touched.sa1 && formik.errors.sa1}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item lg={4} md={4} xs={12} mx={2} my={2}>
                <TextField
                  id="sa2"
                  name="sa2"
                  label="Street Address 2"
                  inputProps={{ maxLength: 200 }}
                  value={formik.values.sa2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sa2 && Boolean(formik.errors.sa2)}
                  helperText={formik.touched.sa2 && formik.errors.sa2}
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    size="medium"
                    id="city"
                    name="city"
                    label="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <FormControl fullWidth="true" size="medium">
                    <InputLabel>State</InputLabel>
                    <Select
                      id="statess"
                      name="statess"
                      label="State"
                      error={
                        formik.touched.statess && Boolean(formik.errors.statess)
                      }
                      value={formik.values.statess}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value="Alabama">AL - Alabama</MenuItem>
                      <MenuItem value="Alaska">AK - Alaska</MenuItem>
                      <MenuItem value="American Samoa">
                        AS - American Samoa
                      </MenuItem>
                      <MenuItem value="Arizona">AZ - Arizona</MenuItem>
                      <MenuItem value="Arkansas">AR - Arkansas</MenuItem>
                      <MenuItem value="California">CA - California</MenuItem>
                      <MenuItem value="Colorado">CO - Colorado</MenuItem>
                      <MenuItem value="Connecticut">CT - Connecticut</MenuItem>
                      <MenuItem value="Delaware">DE - Delaware</MenuItem>
                      <MenuItem value="District of Columbia">
                        DC - District of Columbia
                      </MenuItem>
                      <MenuItem value="Federated States of Micronesia">
                        FM - Federated States of Micronesia
                      </MenuItem>
                      <MenuItem value="Florida">FL - Florida</MenuItem>
                      <MenuItem value="Georgia">GA - Georgia</MenuItem>
                      <MenuItem value="Guam">GU - Guam</MenuItem>
                      <MenuItem value="Hawaii">HI - Hawaii</MenuItem>
                      <MenuItem value="Idaho">ID - Idaho</MenuItem>
                      <MenuItem value="Illinois">IL - Illinois</MenuItem>
                      <MenuItem value="Indiana">IN - Indiana</MenuItem>
                      <MenuItem value="Iowa">IA - Iowa</MenuItem>
                      <MenuItem value="Kansas">KS - Kansas</MenuItem>
                      <MenuItem value="Kentucky">KY - Kentucky</MenuItem>
                      <MenuItem value="Louisiana">LA - Louisiana</MenuItem>
                      <MenuItem value="Maine">ME - Maine</MenuItem>
                      <MenuItem value="Marshall Islands">
                        MH - Marshall Islands
                      </MenuItem>
                      <MenuItem value="Maryland">MD - Maryland</MenuItem>
                      <MenuItem value="Massachusetts">
                        MA - Massachusetts
                      </MenuItem>
                      <MenuItem value="Michigan">MI - Michigan</MenuItem>
                      <MenuItem value="Minnesota">MN - Minnesota</MenuItem>
                      <MenuItem value="Mississippi">MS - Mississippi</MenuItem>
                      <MenuItem value="Missouri">MO - Missouri</MenuItem>
                      <MenuItem value="Montana">MT - Montana</MenuItem>
                      <MenuItem value="Nebraska">NE - Nebraska</MenuItem>
                      <MenuItem value="Nevada">NV - Nevada</MenuItem>
                      <MenuItem value="New Hampshire">
                        NH - New Hampshire
                      </MenuItem>
                      <MenuItem value="New Jersey">NJ - New Jersey</MenuItem>
                      <MenuItem value="New Mexico">NM - New Mexico</MenuItem>
                      <MenuItem value="New York">NY - New York</MenuItem>
                      <MenuItem value="North Carolina">
                        NC - North Carolina
                      </MenuItem>
                      <MenuItem value="North Dakota">ND - North Dakota</MenuItem>
                      <MenuItem value="Northern Mariana Islands">
                        MP - Northern Mariana Islands
                      </MenuItem>
                      <MenuItem value="Ohio">OH - Ohio</MenuItem>
                      <MenuItem value="Oklahoma">OK - Oklahoma</MenuItem>
                      <MenuItem value="Oregon">OR - Oregon</MenuItem>
                      <MenuItem value="Palau">PW - Palau</MenuItem>
                      <MenuItem value="Pennsylvania">PA - Pennsylvania</MenuItem>
                      <MenuItem value="Puerto Rico">PR - Puerto Rico</MenuItem>
                      <MenuItem value="Rhode Island">RI - Rhode Island</MenuItem>
                      <MenuItem value="South Carolina">
                        SC - South Carolina
                      </MenuItem>
                      <MenuItem value="South Dakota">SD - South Dakota</MenuItem>
                      <MenuItem value="Tennessee">TN - Tennessee</MenuItem>
                      <MenuItem value="Texas">TX - Texas</MenuItem>
                      <MenuItem value="Utah">UT - Utah</MenuItem>
                      <MenuItem value="Vermont">VT - Vermont</MenuItem>
                      <MenuItem value="Virgin Islands">
                        VI - Virgin Islands
                      </MenuItem>
                      <MenuItem value="Virginia">VA - Virginia</MenuItem>
                      <MenuItem value="Washington">WA - Washington</MenuItem>
                      <MenuItem value="West Virginia">
                        WV - West Virginia
                      </MenuItem>
                      <MenuItem value="Wisconsin">WI - Wisconsin</MenuItem>
                      <MenuItem value="Wyoming">WY - Wyoming</MenuItem>
                    </Select>
                    <FormHelperText
                      error={
                        formik.touched.statess && Boolean(formik.errors.statess)
                      }
                    >
                      {formik.errors.statess}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    size="medium"
                    id="zip"
                    name="zip"
                    label="Zip"
                    inputProps={{ maxLength: 5 }}
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                    helperText={formik.touched.zip && formik.errors.zip}
                  />
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="flex-start">
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField
                          fullWidth="true"
                          size="medium"
                          variant="outlined"
                          {...props}
                          error={formik.touched.rd && Boolean(formik.errors.rd)}
                          helperText={formik.touched.rd && formik.errors.rd}
                        />
                      )}
                      name="rd"
                      label="Residence Date"
                      value={formik.values.rd}
                      maxDate={moment(new Date())}
                      onChange={(newValue) => {
                        formik.setFieldTouched("rd");
                        formik.setFieldValue("rd", moment(newValue));
                      }}
                      onKeyPress={() => formik.setFieldTouched("rd")}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item lg={3} md={3} xs={12} mx={2} my={2}>
                  <TextField
                    fullWidth="true"
                    size="medium"
                    id="rt"
                    name="rt"
                    label="Residence Type"
                    value={formik.values.rt}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rt && Boolean(formik.errors.rt)}
                    helperText={formik.touched.rt && formik.errors.rt}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" size="large" fullWidth>
                Submit
              </Button>
              {<h1></h1>}
            </form>
          </Paper>
        </Container>
        <Foooter />
      </div>
    );
  };
  
  export default Form;
  