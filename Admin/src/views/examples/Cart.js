
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
    Button,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import cartAPI from "api/cartAPI"
import productsAPI from "api/productsAPI"

import Add from './Cart/Add'
import Edit from './Cart/Edit'
import Del from './Cart/Del'
import { Alert, Tooltip } from "@mui/material";

const Tables = () => {
    const [data, setData] = useState([])
    // const [caterogy, setCategory] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        cartAPI.get().then((res) => {
            setData(res.data.data)
        })
        productsAPI.get().then((res) => {
            setProducts(res.data.data)
        })
    }, [])

    function editSuccess(value, index) {
        let temp = [...data]
        temp[index] = value
        setData(temp)
    }
    function DelSuccess(index) {
        let temp = [...data]
        temp.splice(index, 1)
        setData(temp)
    }

    function AddSuccess(value) {
        let temp = [...data]
        temp.push(value)
        setData(temp)
    }

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0" >
                                <h3 className="mb-0">Đơn Hàng</h3>
                                <div style={{ position: "absolute", right: "15px", top: "12px" }}>
                                    <Add data={data} products={products} add={AddSuccess} />
                                </div>
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Tài Khoản</th>
                                        <th scope="col">Sản Phẩm</th>
                                        <th scope="col">Tên Người Nhận</th>
                                        <th scope="col">Địa Chỉ</th>
                                        <th scope="col">SĐT</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Giá Gốc</th>
                                        <th scope="col">Trạng Thái</th>
                                        <th scope="col">Thanh Toán</th>

                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">

                                                        <span className="mb-0 text-sm">
                                                            {value.username}
                                                        </span>

                                                    </th>
                                                    {/* <td>{Number(value.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td> */}
                                                    <Tooltip title={
                                                        <>
                                                            <img src={value.product_image} />
                                                        </>
                                                    }
                                                        placement="top-start">
                                                        <td>
                                                            {value.product_name}
                                                        </td>
                                                    </Tooltip>

                                                    <td>{value.name}</td>
                                                    <td>{value.address}</td>
                                                    <td>{value.phone}</td>
                                                    <td>
                                                        {Number(value.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                    </td>
                                                    <td>
                                                        {Number(value.sum_price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                    </td>
                                                    <td>
                                                        {value.status === 1 ?
                                                            <Alert icon={false} color="success">Đã Nhận</Alert>
                                                            : <Alert icon={false} color="error">Đang Chờ</Alert>}
                                                    </td>
                                                    <td>
                                                        {value.payment === 1 ? <Alert icon={false} color="error">Chưa Thanh Toán</Alert>
                                                            : <Alert icon={false} color="success">Đã Thanh Toán</Alert>}
                                                    </td>
                                                    <td className="text-right">
                                                        <Edit item={value} index={index} edit={editSuccess} />
                                                        <Del id={value.id} index={index} del={DelSuccess} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Tables;
