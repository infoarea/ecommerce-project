import Account from "../pages/account/Account";
import Cart from "../pages/cart/Cart";
import CheckOut from "../pages/checkout/CheckOut";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import SingleProduct from "../pages/shop/singleProduct/SingleProduct";

const publicRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/:id",
    element: <SingleProduct />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/account",
    element: <Account />,
  },
];

export default publicRouter;
