import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./publicRouter";
import privateRouter from "./privateRouter";
import Layouts from "../layouts/layouts";

const router = createBrowserRouter([
  {
    element: <Layouts />,
    children: [...publicRouter, ...privateRouter],
  },
]);

export default router;
