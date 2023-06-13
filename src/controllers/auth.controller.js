import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import  {createAccesToken} from '../libs/jwt.js'

export const register = async(req, res) => {
    
    const { username, email, password } = req.body;

    try {
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(['The email already exists'])

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
        res.status(500).json({message: error.message})
    }
};


export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, userFound.password); //comparamos la contraseña que viene con la del usuario

        if(!isMatch) return res.status(400).json({message: 'Incorrect password'});
       
       
        const token = await createAccesToken({id: userFound._id});
        res.cookie('token', token);
        
        res.json({      //esto es lo que me va a devolver cuando hago el post (lo que le mando al front)
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    
    } catch (error) {
        res.status(500).json({message: error.message})
    }
 
};


export const logout = ( req, res ) => {

    res.cookie('token', '', {  // Formateo el token a '' 
        expires: new Date(0)
    })
    return res.sendStatus(200)
};

export const profile = async( req,res ) => {
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({message: 'User not found'})

    res.json({      
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}
