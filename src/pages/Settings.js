import React from 'react';
import {Link} from 'react-router-dom';

import './settings.css';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const Form = (props) => {
  return (
    <form>
      <label>{props.label}</label>
      {props.input}
    </form>
  )
}

const TransitionButton = (props) => {
  return (
    <Button onClick={props.onClick} variant="contained" color="secondary">
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
    const radioButton = (
      <FormControl component="fieldset">
        <FormLabel component="legend">CPU Strength</FormLabel>
        <RadioGroup row aria-label="cpuStrength" name="cpuStrength" value={this.state.cpuStrength} onChange={this.handleChange}>
          <FormControlLabel value="easy" control={<Radio />} label="Easy" />
          <FormControlLabel value="medium" control={<Radio />} label="Medium" />
          <FormControlLabel value="hard" control={<Radio />} label="Hard" />
        </RadioGroup>
      </FormControl>
    );


    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h3>Setting</h3>
        </Grid>

        <Grid item xs={12}>
          <Form
            label="Border Size"
            input={
            <>
              <input name="borderSizeHigh" type="number" value={this.state.borderSizeHigh} min="1" max="100" onChange={this.handleChange} />×
              <input name="borderSizeWidth" type="number" value={this.state.borderSizeWidth} min="1" max="100" onChange={this.handleChange} />
            </>
            }
          />
        </Grid>

        <Grid item xs={12}>
          {radioButton}
        </Grid>

        <Grid item xs={12}>
          <Form
            label="Victory Condition"
            input={
            <>
              <input name="victoryCondition" value={this.state.victoryCondition} type="number" min="4" max="10" onChange={this.handleChange} />
            </>
            }
          />
        </Grid>

        <Grid item xs={6}>
          <Link to="/">
            <TransitionButton
              name="Back"
            />
          </Link>
        </Grid>

        <Grid item xs={6}>
          <Link to="/game">
            <TransitionButton
              name="Confirm"
            />
          </Link>
        </Grid>
      </Grid>
    )
  }
}

export default Settings;
