
import Index from "views/Index.js"
import Profile from "views/examples/Profile.js"
import Maps from "views/examples/Maps.js"
import Register from "views/examples/Register.js"
import Login from "views/examples/Login.js"
import Category from "views/examples/Category.js"
import Products from "views/examples/Products.js"
import Cart from "views/examples/Cart.js"
import Level from "views/examples/Level.js"
import Voucher from "views/examples/Voucher"
import User from "views/examples/User"

import Home from "views/shop"
<i className="ni ni-cart" />
var routes = [
  {
    path: "/index",
    name: "Trang Chủ",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Sản Phẩm",
    icon: "ni ni-books text-info",
    component: Products,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Danh Mục",
    icon: "ni ni-bullet-list-67 text-red",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/cart",
    name: "Đơn Hàng",
    icon: "ni ni-cart text-green",
    component: Cart,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Tài Khoản",
    icon: "ni ni-circle-08 text-red",
    component: User,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Cấp Bậc",
    icon: "ni ni-trophy text-yellow",
    component: Level,
    layout: "/admin"
  },
  {
    path: "/voucher",
    name: "Mã Giảm Giá",
    icon: "ni ni-money-coins text-blue",
    component: Voucher,
    layout: "/admin"
  }




  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
