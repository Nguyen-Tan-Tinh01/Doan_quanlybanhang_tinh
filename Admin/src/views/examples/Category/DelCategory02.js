import React, { useState } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { TextField } from '@mui/material';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'bootstrap'
import categoryAPI from 'api/categoryAPI';
import Snack from '../Products/Snack'

function Example(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    const [data, setData] = React.useState({
        id: props.item.id,
        name: props.item.name
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

        categoryAPI.del_02(data.id).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Xóa danh mục thành công"
                }
            )
            setModal(false)
            props.del(props.index, props.index_02)
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


    return (

        <div>
            <Button onClick={toggle} size="sm"
                color="danger"
            ><i className="ni ni-fat-remove" />
                {/* Chỉnh sửa */}
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <form onSubmit={onClickAdd}>
                    <ModalHeader toggle={toggle}>Xóa Danh Mục {props.item.name} ?</ModalHeader>
                    {/* <ModalBody>
                    </ModalBody> */}
                    <ModalFooter>
                        <Button color="danger" type='submit'>
                            Xóa
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