import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Permission from "../pages/permission/Permission";
import Role from "../pages/role/Role";
import User from "../pages/user/User";
import PrivateGard from "./PrivateGard";

const privateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <User />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/role",
            element: <Role />,
          },
        ],
      },
    ],
  },
];

export default privateRouter;
