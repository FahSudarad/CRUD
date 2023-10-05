import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function ConfirmDeleteDialog({ isOpen, onClose, onDeleteConfirm }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">ยืนยันการลบ</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          คุณแน่ใจหรือไม่ที่ต้องการลบผู้ใช้นี้?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          ยกเลิก
        </Button>
        <Button onClick={onDeleteConfirm} color="error" autoFocus>
          ตกลง
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
