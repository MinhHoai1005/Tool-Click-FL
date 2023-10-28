import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { removeVietnameseTones } from 'utils';
import { toast } from 'react-toastify';
import { ISetting } from 'models';
import { createSetting, updateSetting } from 'utils/apis/setting';

interface DialogSettingProps {
    data: ISetting | undefined;
    open: boolean;
    handleClose: () => void;
    loadData: Function
}
export const DialogSetting: React.FC<DialogSettingProps> = (props) => {

    const { data, open, handleClose, loadData } = props
    const [inputs, setInputs] = useState({
        id:'',
        name: '',
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
        if (data === undefined) {
            let data = await createSetting( inputs.name,  inputs.image);
            if (data.code !== 200) {
                toast.error(data.message)
            } else {
                toast.success('Tạo mới cảm xúc thành công')
                loadData()
                handleClose()
            }
        } else {
            let data = await updateSetting(inputs.id,inputs.name, inputs.image);
            if (data.code !== 200) {
                toast.error(data.message)
            } else {
                toast.success('Cập nhật cảm xúc thành công')
                loadData()
                handleClose()
            }
        }
        setInputs({ name: '', id: '', image: '', })
    }
    useEffect(() => {
        if (data!== undefined) {
            setInputs({
                id: data?._id,
                name: data.name,
                image: data.image,
            });
        }
    }, [data])
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: "center" }}>{data === undefined ? "Tạo mới danh mục" : "Cập nhật danh mục"}</DialogTitle>
            <DialogContent>
                <TextField
                    value={inputs.name}
                    autoFocus
                    margin="dense"
                    label="Nhập tên cảm xúc"
                    name="name"
                    onInput={handleInput}
                    fullWidth
                    variant="standard"
                    required
                />
                <TextField
                    value={inputs.image}
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
