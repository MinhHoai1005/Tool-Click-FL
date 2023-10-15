import { Dialog, DialogTitle, DialogContent, Autocomplete, TextField, DialogActions, Button } from '@mui/material'
import React, { useState } from 'react'
import { moneyAddByAdmin } from 'utils/apis/money';
import { formatIntToString } from 'utils';
import { toast } from 'react-toastify';
import { IAccount } from 'models';

interface DialogMoneyProps {
    open: boolean,
    rows: IAccount[],
    showDialog: Function,
    loadData: Function,
}

export const DialogMoney: React.FC<DialogMoneyProps> = (props) => {

    const { open, rows, showDialog, loadData } = props
    const [id, setId] = useState(null);
    const [numberformat, setNumberformat] = useState('0');


    const handleAgree = async () => {
        let data = await moneyAddByAdmin(id, formatIntToString(numberformat));
        if (data.code !== 200) {
            toast.error(data.message)
        } else {
            toast.success('Thay đổi trạng thái thành công')
            loadData()
        }
        showDialog()
    }
    const handleChange = (event, newValue) => {
        setId(newValue?.client_id)
    };
    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberformat(formatIntToString(event.target.value).toLocaleString('en-US'))
    };
    const onClose = () => {
        showDialog()
    }
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">
                Nạp điểm cho khách hàng
            </DialogTitle>
            <DialogContent>
                <Autocomplete
                    onChange={handleChange}
                    id="searchable-select"
                    options={rows === undefined ? [] : rows}
                    getOptionLabel={(option) => `${option.client_id} - ${option.user_name}`}
                    renderInput={(params) => <TextField {...params} label="Người dùng" />}
                />
                <TextField
                    label="Số tiền "
                    value={numberformat}
                    onChange={handleChangeNumber}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Thoát</Button>
                <Button onClick={handleAgree} autoFocus >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}
