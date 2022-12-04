import { Button, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import categoryAPI from 'api/categoryAPI';
import Snack from '../Products/Snack'
import Edit from "./Edit"

export function Add(props) {
    const [open, setOpen] = React.useState(false)

    const [data, setData] = React.useState({
        id: props.id,
        name: ""
    })

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


    function onClickAdd(e) {
        e.preventDefault()

        categoryAPI.add_02(data).then((res) => {
            setSnack(
                {
                    open: true,
                    type: "success",
                    text: "Thêm sản phẩm thành công"
                }
            )
            setOpen(false)
            props.add(props.index, data.name, res.data.id)
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
                <Grid item>{props.name}</Grid>
                <Grid container sx={{ width: 'max-content', position: 'absolute', right: '50px' }}>
                    <Grid item alignItems='center'>
                        <Button size="small" onClick={handleClickOpen}>
                            <i className="ni ni-fat-add" style={{ fontSize: '25px' }} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Edit item={props.item} edit={props.edit} index={props.index} />
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm Danh Mục</DialogTitle>
                <form onSubmit={onClickAdd}>
                    <DialogContent>
                        <DialogContentText>
                            Thêm danh mục con vào danh mục {props.name}
                        </DialogContentText>
                        <TextField required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Tên danh mục"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
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
