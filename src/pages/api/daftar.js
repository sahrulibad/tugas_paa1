import {hash} from 'bcrypt';
import prisma from '../../../lib/prisma';

export default async function handler (req, res){

    if (req.method === 'POST'){
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"Kesalahan!"});
        }
        const existingUser = await prisma.user.findUnique({where:{email}});

        if (existingUser) {
            return res.status(400).json({message:"Email ini sudah terdaftar"});
        }

        const hashPassword = await hash(password, 10);
        const user = await prisma.user.create({
            data:{
            name,
            email,
            password: hashPassword,
            }
        })
        return res.status(200).json({message:"Akun berhasil ditambahkan!"})
    }
    else{
        return res.status(405).json({message:"Kesalahan metode"});
    }

}