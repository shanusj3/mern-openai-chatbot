import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser, } from "../controllers/user-controller.js";
import { loginValidator, signupValidator, validate, } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.post("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);
export default userRouter;
//# sourceMappingURL=user-routes.js.map