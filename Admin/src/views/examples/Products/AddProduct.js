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

    const [data, setData] = useState(
        {
            "name": '',
            "price": 0,
            "detail": '',
            "image": '',
            "category_id": -1,
            "category_name": ''
        }
    )

    const [fileUpload, setFileUpload] = useState('')

    const getBase64 = (file) => new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject('Error: ', error);
    })

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

        //Chuyển hình ảnh sang base64
        getBase64(fileUpload).then((res) => {
            let temp = data
            temp.image = res
            if (data.category_id === -1) {
                temp.category_id = (props.data)[0].id
                temp.category_name = (props.data)[0].name
            }

            productAPI.add(temp).then(() => {
                setSnack(
                    {
                        open: true,
                        type: "success",
                        text: "Thêm sản phẩm thành công"
                    }
                )
                setModal(false)
                props.add(temp)
            }).catch(() => {
                setSnack(
                    {
                        open: true,
                        type: "error",
                        text: "Có lỗi xảy ra, vui lòng thử lại"
                    }
                )
            })
        }).catch(() => {
            //Lỗi chuyển ảnh

            setSnack(
                {
                    open: true,
                    type: "error",
                    text: "Lỗi ảnh, vui lòng thử lại"
                }
            )
        })
    }

    const onChangeHandlerFile = (event) => {
        setFileUpload(event.target.files[0])
    }

    const onChangeHandler = (e) => {

        setData({ ...data, category_name: e.target.value })
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        setData({ ...data, category_id: el.getAttribute('id') })
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
                        placeholder="Nhập giá sản phẩm"
                        type="number"
                        onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">
                        Danh Mục
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        onChange={onChangeHandler}
                    >
                        {props.data.map((value) => {
                            return (
                                <option id={value.id}>
                                    {value.name}
                                </option>
                            )
                        })}
                    </Input>
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
                        onChange={(e) => setData({ ...data, detail: e.target.value })}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">
                        Ảnh
                    </Label>
                    <Input required
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
            <Button onClick={toggle}
                color="primary"
            >
                <i className="ni ni-fat-add" />
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <form onSubmit={onClickAdd}>
                    <ModalHeader toggle={toggle}>Thêm sản phẩm</ModalHeader>
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