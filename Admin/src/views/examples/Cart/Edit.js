import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'bootstrap'
import cartAPI from 'api/cartAPI';
import Snack from '../Products/Snack'

function Example(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [data, setData] = useState(props.item)


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

        cartAPI.edit(data).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Chỉnh sửa sản phẩm thành công"
                }
            )
            setModal(false)
            props.edit(data, props.index)
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


    const onChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        setData({ ...data, status: el.getAttribute('id') })
    }

    const onChangeHandler02 = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        setData({ ...data, payment: el.getAttribute('id') })
    }


    const se = ["Chưa Nhận Hàng", "Đã Nhận Hàng"]
    const pay = ["Chưa Thanh Toán", "Đã Thanh Toán"]

    const FormInfo = () => {
        return (
            <>
                <FormGroup>
                    <Label for="exampleEmail">
                        Tên Người Nhận
                    </Label>
                    <Input
                        required
                        id="exampleEmail"
                        name="text"
                        value={data.name}
                        placeholder="Tên Người Nhận"
                        type="text"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                        Địa Chỉ Nhận Hàng
                    </Label>
                    <Input
                        required
                        id="examplePassword"
                        name="text"
                        value={data.address}
                        placeholder="Địa Chỉ Nhận Hàng"
                        type="textarea"
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">
                        Số Điện Thoại
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="number"
                        placeholder='Số điện thoại'
                        required
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleSelect">
                        Đơn Hàng
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        // defaultValue="Chưa"

                        option={se}
                        defaultValue={se[data.status]}
                        // value={data.status}
                        onChange={onChangeHandler}
                    >
                        <option id={0} >
                            Chưa Nhận Hàng
                        </option>
                        <option id={1}>
                            Đã Nhận Hàng
                        </option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="exampleSelect">
                        Thanh Toán
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        // defaultValue="Chưa"

                        option={pay}
                        defaultValue={pay[data.payment - 1]}
                        // value={data.status}
                        onChange={onChangeHandler02}
                    >
                        <option id={1} >
                            Chưa Thanh Toán
                        </option>
                        <option id={2}>
                            Đã Thanh Toán
                        </option>
                    </Input>
                </FormGroup>
            </>
        )
    }
    return (

        <div>
            <Button onClick={toggle} size="sm"
                color="primary"
            >
                <i className="ni ni-settings" />
                {/* Chỉnh sửa */}
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <form onSubmit={onClickAdd}>
                    <ModalHeader toggle={toggle}>Chỉnh sửa đơn hàng</ModalHeader>
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