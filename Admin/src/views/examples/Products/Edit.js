import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'bootstrap'
import productAPI from 'api/productsAPI';
import Snack from './Snack'

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

        productAPI.edit(data).then(() => {
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



    const FormInfo = () => {
        return (
            <>
                <FormGroup>
                    <Label for="exampleEmail">
                        Tên sản phẩm
                    </Label>
                    <Input
                        required
                        id="exampleEmail"
                        name="text"
                        value={data.name}
                        placeholder="Nhập tên sản phẩm"
                        type="text"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                        Giá sản phẩm
                    </Label>
                    <Input
                        required
                        id="examplePassword"
                        name="password"
                        value={data.price}
                        placeholder="Nhập giá sản phẩm"
                        type="number"
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">
                        Mô tả
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="textarea"
                        placeholder='Nhập mô tả sản phẩm'
                        required
                        value={data.detail}
                        onChange={(e) => setData({ ...data, detail: e.target.value })}
                    />
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
                    <ModalHeader toggle={toggle}>Chỉnh sửa sản phẩm</ModalHeader>
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