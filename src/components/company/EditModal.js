import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { inputClear } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const { updateCompanyById, fetchCompanyById } = useActions();
  const { singleCompany, companiesLoading } = useSelector(
    (state) => state.companies
  );

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchCompanyById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = data.get("image")
      ? {
          name_ru: data.get("name_ru"),
          name_en: data.get("name_en"),
          name_uz: data.get("name_uz"),
        }
      : {
          name_ru: data.get("name_ru"),
          name_en: data.get("name_en"),
          name_uz: data.get("name_uz"),
        };
    updateCompanyById({
      id,
      formData,
    });
    handleClose();
  };

  return (
    <div>
      <Button variant={"text"} color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Edit company"}</DialogTitle>
        {singleCompany?.data && !companiesLoading && (
          <Box component={"form"} onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}>
                <div>
                  <TextField
                    sx={{ width: 230 }}
                    label="Title"
                    name="name_uz"
                    required
                    defaultValue={singleCompany.data.name_uz}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: 230 }}
                    style={{ marginBottom: "10px" }}
                    label="Title RU"
                    name="name_ru"
                    required
                    defaultValue={singleCompany.data.name_ru}
                  />
                  <TextField
                    sx={{ width: 230 }}
                    style={{ marginBottom: "10px" }}
                    label="Title EN"
                    name="name_en"
                    required
                    defaultValue={singleCompany.data.name_en}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </div>
  );
}
