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

        categoryAPI.edit_02(data).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Chỉnh sửa danh mục thành công"
                }
            )
            setModal(false)
            props.edit(data, props.index, props.index_02)
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
                color="primary"
            >
                <i className="ni ni-settings" />
                {/* Chỉnh sửa */}
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <form onSubmit={onClickAdd}>
                    <ModalHeader toggle={toggle}>Chỉnh sửa danh mục</ModalHeader>
                    <ModalBody>
                        <TextField required
                            autoFocus
                            value={data.name}
                            margin="dense"
                            id="name"
                            label="Tên danh mục"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />

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