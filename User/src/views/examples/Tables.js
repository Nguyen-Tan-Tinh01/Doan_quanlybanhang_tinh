
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Label,
  FormGroup, Input,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import account from "store"
import { cart } from "store"

import { Alert, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Snack from './Snack'
import productAPI from "api/productsAPI";
import Order from './Order'
const Tables = () => {
  const [data, seTData] = useState(cart.data)

  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    text: ""
  })
  const [_voucher, _setVoucher] = useState("")
  const [vSuccess, setVSuccess] = useState({
    open: false,
    discount: 0
  })

  const [v, setV] = useState('')

  function closeSnack() {
    setSnack({ ...snack, open: false })
  }

  function check_voucher() {
    if (v === '') {
      setSnack(
        {
          open: true,
          type: "error",
          text: "Nhập mã giảm giá"
        }
      )
    }
    else {
      productAPI.check_voucher(v).then((res) => {
        setSnack(
          {
            open: true,
            type: "success",
            text: "Mã giá chính xác"
          }
        )
        _setVoucher(`Đã áp dụng mã`)

        const voucher = res.data
        setVSuccess({
          open: true,
          discount: sumPrice * voucher.discount / 100 + voucher.discount_price
        })
        const _price = (sumPrice - sumPrice * voucher.discount) - voucher.discount_price
        setSumPrice(_price)

      }).catch(() => {
        setSnack(
          {
            open: true,
            type: "error",
            text: "Mã giá sai hoặc hết hạn"
          }
        )
        _setVoucher(`Mã không chính xác`)
        setVSuccess({
          open: false,
          discount: 0
        })
      })
    }
  }

  function Del(index) {
    let temp = [...data]
    temp.splice(index, 1)

    cart.data.splice(index, 1)
    Object.freeze(cart)

    seTData(temp)
    setSnack(
      {
        open: true,
        type: "success",
        text: "Xóa sản phẩm thành công"
      }
    )
  }

  const [sumPrice, setSumPrice] = useState(0)

  useEffect(() => {
    let temp = 0
    data.map((value) => {
      temp += value.price
    })
    setSumPrice(temp - temp * account.discount / 100)
  }, [data])

  const showVoucher = () => {
    if (vSuccess.open === true)
      return (
        <Grid item container justifyContent="space-between">
          <Grid item>
            {`Voucher ${_voucher}`}
          </Grid>
          <Grid item>
            {`- ${(vSuccess.discount).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`}
          </Grid>
        </Grid>
      )
    else return (<></>)
  }




  const thanhToan = () => {
    if (data.length !== 0) return (
      <Grid container direction="row" pl={2} pt={4} spacing={1}
        justifyContent="flex-start"
        width={500}
        alignItems="center">
        <Grid item md={12} sx={{ fontWeight: 'bold' }}>
          Thanh toán
        </Grid>


        {data.map((value, index) => {
          return (
            <Grid item container justifyContent="space-between">
              <Grid item>
                {index + 1}. {value.name}
              </Grid>
              <Grid item>
                {value.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
              </Grid>
            </Grid>
          )
        })}
        {/* </Grid> */}
        <Grid item direction="row">
          <Grid item>
            <Label>Mã giảm giá (nếu có)</Label>
          </Grid>
          <Grid item>
            <TextField placeholder="Nhập mã giảm giá" onChange={(e) => setV(e.target.value)}>

            </TextField>
          </Grid>
          <Grid item>
            {_voucher}
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={check_voucher}>
              Kiểm tra
            </Button>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between">
          <Grid item>
            {`Ưu đãi ${account.level} (${account.discount}%)`}
          </Grid>
          <Grid item>
            {`- ${(sumPrice * account.discount / 100).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}`}
          </Grid>
        </Grid>
        {showVoucher()}


        <Grid item sx={{ fontWeight: 'bold' }} md={12}>
          Tổng: {sumPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
        </Grid>
        <Grid item>
          <Order />
        </Grid>
      </Grid>
    )
    else return (
      <></>
    )
  }
  const show = () => {
    if (account.id === -1) {
      return (
        <Row>
          <Alert icon={false} color="error">Vui lòng đăng nhập</Alert>
        </Row>

      )
    }
    else {
      return (
        <>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Giỏ hàng</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sản Phẩm</th>
                      <th scope="col">Giá</th>

                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>

                    {data.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={value.image}
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {value.name}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{value.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                          <td className="text-right">
                            <Button size="small" color="error" onClick={() => Del(index)}>
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}

                    {thanhToan()}

                  </tbody>
                </Table>
              </Card>
            </div>
          </Row >
        </>
      )
    }
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        {show()}

        <Snack data={snack} close={closeSnack} />

      </Container>
    </>
  );
};

export default Tables;
