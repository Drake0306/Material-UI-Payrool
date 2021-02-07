/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-restricted-globals */
/* eslint-disable arrow-parens */
/* eslint-disable no-unneeded-ternary */
import 'date-fns';
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  colors
} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { Form, replace } from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import useForceUpdate from 'use-force-update';
import Typography from '@material-ui/core/Typography';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];



const gender = [
  {
    value: '',
    label: 'SELECT'
  },
  {
    value: 'MALE',
    label: 'MALE'
  },
  {
    value: 'FEMALE',
    label: 'FEMALE'
  },
  {
    value: 'TRANSGENDER',
    label: 'TRANSGENDER'
  },
];

const YesNoValue = [
  {
    value: '',
    label: 'SELECT'
  },
  {
    value: 'YES',
    label: 'YES'
  },
  {
    value: 'NO',
    label: 'NO'
  },
];

const workingStatus = [
  {
    value: '',
    label: 'SELECT'
  },
  {
    value: 'WORKING',
    label: 'WORKING'
  },
  {
    value: 'RESIGNED',
    label: 'RESIGNED'
  },
];

const PaymentMode = [
  {
    value: '',
    label: 'SELECT'
  },
  {
    value: 'WAGES',
    label: 'WAGES'
  },
  {
    value: 'SALARY',
    label: 'SALARY'
  },
];

const MRovertime = [
  {
    value: '',
    label: 'SELECT'
  },
  {
    value: '8',
    label: '8\'h'
  },
  {
    value: '12',
    label: '12\'h'
  },
];

const maritalStatus = [
  {
    value: '',
    label: 'SELECT'
  },
  {
    value: 'MARRIED',
    label: 'MARRIED'
  },
  {
    value: 'UNMARRIED',
    label: 'UNMARRIED'
  },
  {
    value: 'DIVORCEE',
    label: 'DIVORCEE'
  },
  {
    value: 'WIDOW',
    label: 'WIDOW'
  },
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const FormEntry = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    // Personal Information
    employee_name: '',
    gender: '',
    marital_status: '',
    fathers_name: '',
    dob_date: '',
    working_status: '',
    date_of_joining: '',
    date_of_resigning: '',
    // Residential Address
    address_line_1: '',
    address_line_2: '',
    area: '',
    landmark: '',
    post_office: '',
    police_station: '',
    city_village: '',
    district: '',
    state: '',
    country: 'India',
    pin_code: '',
    // contact and address proof
    email: '',
    mobile_1: '',
    mobile_2: '',
    phone: '',
    contact_person_name: '',
    contact_person_no: '',
    aadhar_no: '',
    pan: '',
    // More Data
    work_man_no: '',
    site: '',
    department: '',
    designation: '',
    pf_applicable: '',
    uan: '',
    esic_applicable: '',
    esic_no: '',
    reverse_pf_esi: 'NO',
    bonus_per_month: 'NO',
    // Security
    work_order_no: '',
    gate_pass_no: '',
    gate_pass_due_date: '',
    safety_pass_no: '',
    safety_pass_due_date: '',
    rfid_no: '',
    rfid_due_date: '',
    // bank details
    bank_name: '',
    bank_branch: '',
    account_no: '',
    ifsc_code: '',
    account_holder_name: '',
    // Addition and deduction
    basic: '0.00',
    pay_rate: '0.00',
    actual_rate: '0.00',
    da: '0.00',
    hra: '0.00',
    ca: '0.00',
    food: '0.00',
    miscellaneous: '0.00',
    old_da: '0.00',
    payment_mode: '',
    sunday_payable: 'NO',
    hra_check: false,
    food_check: false,
    ca_check: false,
    miscellaneous_check: false,
    leave_days: '0',
    salary_on_attendance: '',
    over_time_applicable: '',
    over_time_on: '',
    mr_over_time_hours: '',

  });

  const [perValues, setPerValues] = useState({
    // Permanent Address
    address_line_1_permanent: '',
    address_line_2_permanent: '',
    area_permanent: '',
    landmark_permanent: '',
    post_office_permanent: '',
    police_station_permanent: '',
    city_village_permanent: '',
    district_permanent: '',
    state_permanent: '',
    country_permanent: 'India',
    pin_code_permanent: '',
  });
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = useState(false);

  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [checkState, setCheckState] = React.useState({
    fillPaddress: false,
  });

  // Get Data

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
      // const response = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
      //   method: 'GET',
      //   headers: {
      //     'x-rapidapi-key': 'e172080b4emshde3e4181d1129a3p15ab6djsnd7e3258efdc7',
      //     'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
      //   }
      // });
      console.log(response);
      await sleep(1e3); // For demo purposes.
      const countries = await response.json();

      if (active) {
        setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // End Get data



  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  // const navigate = useNavigate();
  // const ListData = () => {
  //   navigate('/app/master/list/employee', { replace: true });
  // };

  const CheckValue = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.checked
    });
  };

  // to check auto fill data
  const autoFill = (event) => {
    setCheckState({
      fillPaddress: event.target.checked
    });

    if (event.target.checked === true) {
      setPerValues({
        // Permanent Address
        address_line_1_permanent: values.address_line_1,
        address_line_2_permanent: values.address_line_2,
        area_permanent: values.area,
        landmark_permanent: values.landmark,
        post_office_permanent: values.post_office,
        police_station_permanent: values.police_station,
        city_village_permanent: values.city_village,
        district_permanent: values.district,
        state_permanent: values.state,
        country_permanent: values.country,
        pin_code_permanent: values.pin_code,
      });
    } else {
      setPerValues({
        address_line_1_permanent: '',
        address_line_2_permanent: '',
        area_permanent: '',
        landmark_permanent: '',
        post_office_permanent: '',
        police_station_permanent: '',
        city_village_permanent: '',
        district_permanent: '',
        state_permanent: '',
        country_permanent: 'India',
        pin_code_permanent: '',
      });
    }
  };


  const SendData = event => {
    event.preventDefault();
    // switch icon
    setClicked(true);

    let Array = {
      site: event.target.site.value,
    };

    console.log(Array);
    setTimeout(
      () => setClicked(false),
      3000
    );
  };

  // const DemoView = event => {
  //   console.log(event.target.value);
  // };


  return (
    <form
      autoComplete="false"
      Validate
      onSubmit={SendData}
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <Button
          color="secondary"
          style={{marginBottom: '20px'}}
          startIcon={<ListIcon />}
          onClick={ListData}
          variant=""
      >
          List All Employee
      </Button> */}
      <Card>
        <CardHeader
          subheader="Make sure to fill all fields marked with *"
          title="Create Employee"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Personal Information</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify name"
                label="Employee name"
                name="employee_name"
                onChange={handleChange}
                required
                value={values.employee_name}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select gender"
                name="gender"
                onChange={handleChange}
                required
                select
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
                {gender.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select material status"
                name="marital_status"
                onChange={handleChange}
                required
                select
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{ native: true }}
                value={values.marital_status}
                variant="outlined"
              >
                {maritalStatus.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText=""
                label="Father's name"
                name="fathers_name"
                onChange={handleChange}
                value={values.fathers_name}
                variant="outlined"
                required
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                id="date"
                label="Date of birdth"
                type="date"
                name="dob_date"
                defaultValue=""
                fullWidth
                required
                variant="outlined"
                className={values.dob_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select working status"
                name="working_status"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.working_status}
                variant="outlined"
              >
                {workingStatus.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                id="date"
                label="Date of joining"
                type="date"
                name="date_of_joining"
                defaultValue=""
                fullWidth
                required
                variant="outlined"
                className={values.date_of_joining}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                id="date"
                label="Date of resigning"
                type="date"
                name="date_of_resigning"
                defaultValue=""
                fullWidth
                required
                variant="outlined"
                className={values.date_of_resigning}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

          </Grid>

        <Divider style={{marginTop: '30px', marginBottom: '20px'}} />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Residential Address</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                id="standard-multiline-flexible"
                label="Address line"
                helperText="This box is multiline"
                multiline
                required
                name="address_line_1"
                rowsMax={4}
                fullWidth
                value={values.address_line_1}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                id="standard-multiline-flexible"
                label="Address line opt"
                helperText="This box is multiline"
                multiline
                name="address_line_2"
                rowsMax={4}
                fullWidth
                value={values.address_line_2}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Area"
                name="area"
                onChange={handleChange}
                value={values.area}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Landmark"
                name="landmark"
                onChange={handleChange}
                value={values.landmark}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Post office"
                name="post_office"
                onChange={handleChange}
                value={values.post_office}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City village"
                name="city_village"
                onChange={handleChange}
                value={values.city_village}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="District"
                name="district"
                onChange={handleChange}
                value={values.district}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >

              <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select state"
                    name="country"
                    defaultValue={values.country}
                    variant="outlined"
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />

            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >

              <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select country"
                    name="country"
                    defaultValue={values.country}
                    variant="outlined"
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pin code"
                helperText="Should not be more than 6 digits"
                name="pin_code"
                type="number"
                required
                inputProps={{
                  minLength: 6,
                }}
                onChange={handleChange}
                value={values.pin_code}
                variant="outlined"
              />
            </Grid>

          </Grid>

          <Divider style={{marginTop: '30px', marginBottom: '20px'}} />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Permanent Address</b>
                &nbsp;
                (
                <FormControlLabel
                  style={{marginLeft: '5px'}}
                  control={(
                    <Checkbox
                      checked={checkState.fillPaddress}
                      value={checkState.fillPaddress}
                      onChange={autoFill}
                      name="fillPaddress"
                      color="primary"
                    />
                  )}
                  label="Auto fill from Residential Address"
                />
                )
              </Typography>

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                id="standard-multiline-flexible"
                label="Address line"
                multiline
                required
                name="address_line_1_permanent"
                rowsMax={4}
                helperText="This box is multiline"
                fullWidth
                value={perValues.address_line_1_permanent}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                id="standard-multiline-flexible"
                label="Address line opt"
                multiline
                name="address_line_2_permanent"
                rowsMax={4}
                helperText="This box is multiline"
                fullWidth
                value={perValues.address_line_2_permanent}
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Area"
                name="area_permanent"
                onChange={handleChange}
                value={perValues.area_permanent}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Landmark"
                name="landmark_permanent"
                onChange={handleChange}
                value={perValues.landmark_permanent}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Post office"
                name="post_office_permanent"
                onChange={handleChange}
                value={perValues.post_office_permanent}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="City village"
                name="city_village_permanent"
                onChange={handleChange}
                value={perValues.city_village_permanent}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="District"
                name="district_permanent"
                onChange={handleChange}
                value={perValues.district_permanent}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >

              <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select state"
                    name="country_permanent"
                    defaultValue={perValues.country_permanent}
                    variant="outlined"
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />

            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >

              <Autocomplete
                id="asynchronous-demo"
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select country"
                    name="country_permanent"
                    defaultValue={perValues.country_permanent}
                    variant="outlined"
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pin code"
                helperText="Should not be more than 6 digits"
                name="pin_code_permanent"
                type="number"
                inputProps={{
                  minLength: 6,
                }}
                onChange={handleChange}
                required
                value={perValues.pin_code_permanent}
                variant="outlined"
              />
            </Grid>

          </Grid>
          <Divider style={{marginTop: '30px', marginBottom: '20px'}} />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Contact, Id and address proof</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="AAdhar Number"
                name="aadhar_no"
                onChange={handleChange}
                value={values.aadhar_no}
                variant="outlined"
                helperText="Should not be more than 11 characters"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pan Number"
                name="pan"
                onChange={handleChange}
                value={values.pan}
                variant="outlined"
                helperText="Should not be more than 10 characters"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mobile Number"
                type="number"
                name="mobile_1"
                onChange={handleChange}
                required
                value={values.mobile_1}
                variant="outlined"
                helperText="Should not be more than 10 digits"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Mobile Number (opt)"
                type="number"
                name="mobile_2"
                onChange={handleChange}
                value={values.mobile_2}
                variant="outlined"
                helperText="Should not be more than 10 digits"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number (opt)"
                type="number"
                name="mobile_2"
                onChange={handleChange}
                value={values.mobile_2}
                variant="outlined"
                helperText="Should not be more than 10 digits"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Contact person name"
                type="text"
                required
                name="contact_person_name"
                onChange={handleChange}
                value={values.contact_person_name}
                variant="outlined"
                helperText="Should not be more than 10 digits"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Contact person Number"
                type="number"
                name="contact_person_no"
                onChange={handleChange}
                required
                value={values.contact_person_no}
                variant="outlined"
                helperText="Should not be more than 10 digits"
              />
            </Grid>

          </Grid>

          <Divider style={{marginTop: '30px', marginBottom: '20px'}} />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>More required data</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Work man number"
                type="number"
                name="work_man_no"
                required
                onChange={handleChange}
                value={values.work_man_no}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Designation"
                name="designation"
                onChange={handleChange}
                required
                select
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{ native: true }}
                value={values.designation}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Site"
                    margin="normal"
                    required
                    name="site"
                    value={values.site}
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Department"
                    margin="normal"
                    required
                    name="department"
                    value={values.department}
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select PF Applicable"
                name="pf_applicable"
                onChange={handleChange}
                required
                select
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{ native: true }}
                value={values.pf_applicable}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="UAN"
                type="text"
                name="uan"
                disabled={
                  values.pf_applicable === 'YES'
                  ? false : true
                }
                onChange={handleChange}
                value={values.uan}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select ESIC Applicable"
                name="esic_applicable"
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                select
                SelectProps={{ native: true }}
                value={values.esic_applicable}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="ESIC Number"
                type="text"
                name="esic_no"
                disabled={
                  values.esic_applicable === 'YES'
                  ? false : true
                }
                onChange={handleChange}
                value={values.esic_no}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Reverse PF ESI"
                name="reverse_pf_esi"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.reverse_pf_esi}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Bonus per month"
                name="bonus_per_month"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.bonus_per_month}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>


          </Grid>
          <Divider style={{marginTop: '30px', marginBottom: '20px'}} />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Security</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Work order number"
                type="text"
                required
                name="work_order_no"
                onChange={handleChange}
                value={values.work_order_no}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Gate pass number"
                name="gate_pass_no"
                onChange={handleChange}
                value={values.gate_pass_no}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Gate pass due date"
                name="gate_pass_due_date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                value={values.gate_pass_due_date}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Safety pass number"
                type="text"
                name="safety_pass_no"
                onChange={handleChange}
                required
                value={values.safety_pass_no}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Safety pass due date"
                type="date"
                name="safety_pass_due_date"
                onChange={handleChange}
                value={values.safety_pass_due_date}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            />

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="RFID number"
                type="number"
                name="rfid_no"
                onChange={handleChange}
                value={values.rfid_no}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="RFID due date"
                type="date"
                required
                name="rfid_due_date"
                onChange={handleChange}
                value={values.rfid_due_date}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

          </Grid>

          <Divider style={{marginTop: '30px', marginBottom: '20px'}} />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Bank Details</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <Autocomplete
                id="combo-box-demo"
                style={{marginTop: '16px'}}
                options={top100Films}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} label="Bank name" name="bank_name" onChange={handleChange} value={values.bank_name} required variant="outlined" />}
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} label="Bank branch" value={values.bank_branch} name="bank_branch" margin="normal" variant="outlined" />
                )}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            />

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Account number"
                type="text"
                required
                name="account_no"
                onChange={handleChange}
                value={values.account_no}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="IFSC code"
                type="text"
                required
                name="ifsc_code"
                onChange={handleChange}
                value={values.ifsc_code}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Account holder name"
                type="text"
                required
                name="account_holder_name"
                onChange={handleChange}
                value={values.account_holder_name}
                variant="outlined"
              />
            </Grid>

          </Grid>

          <Divider style={{marginTop: '30px', marginBottom: '20px'}} />

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body1">
                <b>Additional Info</b>
              </Typography>

            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Basic"
                type="text"
                required
                name="basic"
                onChange={handleChange}
                value={values.basic}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Pay rate"
                type="text"
                required
                name="pay_rate"
                onChange={handleChange}
                value={values.pay_rate}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Actual rate"
                type="text"
                required
                name="actual_rate"
                onChange={handleChange}
                value={values.actual_rate}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="DA"
                type="text"
                required
                name="da"
                onChange={handleChange}
                value={values.da}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="HRA"
                type="text"
                required
                name="hra"
                onChange={handleChange}
                value={values.hra}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="CA"
                type="text"
                required
                name="ca"
                onChange={handleChange}
                value={values.ca}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Food"
                type="text"
                required
                name="food"
                onChange={handleChange}
                value={values.food}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Miscellaneous"
                type="text"
                required
                name="miscellaneous"
                onChange={handleChange}
                value={values.miscellaneous}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                fullWidth
                label="Old DA"
                type="text"
                required
                name="old_da"
                onChange={handleChange}
                value={values.old_da}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Payment Mode"
                name="payment_mode"
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                select
                SelectProps={{ native: true }}
                value={values.payment_mode}
                variant="outlined"
              >
                {PaymentMode.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Payment Mode"
                name="sunday_payable"
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                select
                SelectProps={{ native: true }}
                value={values.sunday_payable}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={values.hra_check}
                    value={values.hra_check}
                    onChange={CheckValue}
                    name="hra_check"
                    color="primary"
                  />
                )}
                label="HRA Check"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={values.food_check}
                    onChange={CheckValue}
                    name="food_check"
                    color="primary"
                  />
                )}
                label="Food Check"
              />
            </Grid>

            <Grid
              item
              md={3}
              xs={12}
            >
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={values.ca_check}
                    onChange={CheckValue}
                    name="ca_check"
                    color="primary"
                  />
                )}
                label="CA Check"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={values.miscellaneous_check}
                    onChange={CheckValue}
                    name="miscellaneous_check"
                    color="primary"
                  />
                )}
                label="Miscellaneous Check"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Leave days"
                type="text"
                required
                name="leave_days"
                onChange={handleChange}
                value={values.leave_days}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Salary on attendance"
                name="salary_on_attendance"
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                select
                SelectProps={{ native: true }}
                value={values.salary_on_attendance}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Over time application"
                name="over_time_applicable"
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                select
                SelectProps={{ native: true }}
                value={values.over_time_applicable}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Over time on"
                name="over_time_on"
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                select
                SelectProps={{ native: true }}
                value={values.over_time_on}
                variant="outlined"
              >
                {YesNoValue.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select MR over time hours"
                name="mr_over_time_hours"
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                select
                SelectProps={{ native: true }}
                value={values.mr_over_time_hours}
                variant="outlined"
              >
                {MRovertime.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="danger"
            type="submit"
            variant=""
            startIcon={
              clicked === true
              ? <CircularProgress style={{color: 'green'}} size={20} />
              : <SaveIcon style={{color: 'green'}} />
            }
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

FormEntry.propTypes = {
  className: PropTypes.string
};

export default FormEntry;

