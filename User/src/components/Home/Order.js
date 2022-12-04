
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import city from './data.json';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Snack from './Snack'
import productAPI from 'api/productsAPI';
export default function AlertDialog(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const [district, setDistrict] = useState(city[0].districts)
    const [data, setData] = useState(
        {
            "name": '',
            "sum_price": props.price,
            "price": props.price,
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

    const [_voucher, _setVoucher] = useState("")

    const [snack, setSnack] = useState({
        open: false,
        type: "success",
        text: ""
    })

    function closeSnack() {
        setSnack({ ...snack, open: false })
    }

    function checkVoucher() {
        productAPI.check(data.voucher).then((res) => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Mã giá chính xác"
                }
            )
            _setVoucher(`Đã áp dụng mã`)

            const voucher = res.data
            const _price = (data.sum_price - data.sum_price * voucher.discount) - voucher.discount_price
            setData({ ...data, price: _price })

        }).catch(() => {
            setSnack(
                {
                    open: true,
                    type: "error",
                    text: "Mã giá sai hoặc hết hạn"
                }
            )
            _setVoucher(`Đã không chính xác`)
        })
    }

    const FormInfo = () => {
        return (
            <div>

                <FormGroup>
                    <img src={props.image}></img>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                        Giá
                    </Label>
                    <Input
                        required
                        id="examplePassword"
                        name="password"
                        // placeholder="Nhập Số Lượng"
                        disabled
                        type="text"
                        value={Number(data.sum_price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        min={0}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">
                        Mã Giảm Giá
                    </Label>

                    <Button size='sm' style={{ paddingLeft: '10px'}} onClick={checkVoucher}>
                        Áp dụng
                    </Button>

                    <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Nhập Mã Giảm Giá"
                        type="text"
                        value={data.voucher}

                        onChange={(e) => setData({ ...data, voucher: e.target.value })}
                    />
                    <Label for="exampleSelect">
                        {_voucher}
                    </Label>

                </FormGroup>


                <FormGroup>
                    <Label for="examplePassword">
                        Thành Tiền
                    </Label>
                    <Input
                        required
                        id="examplePassword"
                        name="password"
                        // placeholder="Nhập Số Lượng"
                        disabled
                        type="text"
                        value={Number(data.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                        min={0}
                    />
                </FormGroup>

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
                        placeholder="Tên Người Nhận"
                        type="text"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value, name: e.target.value })}
                    />
                </FormGroup>
            </div>
        )
    }
    return (
        <div>
            <Button onClick={handleClickOpen} variant='contained' >
                Mua ngay
            </Button>
            <Dialog  style={{zIndex: 10000}} fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Mua sản phẩm ${props.name}`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        {FormInfo()}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
