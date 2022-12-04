import cartAPI from 'api/cartAPI';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Snack from '../Products/Snack'


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
        cartAPI.del(props.id).then(() => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Xóa đơn hàng thành công"
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
                <ModalHeader toggle={toggle}>Xóa Đơn Hàng Này</ModalHeader>
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