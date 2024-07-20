import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailsPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product",
    page: ProductPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetailPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: true,
    isShowFooter: false,
    isPrivate: true,
  },
  {
    path: "/*",
    page: NotFoundPage,
  },
];
