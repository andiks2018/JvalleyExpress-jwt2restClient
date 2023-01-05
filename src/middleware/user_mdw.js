import { request, response } from "express"
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

const user_mdw = async (req = request, res = response, next) => {
    try {
        // coba check apakah ada authorization
        const authorization = await req.headers.authorization
        if (!authorization) {
            return res.status(401).json({
                success: false,
                message: "authorization tidak ditemukan !"
            })
        }
        const token = await authorization.split(" ")[1]
        // validasi token
        const verify = await jwt.verify(token, process.env.SECRET_KEY)
        if (!verify) {
            return res.status(401).json({
                success: false,
                message: "Token tidak terverifikasi!"
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error.message
        })
    }
}

export default user_mdw