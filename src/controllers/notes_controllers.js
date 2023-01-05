import { request, response } from "express"
import db from "../../prisma/connection"

// read notes
export const notes_read = async (req = request, res = response) => {
    try {
        const result = await db.notes.findMany()
        res.status(200).json({
            success: true,
            notes: result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// create note
export const notes_create = async (req = request, res = response) => {
    try {
        const data = await req.body
        const createNote = await db.notes.create({
            data: data
        })
        res.status(201).json({
            success: true,
            message: "Berhasil menambahkan note ke database",
            note: createNote
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}