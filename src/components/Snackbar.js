import React, {useState,forwardRef} from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props,ref){
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
});

const CustomizedSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = (event,reason) => {
    if(reason === 'clickaway'){
      return;
    }
    setSnackbarOpen(false);
  }

  return(
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="warning"
        sx={{width: "100%"}}
      >
        This match is over!
      </Alert>
    </Snackbar>
  );
}

export default CustomizedSnackbar;
