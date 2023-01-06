import { request, response } from "express"
import db from "../../prisma/connection"
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

// create user
export const user_register = async (req = request, res = response) => {
    try {

        // membaca request body
        const data = await req.body

        // tulis data dari body ke database
        const result = await db.users.create({
            data: data
        })

        const { SECRET_KEY } = process.env

        // generated token
        const token = jwt.sign({
            id: result.id,
            email: result.email
        }, SECRET_KEY)

        // kembalikan response json
        res.status(201).json({
            success: true,
            message: "user berhasil di tambahkan ke database",
            token: token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

//login user
export const user_login = async (req = request, res = response) => {
    try {
        
        //kita ambil body
        const data = await req.body
        
        //check email
        const checkEmail = await db.users.findUnique({
            where: {
                email: data.email
            }
        })

        //jika email tidak ditemukan di database
        if (!checkEmail) {
            return res.status(404).json({
                success: false,
                message: "email tidak ditemukan"
            })
        }

        //jika password tidak sama
        if (data.password !== checkEmail.password) {
            return res.status(401).json({
                success: false,
                message: "password kurang tepat"
            })
        }

        //generate token
        const token = jwt.sign({
            id: checkEmail.id,
            email: checkEmail.email
        }, process.env.SECRET_KEY)

        //kembalikan reseponse json
        return res.status(200).json({
            success: true,
            message: "login berhasil",
            token: token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}