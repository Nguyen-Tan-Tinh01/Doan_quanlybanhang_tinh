import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import city from './data.json';
import Snack from './Snack'
import {
    Label,
    FormGroup, Input,
} from "reactstrap";

import { Grid } from "@mui/material";
import { seEffect, useState } from "react";


export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [snack, setSnack] = React.useState({
        open: false,
        type: "success",
        text: ""
    })
    function closeSnack() {
        setSnack({ ...snack, open: false })
    }
    function onClickSuccess(e) {
        e.preventDefault()

        setSnack({
            open: true,
            type: 'success',
            text: 'Đặt hàng thành công'
        })
        setOpen(false)
    }

    const [district, setDistrict] = useState(city[0].districts)
    const [data, setData] = useState(
        {
            "name": '',
            "sum_price": 10,
            "price": 10,
            "voucher": '',
            "phone": 1234596789,
            "discount": 0,
            "discount_price": 10000,
            "username": '',
            "product_id": -1,
            //sỐ Nhà
            "_address": '',
            //Huyện quận
            "address": '',
            //Thành Phố
            "address01": '',
            "product_name": ''
        }
    )

    const onChangeHandlerCity = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        setDistrict(city[el.getAttribute('id')].districts)
        setData({ ...data, address01: e.target.value })

    }

    const onChangeHandlerDistrict = (e) => {
        setData({ ...data, address: e.target.value })

    }



    const FormInfo = () => {
        return (
            <>

                <FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Tỉnh/Thành Phố
                        </Label>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={onChangeHandlerCity}
                                >
                                    {city.map((value, index) => {
                                        return (
                                            <option id={index}>
                                                {value.name}
                                            </option>
                                        )
                                    })}
                                </Input>
                            </Grid>
                            <Grid item md={6}>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    onChange={onChangeHandlerDistrict}
                                >
                                    {district.map((value, index) => {
                                        return (
                                            <option id={index}>
                                                {value.name}
                                            </option>
                                        )
                                    })}
                                </Input>
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">
                            Địa Chỉ (số nhà, đường)
                        </Label>
                        <Input
                            required
                            id="examplePassword"
                            name="password"
                            placeholder="Nhập số nhà, số đường"
                            type="text"
                            // value={data.discount}
                            min={0}
                            onChange={(e) => setData({ ...data, _address: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">
                            Số Điện Thoại
                        </Label>
                        <Input
                            required
                            id="examplePassword"
                            name="password"
                            placeholder="Số Điện Thoại"
                            type="number"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: Number(e.target.value) })}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">
                            Tên Người Nhận
                        </Label>
                        <Input
                            required
                            id="examplePassword"
                            name="password"
                            placeholder="Số Điện Thoại"
                            type="text"
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value, name: e.target.value })}
                        />
                    </FormGroup>
                </FormGroup>
            </>
        )
    }

    return (
        <div>
            <Button onClick={handleClickOpen} color="error" variant='contained'>
                Đặt Hàng
            </Button>
            <form onSubmit={(e) => onClickSuccess(e)}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Hoàn tất đặt hàng"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {FormInfo()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button type="submit" onClick={onClickSuccess} variant='contained'>
                            Hoàn Tất
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
            <Snack data={snack} close={closeSnack} />
        </div>
    );
}
