import express from "express";
import {
  getAllUser,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  updateUserStatus,
} from "../controllers/userController.js";
import tokenVerify from "../middlewares/tokenVerify.js";

const router = express.Router();

router.use(tokenVerify);

// routing
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser);
router.route("/user-status/:id").patch(updateUserStatus);

// export
export default router;
