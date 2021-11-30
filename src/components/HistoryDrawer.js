import Drawer from "@mui/material/Drawer";

// 参考：https://stackoverflow.com/questions/51265838/mui-drawer-set-background-color
const HistoryDrawer = (props) => (
  <Drawer
    PaperProps={{
      sx: {
        backgroundColor: "white",
        opacity: 0.87,
        height: "40%",
      },
    }}
    anchor="bottom"
    open={props.open}
    onClose={props.handleClose}
  >
    {props.contents}
  </Drawer>
);

export default HistoryDrawer;
