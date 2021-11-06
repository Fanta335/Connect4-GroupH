import React from 'react';
import {Link} from 'react-router-dom';

import './settings.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Form = (props) => {
  return (
    <>
      <FormLabel component="legend">{props.label}</FormLabel>
      {props.input}
    </>
  )
}

const TransitionButton = (props) => {
  return (
    <Button onClick={props.onClick} variant="contained" color="primary">
      {props.name}
    </Button>
  )
}

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      borderSizeHigh: "6",
      borderSizeWidth: "7",
      cpuStrength: "2",
      victoryCondition: "4",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <Grid container alignItems="center" justify="center" spacing={4}>
            <Grid item xs={12} justifyContent="center" margin="normal">
              <h1>Setting</h1>
            </Grid>

            <Grid item xs={12}>
              <Form
                label="Border Size"
                input={
                <>
                  <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="borderSizeHigh" value={this.state.borderSizeHigh} id="outlined-basic" label="Hight" variant="outlined" onChange={this.handleChange} />
                  <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="borderSizeWidth" value={this.state.borderSizeWidth} id="outlined-basic" label="Width" variant="outlined" onChange={this.handleChange} />
                </>
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Form
                label="CPU Strength"
                input={
                  <RadioGroup row aria-label="cpuStrength" name="cpuStrength" value={this.state.cpuStrength} onChange={this.handleChange}>
                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                  </RadioGroup> 
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Form
                label="Victory Condition"
                input={
                <>
                  <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} name="victoryCondition" value={this.state.victoryCondition} id="outlined-basic" variant="outlined" onChange={this.handleChange} />
                </>
                }
              />
            </Grid>
            
            <Grid item xs={12} justifyContent="center">
              <TransitionButton
                name="Back"
                onClick={this.handleClick}
              />
              <TransitionButton
                name="Confirm"
                onClick={this.handleClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Settings;
