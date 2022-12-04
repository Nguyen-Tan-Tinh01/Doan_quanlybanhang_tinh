import React, { useEffect, useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'bootstrap'
import voucherAPI from 'api/voucherAPI';
import cartAPI from 'api/cartAPI'
import Snack from '../Products/Snack'
import city from './data.json';
import { Grid } from '@mui/material';

function Example(props) {
    const [modal, setModal] = useState(false);
    // const [product, setProduct]
    const toggle = () => setModal(!modal);
    //Quận huyện
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

    const [_voucher, _setVoucher] = useState("")

    const [snack, setSnack] = useState({
        open: false,
        type: "success",
        text: ""
    })

    function closeSnack() {
        setSnack({ ...snack, open: false })
    }

    function onClickAdd(e) {
        e.preventDefault()

        cartAPI.add(data).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Thêm đơn hàng thành công thành công"
                }
            )
            setModal(false)
            props.add(data)
        }).catch(() => {
            setSnack(
                {
                    open: true,
                    type: "error",
                    text: "Có lỗi xảy ra, vui lòng thử lại"
                }
            )
        })
    }

    const [imgProduct, setImgProduct] = useState("")

    useEffect(() => {
        if (props.products.length !== 0) {
            setImgProduct(props.products[0].image)
            setData({ ...data, sum_price: props.products[0].price, price: props.products[0].price, product_name: props.products[0].product_name })

        }
    }, [props.products])

    const onChangeHandlerCity = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        setDistrict(city[el.getAttribute('id')].districts)
        setData({ ...data, address01: e.target.value })

    }

    const onChangeHandlerDistrict = (e) => {
        setData({ ...data, address: e.target.value })
        // const index = e.target.selectedIndex;
        // const el = e.target.childNodes[index]
        // setDistrict(city[el.getAttribute('id')].districts)
    }
    const onChangeHandlerProduct = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const id = el.getAttribute('id')

        const _index = el.getAttribute('index')
        setImgProduct(props.products[_index].image)
        setData({ ...data, sum_price: props.products[_index].price, price: props.products[_index].price, product_id: id, product_name: e.target.value })
        // console.log()
    }



    function checkVoucher() {
        voucherAPI.check(data.voucher).then((res) => {
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
            <>
                <FormGroup>
                    <Label for="examplePassword">
                        Chọn Sản Phẩm
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        onChange={onChangeHandlerProduct}
                    >

                        {props.products.map((value, index) => {
                            return (
                                <option id={value.id} index={index}>
                                    {value.name}
                                </option>
                            )
                        })}
                    </Input>
                </FormGroup>

                <FormGroup>
                    <img src={imgProduct}></img>
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

                    <Button size='sm' style={{ position: 'absolute', right: '18px' }} onClick={checkVoucher}>
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
                        placeholder="Số Điện Thoại"
                        type="text"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value, name: e.target.value })}
                    />
                </FormGroup>
            </>
        )
    }
    return (

        <div>
            <Button onClick={toggle}
                color="primary"
            >
                <i className="ni ni-fat-add" />
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <form onSubmit={onClickAdd}>
                    <ModalHeader toggle={toggle}>Thêm Mã Giảm Giá</ModalHeader>
                    <ModalBody>
                        {FormInfo()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit'>
                            Thêm
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            Hủy
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
            <Snack data={snack} close={closeSnack} />
        </div>
    )
}

export default Example;