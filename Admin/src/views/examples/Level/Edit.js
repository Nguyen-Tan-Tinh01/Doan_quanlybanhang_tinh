import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'bootstrap'
import levelAPI from 'api/levelAPI';
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
        levelAPI.edit(data).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: `Chỉnh sửa ${data.name} thành công`
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
                        Tên
                    </Label>
                    <Input
                        required
                        id="exampleEmail"
                        name="text"
                        value={data.name}
                        placeholder="Tên Cấp Độ"
                        type="text"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                        Chiếu Khấu
                    </Label>
                    <Input
                        required
                        id="examplePassword"
                        name="text"
                        value={data.discount}
                        placeholder="Chiết Khấu"
                        type="number"
                        min={props.condition_discount[0]}
                        max={props.condition_discount[1]}
                        onChange={(e) => setData({ ...data, discount: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">
                        Đơn Hàng Tối Thiểu
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="number"
                        placeholder='Đơn Hàng Tối Thiểu'
                        min={props.condition_numbercart[0]}
                        max={props.condition_numbercart[1]}
                        required
                        value={data.condition_number_cart}
                        onChange={(e) => setData({ ...data, condition_number_cart: e.target.value })}
                    />
                </FormGroup>


                <FormGroup>
                    <Label for="exampleText">
                        Chi Tiêu Tối Thiểu
                    </Label>
                    <Input
                        id="exampleText"
                        name="text"
                        type="number"
                        placeholder='Chi Tiêu Tối Thiểu'
                        min={props.condition_price[0]}
                        max={props.condition_price[1]}
                        required
                        value={data.condition_min_price}
                        onChange={(e) => setData({ ...data, condition_min_price: e.target.value })}
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
                    <ModalHeader toggle={toggle}>Chỉnh sửa cấp độ  (Các ưu đãi không được lớn hơn cấp độ trên và thấp hơn cấp độ dưới)</ModalHeader>
                    <ModalBody>
                        {FormInfo()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type='submit'>
                            Xác Nhận
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