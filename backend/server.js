const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'iboxxrogi@gmail.com',
        pass: 'elhx deau snbs yobh' // Substitua pela senha de aplicativo do Gmail
    }
});

app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    console.log("Dados recebidos:", { name, email, message });

    const mailOptions = {
        from: email,
        to: 'iboxxrogi@gmail.com',
        subject: 'Enviando email com nodemailer',
        html: `
            <h1>Olá, Desenvolvedor Igor!</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Mensagem:</strong> ${message}</p>
        `,
        text: `Nome: ${name}\nE-mail: ${email}\nMensagem: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar e-mail:", error);
            return res.status(500).json({ success: false, message: 'Erro ao enviar o e-mail!', error: error.message });
        }
        console.log("E-mail enviado com sucesso:", info.response);
        res.json({ success: true, message: 'E-mail enviado com sucesso!' });
    });
}); // Fechamento do app.post

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});