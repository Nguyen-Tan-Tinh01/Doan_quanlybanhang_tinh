module.exports = function (app) {
  const productsCtrl = require('./Controllers/ProductsController')
  const authCtrl = require('./Controllers/AuthController');
  const homeCtrl = require('./Controllers/HomeController');
  const category = require('./Controllers/CategoryController')
  const cart = require('./Controllers/CartController')
  const level = require('./Controllers/LevelController')
  const voucher = require('./Controllers/VoucherController')
  const user = require('./Controllers/UserController')
  app.route('/login')
    .post(authCtrl.login)
    app.route('/register')
    .post(authCtrl.register)

  app.route('/category')
    .get(category.get)
    .put(category.edit)

  app.route('/products')
    .post(productsCtrl.add)
    .get(productsCtrl.get)
    .put(productsCtrl.edit)
  app.route('/products/:id')
    .delete(productsCtrl.del)

  app.route('/category_02')
    .post(category.add_02)
    .put(category.edit_02)

  app.route('/category_02/:id')
    .delete(category.del_02)
  // todoList Routes
  // app.route('/products')
  //   .get(productsCtrl.get)

  //   app.route('/products_trend')
  //   .get(productsCtrl.trend)

  app.route('/home')
    .get(homeCtrl.getHome)

  app.route('/r_products/:id')
    .get(homeCtrl.get_random_products)

  app.route('/home/statistical')
    .get(homeCtrl.getHeader)
  // //Đnag nhập đăng kí
  // app.route('/login')
  //     .post(authCtrl.login)

  app.route('/cart')
    .get(cart.get)
    .put(cart.edit)
    .post(cart.add)


  app.route('/cart/:id')
    .delete(cart.del)

  app.route('/level')
    .get(level.get)
    .put(level.edit)
    .post(level.add)

  app.route('/level/:id')
    .delete(level.del)


  app.route('/voucher')
    .get(voucher.get)
    .post(voucher.add)

  app.route('/user')
    .get(user.get)

  app.route('/voucher/:id')
    .get(voucher.get_detail)
    .delete(voucher.del)
}

