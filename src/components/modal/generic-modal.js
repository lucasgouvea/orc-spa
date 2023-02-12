import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import MuiModal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column"
};

export function GenericModal({ open, onClose, title, children }) {
  return (
    <div>
      <MuiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="title"
              variant="h6"
              component="h2"
              alignSelf={"center"}
              style={{ marginBottom: 50 }}>
              {title}
            </Typography>
            {children}
          </Box>
        </Fade>
      </MuiModal>
    </div>
  );
}
