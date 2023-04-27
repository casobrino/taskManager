import User from "../models/User.js";
import genetareId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailRegister, emailPassword } from '../helpers/email.js'

const register = async (req, res) => {
    try {
        //evitar registro duplicado
        const { email } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            const error = new Error('This user has been registered already');
            return res.status(400).json({ msg: error.message })
        }

        //si no existe el mismo correo duplicado
        const user = new User(req.body) //crea en la base de datos el nuevo usuario
        user.token = genetareId();
        await user.save();

        //enviar email de confirmacion
        emailRegister({
            email: user.email,
            name: user.name,
            token: user.token
        })
        res.json({
            msg: "Usuario creado, revisa tu email para verificar"
        })
    } catch (error) {
        console.log(error);
    }
}

const autenticate = async (req, res) => {
    const { email, password } = req.body;

    //comprobar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error(`The user dosn't exist`);
        return res.status(404).json({ msg: error.message })
    }

    //comprobar si el usuario esta confirmado
    if (!user.confirm) {
        const error = new Error(`The user is not comfirmed, you can confirm in your email inbox`);
        return res.status(403).json({ msg: error.message })
    }
    // confirmar el password
    if (await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        });
    } else {
        const error = new Error(`Password missmatch`);
        return res.status(403).json({ msg: error.message });
    }
}

const confirm = async (req, res) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({ token });
    if (!userConfirm) {
        const error = new Error(`Invalid token`);
        return res.status(403).json({ msg: error.message });
    }
    try {
        userConfirm.confirm = true;
        userConfirm.token = '';
        await userConfirm.save();
        res.json({
            msg: 'User confirmed!'
        })
    } catch (error) {
        console.log(error);

    }
}
const resetPassword = async (req, res) => {
    const { email } = req.body;
    //comprobar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error(`The user dosn't exist`);
        return res.status(404).json({ msg: error.message })
    }

    try {
        user.token = genetareId();
        await user.save();
        res.json({
            msg: "confirm your email"
        })

        emailPassword({
            email: user.email,
            name: user.name,
            token: user.token
        })

    } catch (error) {
        console.log(error.message);

    }
}
const checkToken = async (req, res) => {
    const { token } = req.params;
    const validToken = await User.findOne({ token });
    if (validToken) {
        res.json({
            msg: 'Token valido y el usuario existe'
        })
    } else {
        const error = new Error(`Invalid token`);
        return res.status(404).json({ msg: error.message })
    }
    //return res.send({msg: 'finalizado checktoken'})
}
const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });
    if (user) {
        user.password = password;
        user.token = '';
        try {
            await user.save()
            res.json({
                msg: 'Password chanchged'
            })
        } catch (error) {
            console.log(error.message);
        }
    } else {
        const error = new Error(`Invalid token`);
        return res.status(404).json({ msg: error.message })
    }
}

const perfil = async (req, res) => {
    const { user } = req
    res.json(user)

}

export {
    register,
    autenticate,
    confirm,
    resetPassword,
    checkToken,
    newPassword,
    perfil
};