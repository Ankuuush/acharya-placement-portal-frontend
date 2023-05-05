import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vw",
  bgcolor: "background.paper",
  height: "90vh",
  overflow: "scroll",
  borderTop: "20px solid #1f357e",
  padding: "20px 30px",
  borderRadius: "5px",
  backgroundColor: "white",
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
  outline: "none"
};

export default function ModalComponent({ open, setOpen, component, height }) {
  const handleClose = () => setOpen(false);
  if(height) style.height = height;
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {component}
        </Box>
      </Modal>
    </div>
  );
}
