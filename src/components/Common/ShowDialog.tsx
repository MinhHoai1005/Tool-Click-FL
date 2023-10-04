import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { ActionDialog } from 'models';
import React from 'react'

interface ShowDialogProps {
    onActionShow: Function,
    open: boolean,
    data?: ActionDialog,
}
const ShowDialog: React.FC<ShowDialogProps> = (props) => {

    const { onActionShow, open, data } = props;
    const handleClose = () => {
        onActionShow(false);

    };
    const handleAgree = () => {
        data?.onAgree(true)
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {data?.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {data?.span}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Thoát</Button>
                <Button onClick={handleAgree} autoFocus >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ShowDialog