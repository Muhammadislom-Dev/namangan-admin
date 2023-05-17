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

  const { createCompany } = useActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createCompany({
      name_ru: data.get("name_ru"),
      name_en: data.get("name_en"),
      name_uz: data.get("name_uz"),
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
        <DialogTitle>{"Add categories"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column-reverse",
                marginBottom: "10px",
              }}>
              <div>
                <TextField
                  sx={{ width: 350 }}
                  style={{ marginBottom: "10px" }}
                  label="Name RU"
                  name="name_ru"
                  required
                />
              </div>
              <TextField
                sx={{ width: 350 }}
                style={{ marginBottom: "10px" }}
                label="Name EN"
                name="name_en"
                required
              />
              <TextField
                sx={{ width: 350 }}
                style={{ marginBottom: "10px" }}
                label="Name UZ"
                name="name_uz"
                required
              />
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
