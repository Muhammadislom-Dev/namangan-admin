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
  const { updateTypeById, fetchTypeById, fetchCompanies } = useActions();
  const { types, typesLoading } = useSelector((state) => state.types);
  const {
    companies: { data },
  } = useSelector((state) => state.companies);

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchTypeById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = data.get("img_src")
      ? {
          images: data.get("images"),
        }
      : {
          images: data.get("images"),
        };
    updateTypeById({
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
        {types?.data && !typesLoading && (
          <Box component={"form"} onSubmit={handleSubmit} noValidate>
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
              <Button type="submit">Edit</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </div>
  );
}
