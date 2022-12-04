
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
import voucherAPI from "api/voucherAPI";
import AddProduct from './Products/AddProduct'
import Edit from './Level/Edit'
import Add from './Voucher/Add'
import Del from './Voucher/Del'
import { Alert, Tooltip } from "@mui/material";

const Tables = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        voucherAPI.get().then((res) => {
            setData(res.data.data)
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
        temp.push(value);
        setData(temp)
    }

    const editLevel = (index, value) => {
        if (index === 0) {
            return (
                <Edit item={value} index={index} edit={editSuccess}
                    condition_price={[0, data[index + 1].condition_min_price]}
                    condition_discount={[0, data[index + 1].discount]}
                    condition_numbercart={[0, data[index + 1].condition_number_cart]}
                />
            )
        }
        if (index === data.length - 1) {
            return (
                <Edit item={value} index={index} edit={editSuccess}
                    condition_price={[data[index - 1].condition_min_price, 9999999999999999]}
                    //Chiết khẩu không được quá 50%
                    condition_discount={[data[index - 1].discount, 50]}
                    //Đơn hàng tối thiểu không quá 1000
                    condition_numbercart={[data[index - 1].condition_number_cart, 1000]}
                />
            )
        }
        return (
            <Edit item={value} index={index} edit={editSuccess}
                condition_price={[data[index - 1].condition_min_price, data[index + 1].condition_min_price]}
                condition_discount={[data[index - 1].discount, data[index + 1].discount]}
                condition_numbercart={[data[index - 1].condition_number_cart, data[index + 1].condition_number_cart]}
            />
        )
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
                                <h3 className="mb-0">Cấp Độ</h3>
                                <div style={{ position: "absolute", right: "15px", top: "12px" }}>
                                    <Add data={[...data].reverse()} add={AddSuccess} />

                                </div>
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Mã</th>
                                        <th scope="col">Chiết Khấu (%)</th>
                                        <th scope="col">Trừ Thẳng Giá</th>
                                        <th scope="col">Số Lượng</th>
                                        <th scope="col">Ngày Hết Hạn</th>
                                        <th scope="col" className="text-right">Ngày Tạo</th>

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
                                                            {value.name}
                                                        </span>

                                                    </th>
                                                    <td>{value.discount} %</td>

                                                    <td>{Number(value.discount_price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>

                                                    <td>
                                                        {value.count === -1 ? "Không giới hạn" : value.count}
                                                    </td>

                                                    <td>
                                                        {/* {value.end === -1 ? "Không giới hạn": value.end} */}
                                                        {/* {
                                                            day = new Date(value.date)
                                                            day.toLocaleTimeString()
                                                            day.setMinutes(6).toLocaleTimeString()}
                                                        } */}
                                                        {/* {(new Date(value.date).setMinutes(6).toLocaleTimeString())} */}

                                                    </td>

                                                    <td className="text-right">
                                                        {new Date(value.date).toLocaleDateString()}
                                                    </td>
                                                    <td>
                                                        <Del id={value.id} index={index} name={value.name} del={DelSuccess}/>
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
