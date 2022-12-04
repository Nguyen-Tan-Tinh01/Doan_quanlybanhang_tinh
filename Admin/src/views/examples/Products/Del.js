import productAPI from 'api/productsAPI';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Snack from './Snack'


function Example(props) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [snack, setSnack] = useState({
        open: false,
        type: "success",
        text: ""
    })

    function closeSnack() {
        setSnack({ ...snack, open: false })
    }

    const onClickDel = () => {
        productAPI.del(props.id).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Xóa sản phẩm thành công"
                }
            )
            setModal(false)
            props.del(props.index)
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
            <Button color="danger" onClick={toggle} size='sm'>

                <i className="ni ni-fat-remove" />

            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Xóa Sản Phẩm Này</ModalHeader>
                <ModalBody>
                    Những đơn hàng liên quan đến sản phẩm này sẽ bị xóa
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={onClickDel}>
                        Xóa
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>

            <Snack data={snack} close={closeSnack} />
        </div>
    );
}

export default Example;