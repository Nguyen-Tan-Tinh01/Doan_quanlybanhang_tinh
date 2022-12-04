/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Box, Button, Grid, Badge } from "@mui/material";
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CategoryIcon from '@mui/icons-material/Category'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import account from "store";
import cart from "store"
const AdminNavbar = (props) => {

  const show = () => {
    console.log(account.id)
    if (account.id === -1) {
      return (
        <Link
          className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
          to="/auth/login"
        >
          <ListItem >
            {/* <ListItemIcon sx={{ minWidth: 0, pr: '10px' }}>
              <ExpandMoreIcon fontSize="small" sx={{ color: 'white' }} />
            </ListItemIcon> */}
            <ListItemText primary="Đăng Nhập" />
          </ListItem>
        </Link>
      )
    }
    else {
      return (
        <Nav className="align-items-center d-none d-md-flex" navbar>

          <Button style={{ color: 'white' }}>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/admin/cart"
            >
              <Badge badgeContent={cart.count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Button>

          <UncontrolledDropdown nav>
            <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  />
                </span>
                <Media className="ml-2 d-none d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    {account.username}
                  </span>
                </Media>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Chào mừng!</h6>
              </DropdownItem>
              {/*<DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem> */}
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Đăng Xuất</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      )
    }
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            Trang Chủ
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Tìm kiếm" type="text" />
              </InputGroup>
            </FormGroup>
            <Box px={2}>
              <Grid container columnSpacing={2}>
                <Grid item>
                  <Link
                    className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                    to="/"
                  >
                    <ListItem >
                      <ListItemIcon sx={{ minWidth: 0, pr: '10px' }}>
                        <CategoryIcon fontSize="small" sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary="Danh Mục" />
                    </ListItem>
                  </Link>
                </Grid>

                <Grid item>
                  <Link
                    className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                    to="/"
                  >
                    <ListItem >
                      <ListItemIcon sx={{ minWidth: 0, pr: '10px' }}>
                        <ProductionQuantityLimitsIcon fontSize="small" sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary="Sản Phẩm" />
                    </ListItem>
                  </Link>
                </Grid>

                <Grid item>
                  <Link
                    className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                    to="/"
                  >
                    <ListItem >
                      <ListItemIcon sx={{ minWidth: 0, pr: '10px' }}>
                        <ExpandMoreIcon fontSize="small" sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary="Khác" />
                    </ListItem>
                  </Link>
                </Grid>

              </Grid>
            </Box>

          </Form>
          {show()}

        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
