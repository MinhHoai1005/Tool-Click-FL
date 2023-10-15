import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { removeVietnameseTones } from 'utils';
import { createCategory } from 'utils/apis/category';
import { toast } from 'react-toastify';

interface DialogCategoryProps {
    id?: string;
    open: boolean;
    handleClose: () => void;
    loadCategory:Function
}
export const DialogCategory: React.FC<DialogCategoryProps> = (props) => {

    const { id, open, handleClose,loadCategory } = props
    const [inputs, setInputs] = useState({
        name: '',
        url: '',
        image: '',
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
        if (name === 'name') {
            setInputs((inputs) => ({ ...inputs, 'url': removeVietnameseTones(inputs.name).toLocaleLowerCase().replaceAll(" ", "-") }));
        }
    };
    const handleAgree = async () => {
        let data = await createCategory(id, inputs.name, inputs.url, inputs.image);
        if (data.code !== 200) {
            toast.error(data.message)
        } else {
            toast.success('Tạo mới danh mục thành công')
            loadCategory()
            handleClose()
        }
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: "center" }}>{id !== "" ? "Cập nhật danh mục" : "Tạo mới danh mục"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nhập tên danh mục"
                    name="name"
                    onInput={handleInput}
                    fullWidth
                    variant="standard"
                    required
                />
                <TextField
                    value={inputs.url}
                    fullWidth
                    variant="standard"
                    disabled
                />
                <TextField
                    margin="dense"
                    label="Nhập link ảnh"
                    name="image"
                    onInput={handleInput}
                    fullWidth
                    variant="standard"
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Thoát</Button>
                <Button onClick={handleAgree}>Xác nhận</Button>
            </DialogActions>
        </Dialog>
    )
}
