import nodemailer from 'nodemailer';

export const emailRegister = async (data) => {
    const { email, name, token } = data;
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //informacion del email
    const info = await transport.sendMail({
        from: '"Uptask -  Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirmacion de cuenta",
        text: 'Compueba tu cuenta para UpTask',
        html: `<p> Hola ${name} Compueba tu cuenta en upTask </P>
        <p>Tu cuenta esta casi liesta, solo compruebala haciendo clic en el siguiente enlace </p>
        <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Comprobar cuenta</a>

        <p>Si tu no fuiste quien registro la cuenta, ignora este mensage</p>
        `
    })
}

export const emailPassword = async (data) => {
    const { email, name, token } = data;
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    //informacion del email
    const info = await transport.sendMail({
        from: '"Uptask -  Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Restablece tu Passsword",
        text: 'Compueba tu cuenta para UpTask',
        html: `<p> Hola ${name} Has solicitado restablecer tu password </P>
        <p>Para restablecer haz clic en el siguiente enlace </p>
        <a href="${process.env.FRONTEND_URL}/restablecer-password/${token}">Comprobar cuenta</a>

        <p>Si tu no fuiste quien registro la cuenta, ignora este mensage</p>
        `
    })
}