import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'bootstrap'
import voucherAPI from 'api/voucherAPI';
import Snack from '../Products/Snack'

function Example(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [data, setData] = useState(
        {
            "name": '',
            "count": 10,
            "end": 10,
            "discount": 0,
            "discount_price": 10000,
            "date": Date.now()
        }
    )

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

        voucherAPI.add(data).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Thêm mã giảm giá thành công thành công"
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

    function randomVoucher() {
        let r = (Math.random() + 1).toString(36).substring(2)
        setData({ ...data, name: r.toUpperCase() })
    }

    const FormInfo = () => {
        return (
            <>
                <FormGroup>
                    <Label for="exampleEmail">
                        Mã
                    </Label>
                    <Button size='sm' style={{ position: 'absolute', right: '18px' }} onClick={randomVoucher}>
                        Ngẫu Nhiên
                    </Button>
                    <Input
                        required
                        id="exampleEmail"
                        name="text"
                        placeholder="Nhập Mã Giảm Giá"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />

                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                        Số Lượng
                    </Label>
                    <Button size='sm' style={{ position: 'absolute', right: '18px' }} onClick={
                        () => {
                            setData({ ...data, count: -1 })
                        }
                    }>
                        Không Giới Hạn
                    </Button>
                    <Input
                        required
                        id="examplePassword"
                        name="password"
                        placeholder="Nhập Số Lượng"
                        type="number"
                        value={data.count}
                        min={0}
                        onChange={(e) => setData({ ...data, count: Number(e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">
                        Thời Hạn (phút)
                    </Label>

                    <Button size='sm' style={{ position: 'absolute', right: '18px' }} onClick={
                        () => {
                            setData({ ...data, end: -1 })
                        }
                    }>
                        Không Giới Hạn
                    </Button>

                    <Input
                        required
                        id="examplePassword"
                        name="password"
                        placeholder="Nhập Số Lượng"
                        type="number"
                        value={data.end}
                        min={0}
                        onChange={(e) => setData({ ...data, end: Number(e.target.value) })}
                    />

                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">
                        Giảm Giá (%)
                    </Label>
                    <Input
                        required
                        id="examplePassword"
                        name="password"
                        placeholder="Nhập Phần Trăm"
                        type="number"
                        value={data.discount}
                        min={0}
                        onChange={(e) => setData({ ...data, discount: Number(e.target.value) })}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleText">
                        Giảm Giá (vnđ)
                    </Label>
                    <Input
                        required
                        id="examplePassword"
                        name="password"
                        placeholder="Nhập Số Tiền"
                        type="number"
                        value={data.discount_price}
                        min={10000}
                        onChange={(e) => setData({ ...data, discount_price: Number(e.target.value) })}
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