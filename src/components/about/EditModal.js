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

export default function EditModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const { updateAboutById, fetchAboutById } = useActions();
  const { singleAbout, aboutLoading } = useSelector((state) => state.about);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchAboutById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = data.get("images")
      ? {
          images: data.get("images"),
          title_en: data.get("title_en"),
          title_ru: data.get("title_ru"),
          title_uz: data.get("title_uz"),
          description_en: data.get("description_en"),
          description_ru: data.get("description_ru"),
          description_uz: data.get("description_uz"),
        }
      : {
          images: data.get("images"),
          title_en: data.get("title_en"),
          title_ru: data.get("title_ru"),
          title_uz: data.get("title_uz"),
          description_en: data.get("description_en"),
          description_ru: data.get("description_ru"),
          description_uz: data.get("description_uz"),
        };
    updateAboutById({ formData, id });
    handleClose();
  };

  return (
    <div>
      <Button variant="text" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Edit about"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          {singleAbout?.data && !aboutLoading && (
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <input
                  className="form-control"
                  style={{
                    width: "250px",
                    marginRight: "20px",
                    fontSize: "1rem",
                  }}
                  name="images"
                  type="file"
                />
              </div>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
