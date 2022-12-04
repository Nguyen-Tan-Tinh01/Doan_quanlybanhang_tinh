import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'bootstrap'
import categoryAPI from 'api/categoryAPI';
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

    const [fileUpload, setFileUpload] = useState('')

    const getBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })

    const onChangeHandlerFile = (event) => {
        setFileUpload(event.target.files[0])
    }

    function sendEdit(value) {
        categoryAPI.edit(value).then(() => {
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

        })
    }
    function onClickAdd(e) {
        e.preventDefault()

        getBase64(fileUpload).then((res) => {
            let temp = data
            temp.image = res
            sendEdit(temp)
        }).catch(() => {
            //Không chọn ảnh
            sendEdit(data)
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
                        Tên Danh Mục
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
                    <img src={data.image} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">
                        Thay Đổi Ảnh
                    </Label>
                    <Input

                        onChange={onChangeHandlerFile}
                        id="exampleFile"
                        name="file"
                        type="file"
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