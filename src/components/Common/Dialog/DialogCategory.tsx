import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { formatIntToString, removeVietnameseTones } from 'utils';
import { createCategory, updateCategory, updateChildrenCategory, createChildrenCategory } from 'utils/apis/category';
import { toast } from 'react-toastify';
import { ICategory } from 'models';

interface DialogCategoryProps {
    data: ICategory | undefined;
    child?: string;
    open: boolean;
    handleClose: () => void;
    loadCategory: Function
}
export const DialogCategory: React.FC<DialogCategoryProps> = (props) => {

    const { data, child, open, handleClose, loadCategory } = props
    const [inputs, setInputs] = useState({
        name: '',
        url: '',
        image: '',
        menu: ''
    });
    const [menu, setMenu] = React.useState<string >('0');

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
        if (name === 'name') {
            setInputs((inputs) => ({ ...inputs, 'url': removeVietnameseTones(inputs.name).toLocaleLowerCase().replaceAll(" ", "-") }));
        }
    };
    const handleAgree = async (id: string | undefined) => {
        if (id !== undefined) {
            let data = await updateCategory(id, inputs.name, inputs.url, inputs.image, inputs.menu);
            if (data.code !== 200) {
                toast.error(data.message)
            } else {
                toast.success('Cập nhật danh mục thành công')
                loadCategory()
                handleClose()
                setInputs({ name: '', url: '', image: '',menu:'' })
            }
        } else {
            let data = await createCategory(inputs.name, inputs.url, inputs.image, inputs.menu);
            if (data.code !== 200) {
                toast.error(data.message)
            } else {
                toast.success('Tạo mới danh mục thành công')
                loadCategory()
                handleClose()
                setInputs({ name: '', url: '', image: '',menu:'' })
            }
        }
    }
    const handleChild = async (id: string | undefined) => {
        if (child === "1111") {
            let data = await createChildrenCategory(id, inputs.name, inputs.url, inputs.image, inputs.menu);
            if (data.code !== 200) {
                toast.error(data.message)
            } else {
                toast.success('Tạo mới danh mục con thành công')
                loadCategory()
                handleClose()
                setInputs({ name: '', url: '', image: '',menu:'' })
            }
        } else {
            let data = await updateChildrenCategory(id, child, inputs.name, inputs.url, inputs.image, inputs.menu);
            if (data.code !== 200) {
                toast.error(data.message)
            } else {
                toast.success('Cập nhật danh mục con thành công')
                loadCategory()
                handleClose()
                setInputs({ name: '', url: '', image: '',menu:'' })
            }

        }
    }
    const handleChangeSelect = (e: SelectChangeEvent) => {
        setInputs((inputs) => ({ ...inputs, 'menu': e.target.value as string }));
    };
    useEffect(() => {
        if (data !== undefined && child !== "1111") {
            if (child !== "") {
                let res = data.children?.find((item) => item.id === child)
                if (res !== undefined) {
                    setInputs({ name: res?.name, url: res?.url, image: res?.image, menu: res.menu })
                }
            } else {
                setInputs({ name: data.name, url: data.url, image: data?.image,menu: data.menu })
            }
        }
    }, [data, child])
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: "center" }}>{(data === undefined || child === "1111") ? "Tạo mới danh mục" : "Cập nhật danh mục"}</DialogTitle>
            <DialogContent>
                <TextField
                    value={inputs.name}
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
                    value={inputs.image}
                    margin="dense"
                    label="Nhập link ảnh"
                    name="image"
                    onInput={handleInput}
                    fullWidth
                    variant="standard"
                    required
                />
                <Select
                    value={inputs.menu}
                    name="menu"
                    label="Giao diện"
                    onChange={handleChangeSelect}
                    fullWidth
                >
                    <MenuItem value={'1'}>Giao diện buff like bài viết</MenuItem>
                    <MenuItem value={'2'}>Giao diện buff like comment</MenuItem>
                    <MenuItem value={'3'}>Giao diện buff comment bài viết</MenuItem>
                    <MenuItem value={'4'}>Giao diện buff view video</MenuItem>
                    <MenuItem value={'5'}>Giao diện buff view videoGiao diện buff view video</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Thoát</Button>
                <Button onClick={() => child !== "" ? handleChild(data?._id) : handleAgree(data?._id)}>Xác nhận</Button>
            </DialogActions>
        </Dialog>
    )
}
