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
  const { updateStatisticsById, fetchStatisticsById } = useActions();
  const { statistics, statisticsLoading } = useSelector(
    (state) => state.statistics
  );

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchStatisticsById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      images: data.get("images"),
      title_en: data.get("title_en"),
      title_ru: data.get("title_ru"),
      title_uz: data.get("title_uz"),
      text_en: data.get("text_en"),
      text_ru: data.get("text_ru"),
      text_uz: data.get("text_uz"),
    };
    updateStatisticsById({
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
        {statistics?.data && !statisticsLoading && (
          <Box component={"form"} onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <TextField
                  sx={{ width: 230, marginRight: "30px" }}
                  label="Title"
                  name="key"
                  required
                  defaultValue={statistics.data.key}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Title RU"
                  name="key_ru"
                  required
                  defaultValue={statistics.data.key_ru}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <TextField
                  sx={{ width: 230 }}
                  label="Title EN"
                  name="key_en"
                  required
                  defaultValue={statistics.data.key_en}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Count"
                  name="value_en"
                  required
                  defaultValue={statistics.data.value_en}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <TextField
                  sx={{ width: 230 }}
                  label="Title EN"
                  name="value"
                  required
                  defaultValue={statistics.data.value}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Count"
                  name="value_ru"
                  required
                  defaultValue={statistics.data.value_ru}
                />
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
