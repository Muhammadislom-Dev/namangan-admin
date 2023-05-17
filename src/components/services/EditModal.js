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
  const { updateServiceById, fetchServiceById, fetchProducts } = useActions();
  const { services, servicesLoading } = useSelector((state) => state.services);
  const {
    products: { data },
  } = useSelector((state) => state.products);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchServiceById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData =
      data.get("images") && data.get("images")
        ? {
            images: data.get("images"),
            title_uz: data.get("title_uz"),
            title_ru: data.get("title_ru"),
            title_en: data.get("title_en"),
            text_uz: data.get("text_uz"),
            text_ru: data.get("text_ru"),
            text_en: data.get("text_en"),
          }
        : data.get("images")
        ? {
            images: data.get("images"),
            title_uz: data.get("title_uz"),
            title_ru: data.get("title_ru"),
            title_en: data.get("title_en"),
            text_uz: data.get("text_uz"),
            text_ru: data.get("text_ru"),
            text_en: data.get("text_en"),
          }
        : data.get("images")
        ? {
            images: data.get("images"),
            title_uz: data.get("title_uz"),
            title_ru: data.get("title_ru"),
            title_en: data.get("title_en"),
            text_uz: data.get("text_uz"),
            text_ru: data.get("text_ru"),
            text_en: data.get("text_en"),
          }
        : {
            images: data.get("images"),
            title_uz: data.get("title_uz"),
            title_ru: data.get("title_ru"),
            title_en: data.get("title_en"),
            text_uz: data.get("text_uz"),
            text_ru: data.get("text_ru"),
            text_en: data.get("text_en"),
          };
    updateServiceById({
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
        {services?.data && !servicesLoading && (
          <Box component={"form"} onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <div>
                  <label htmlFor="image-input">For Image:</label>
                  <input
                    id="image-input"
                    className="form-control"
                    style={{
                      width: "250px",
                      marginRight: "20px",
                      fontSize: "1rem",
                    }}
                    name="images"
                    type="file"
                    required
                  />
                </div>
              </div>
              <div>
                <TextField
                  sx={{ width: 550, marginBottom: "10px" }}
                  label="Title"
                  name="title_uz"
                  required
                  defaultValue={services.data.title_uz}
                />
                <TextField
                  sx={{ width: 550, marginBottom: "10px" }}
                  label="Title RU"
                  name="title_ru"
                  required
                  defaultValue={services.data.title_ru}
                />
              </div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="Title"
                name="title_uz"
                required
                defaultValue={services.data.title_uz}
              />
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="Title EN"
                name="title_en"
                required
                defaultValue={services.data.title_en}
              />
              <div>
                <TextField
                  sx={{ width: 550, marginBottom: "10px" }}
                  label="text_ru"
                  name="text_ru"
                  multiline
                  maxRows={4}
                  required
                  defaultValue={services.data.text_ru}
                />
              </div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="text_en"
                name="text_en"
                multiline
                maxRows={4}
                required
                defaultValue={services.data.text_en}
              />
              <div>
                <TextField
                  sx={{ width: 550, marginBottom: "10px" }}
                  label="text_uz"
                  name="text_uz"
                  multiline
                  maxRows={4}
                  required
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
