
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import productAPI from "api/productsAPI";
import Category from "components/Home/Category";
import CategoryChilden from "components/Home/CategoryChilden"
import Products from "components/Home/Products";
import categoryAPI from "api/categoryAPI";
import productsAPI from "api/productsAPI";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  }
  const [data, setData] = useState([])

  useEffect(() => {
    categoryAPI.get().then(res => {
      setData(res.data.data)
    })
  }, [])


  //danh sách sản phẩm hiện ra
  const [products, setProducts] = useState([])

  useEffect(() => {
    productsAPI.get_random(-1).then((res) => {
      setProducts(res.data)
    })
  }, [])

  function onClickCategory(id) {
    productsAPI.get_random(id).then((res) => {
      setProducts(res.data)
    })
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">

                    <h2 className="text-uppercase text-muted mb-0">Danh Mục</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Xem Tất Cả</span>
                          <span className="d-md-none">ALL</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Category data={data} />
              </CardBody>
            </Card>
          </Col>

        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="3">

            <CategoryChilden data={data} select={onClickCategory} />
          </Col>
          <Col xl="9">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">

                    <h2 className="text-uppercase text-muted mb-0">Sản Phẩm Hot</h2>
                  </div>

                </Row>
              </CardHeader>
              <Products data={products} />

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
