import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type Data = {
    name:string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const users = await prisma.user.findMany()
    res.status(200).json(users)
}