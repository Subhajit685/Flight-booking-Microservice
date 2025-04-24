import express from "express"
import { check, login, logout, sign } from "../controllers/user_controller.js"
const router = express.Router()

router.post("/sign-up", sign)

router.post("/login", login)

router.get("/check", check)

router.post("/logout", logout)

export default router