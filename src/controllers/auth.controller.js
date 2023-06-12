import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import  {createAccesToken} from '../libs/jwt.js'

export const register = async(req, res) => {
    
    const { username, email, password } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10) //encriptamos la contraseña

        const newUser = new User({
            username,
            email,
            password: passwordHash //pasamos la contraseña encriptada 
        })
        const userSaved = await newUser.save() //Guardo el usuario en la db
        const token = await createAccesToken({id: userSaved._id});
        res.cookie('token', token)
        
        res.json({      //esto es lo que me va a devolver cuando hago el post (lo que le mando al front)
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
    
    } catch (error) {
        console.log(error)
    }
};


export const login = (req, res) => {
    res.send('Login')
 
};
