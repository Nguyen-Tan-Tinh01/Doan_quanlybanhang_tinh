import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { cart } from '../../store'
import Snack from './Snack'
export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const [snack, setSnack] = React.useState({
    open: false,
    type: "success",
    text: ""
  })

  function closeSnack() {
    setSnack({ ...snack, open: false })
  }

  function onClickAdd() {
    setSnack(
      {
        open: true,
        type: "success",
        text: "Thêm sản phẩm thành công"
      }
    )
    setOpen(false);
    // cart.count += 1
    cart.data.push(props.data)
    Object.freeze(cart.data)



  }
  const info = () => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          // height="140"
          image={props.data.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.detail}
          </Typography>
        </CardContent>
        <CardActions>
          {/* < size="small" disabled> */}
          <b style={{ color: 'red' }}>{props.data.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</b>
          {/* </Button> */}
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    );
  }

  return (
    <div>
      <img src={props.data.image} width='150px' onClick={handleClickOpen} />
      {/* <Button variant='contained'>
        Mua ngay
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">

        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {info()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickAdd} variant='contained'>Thêm vào giỏ hàng</Button>
          {/* <Button onClick={handleClose} autoFocus variant='contained'>
            Mua Hàng
          </Button> */}
        </DialogActions>
      </Dialog>
      <Snack data={snack} close={closeSnack} />
    </div>
  );
}
