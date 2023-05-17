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

  const { createProduct, fetchCompanies } = useActions();
  const {
    companies: { data },
  } = useSelector((state) => state.companies);

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createProduct({
      images: data.get("images"),
      description_ru: data.get("description_ru"),
      description_en: data.get("description_en"),
      title_ru: data.get("title_ru"),
      title_en: data.get("title_en"),
      price: data.get("price"),
      category_id: data.get("category_id"),
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
                required
              />
            </div>
            <div>
              <TextField
                sx={{ width: 550, marginBottom: "10px" }}
                label="title_ru"
                name="title_ru"
                multiline
                maxRows={4}
                required
              />
            </div>
            <TextField
              sx={{ width: 550, marginBottom: "10px" }}
              label="title_en"
              name="title_en"
              multiline
              maxRows={4}
              required
            />
            <TextField
              sx={{ width: 550, marginBottom: "10px" }}
              label="price"
              name="price"
              multiline
              maxRows={4}
              required
            />

            <TextField
              sx={{ width: 550, marginBottom: "10px" }}
              label="description_en"
              name="description_en"
              multiline
              maxRows={4}
              required
            />
            <TextField
              sx={{ width: 550, marginBottom: "10px" }}
              label="description_ru"
              name="description_ru"
              multiline
              maxRows={4}
              required
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between",
              }}>
              <select
                placeholder="Company"
                className="form-select"
                required
                name="category_id"
                defaultValue={""}>
                <option value="" disabled>
                  Select Category
                </option>
                {data?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name_ru}
                  </option>
                ))}
              </select>
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
