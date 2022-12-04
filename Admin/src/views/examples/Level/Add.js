import { Button, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import levelAPI from 'api/levelAPI';
import Snack from '../Products/Snack'
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

export default function Add(props) {
    const [open, setOpen] = React.useState(false)

    const [data, setData] = React.useState({
        id: props.id,
        name: ""
    })

    //Vị trí thêm cấp độ
    const [indexAdd, setIndexAdd] = React.useState(props.data.length - 1)
    //Điều kiện ưu đãi
    const [condition, setCondition] = React.useState({
        condition_price: [0, 999999999],
        //Chiết khấu không quá 50%
        condition_discount: [0, 50],
        //Đơn hành tối thiểu không quá 1000
        condition_numbercart: [0, 1000]
    })

    React.useEffect(() => {
        if ((props.data).length === 0) return
        setCondition({
            condition_price: [props.data[0].condition_min_price, 999999999],
            //Chiết khấu không quá 50%
            condition_discount: [props.data[0].discount, 50],
            //Đơn hành tối thiểu không quá 1000
            condition_numbercart: [props.data[0].condition_number_cart, 1000]
        })
    }, [props.data])
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const [snack, setSnack] = React.useState({
        open: false,
        type: "success",
        text: ""
    })

    function closeSnack() {
        setSnack({ ...snack, open: false })
    }

    const onChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const _index = props.data.length - Number(el.getAttribute('id'))
        //Thêm vào sau cùng
        if (_index === 0) {
            setCondition({
                condition_price: [props.data[_index].condition_min_price, 999999999],
                //Chiết khấu không quá 50%
                condition_discount: [props.data[_index].discount, 50],
                //Đơn hành tối thiểu không quá 1000
                condition_numbercart: [props.data[_index].condition_number_cart, 1000]
            })
        }
        else {
            setCondition({
                condition_price: [props.data[_index].condition_min_price, props.data[_index - 1].condition_min_price],
                //Chiết khấu không quá 50%
                condition_discount: [props.data[_index].discount, props.data[_index - 1].discount],
                //Đơn hành tối thiểu không quá 1000
                condition_numbercart: [props.data[_index].condition_number_cart, props.data[_index - 1].condition_number_cart]
            })
        }
        setIndexAdd(_index)
    }



    function onClickAdd(e) {
        e.preventDefault()

        levelAPI.add(data).then((res) => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Thêm cấp độ thành công"
                }
            )
            setOpen(false)
            props.add(data, indexAdd)
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
        <>
            <Grid container alignItems='center'>
                <Grid item>
                    <Button size="small" onClick={handleClickOpen}>
                        <i className="ni ni-fat-add" style={{ fontSize: '25px' }} />
                    </Button>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose} fullWidth="sm">
                <form onSubmit={onClickAdd}>
                    <DialogTitle>

                    </DialogTitle>

                    <DialogContent>
                        <FormGroup>
                            <Label for="exampleSelect">
                                Thêm Cấp Độ
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
                                            sau {value.name}
                                        </option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Tên Cấp Độ
                            </Label>
                            <Input required
                                autoFocus
                                margin="dense"
                                id="name"
                                placeholder="Tên Cấp Độ"
                                type="text"

                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Chiết Khấu (không quá 50%)
                            </Label>
                            <Input required
                                autoFocus
                                margin="dense"
                                id="name"
                                placeholder="Chiết Khấu"

                                type="number"
                                min={condition.condition_discount[0]}
                                max={condition.condition_discount[1]}

                                onChange={(e) => setData({ ...data, discount: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleEmail">
                                Đơn Hàng Tối Thiểu
                            </Label>
                            <Input required
                                autoFocus
                                margin="dense"
                                id="name"
                                placeholder="Đơn Hàng Tối Thiểu"

                                type="number"
                                min={condition.condition_numbercart[0]}
                                max={condition.condition_numbercart[1]}
                                onChange={(e) => setData({ ...data, condition_number_cart: e.target.value })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Chi Tiêu Tối Thiểu
                            </Label>
                            <Input required
                                autoFocus
                                margin="dense"
                                id="name"
                                placeholder="Chi Tiêu Tối Thiểu"

                                type="number"
                                min={condition.condition_price[0]}
                                max={condition.condition_price[1]}
                                onChange={(e) => setData({ ...data, condition_min_price: e.target.value })}
                            />
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button type="submit" variant="contained">Thêm</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snack data={snack} close={closeSnack} />
        </>
    )
}
