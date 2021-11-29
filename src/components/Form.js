import React from "react";

import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";

const Form = (props) => (
  <Grid container spacing={1}>
    <Grid item xs={12}>
      <FormLabel component="legend">{props.label}</FormLabel>
    </Grid>
    <Grid item xs={12}>
      {props.input}
    </Grid>
  </Grid>
);

export default Form;
