
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
import productAPI from "api/productsAPI";
import AddProduct from './Products/AddProduct'
import Edit from './Products/Edit'
import Del from './Products/Del'
const Tables = () => {
  const [data, setData] = useState([])
  const [caterogy, setCategory] = useState([])

  useEffect(() => {
    productAPI.get().then((res) => {
      setCategory(res.data.categorys)
      setData(res.data.data)
    })
  }, [])
  //Thêm ảnh thành công
  function addImageSuccess(value) {
    setData([value, ...data])
  }
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
                <h3 className="mb-0">Sản Phẩm</h3>
                <div style={{ position: "absolute", right: "15px", top: "12px" }}>
                  <AddProduct data={caterogy} add={addImageSuccess} />
                </div>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Danh Mục</th>
                    <th scope="col">Đã Bán</th>
                    <th scope="col">Hình Ảnh</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((value, index) => {
                      return (
                        <tr key={index}>
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
                          <td>{Number(value.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                          <td>{value.category_name}</td>
                          <td>{value.count}</td>
                          <td></td>
                          <td className="text-right">
                            <Edit data={caterogy} item={value} index={index} edit={editSuccess} />
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
