import Usuario from '../users/user.model.js';
import { hash, verify } from 'argon2';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {

    const { email, password, username } = req.body;

    try {

        const user = await Usuario.findOne({
            $or: [{ email }, { username }]
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Credenciales incorrectas, Correo no existe en la base de datos'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }

        const token = await generarJWT(user.id);

        return res.status(200).json({
            msg: 'Inicio de sesión exitoso!!',
            userDetails: {
                username: user.username,
                token: token,
                profilePicture: user.profilePicture
            }
        })

    } catch (e) {

        console.log(e);

        return res.status(500).json({
            message: "Server error",
            error: e.message
        })
    }
}