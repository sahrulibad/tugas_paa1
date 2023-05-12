import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method === 'POST'){
        const {name, email, password} = req.body
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password,
            }
        })
        res.status(200).json(user)
    }
}