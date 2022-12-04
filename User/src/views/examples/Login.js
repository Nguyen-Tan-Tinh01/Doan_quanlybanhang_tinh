import authAPI from "api/authAPI";
import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";
// import { useNavigate } from "react-router-dom"
// import { setAccount } from "store";
import account from "store";

import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [success, setSuccess] = useState(false)

  // const navigate = useNavigate()
  const history = useHistory();

  async function login() {
    await authAPI.login(user, pass).then(res => {
      // console.log(res.data)
      setSuccess(false)
      // setAccount(
      //   {
      //     id: res.data.id,
      //     username: user
      //   }
      // )
      account.id = res.data.id
      account.username = user
      account.level = res.data.level.level
      account.discount = res.data.level.discount
      Object.freeze(account)
      // navigate("/admin")
      history.push({ pathname: '/admin' })

      // nav('home')
    }).catch(err => {
      setSuccess(true)
    })
    // console.log(user, pass)
  }
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Đăng nhập bằng (chưa hỗ trợ)</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Hoặc tài khoản</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Tên Tài Khoản"
                    type="text"
                    autoComplete="new-email"
                    onChange={(e) => { setUser(e.target.value) }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật Khẩu"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => { setPass(e.target.value) }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Lưu</span>
                </label>

              </div>
              <p>{success === true ? "Thông tin tài khoản không chính xác" : ""}</p>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={login}>
                  Đăng Nhập
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              {/* <small>Forgot password?</small> */}
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Tạo tài khoản</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
