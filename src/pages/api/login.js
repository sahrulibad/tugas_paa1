import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

const JWT_SECRET = "abc";

export default async function handler (req, res){
    if (req.method === 'POST'){
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Email atau password salah!"});
        }
        const user = await prisma.user.findUnique({where: {email}});

        if(!user){
            return res.status(401).json({message: "Email atau password salah!"});
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({message:"Email atau password salah!"});
        }

        const token = sign ({userId: user.id}, JWT_SECRET, {expiresIn:'1h'});
        return res.status(200).json({token});
    }
    else{
        return res.status(405).json({message:'Kesalahan metode'});
    }
}