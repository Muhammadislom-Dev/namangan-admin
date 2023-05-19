import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useActions from "../../hooks/useActions";
import { TextField } from "@mui/material";
import { inputClear } from "../../utils";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const { createType, fetchCompanies } = useActions();
  const {
    companies: { data },
  } = useSelector((state) => state.companies);

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createType({
      images: data.get("images"),
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Add company"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}>
              <div>
                <label htmlFor="company-image">For company image:</label>
                <input
                  id="company-image"
                  style={{
                    fontSize: "1rem",
                    marginBottom: "20px",
                  }}
                  name="images"
                  type={"file"}
                  required
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
