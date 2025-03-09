const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:5500', // Ajuste para a URL do seu front-end
    methods: ['GET', 'POST'],
    credentials: true
}));

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'iboxxrogi@gmail.com', // Seu e-mail do Gmail
        pass: 'elhx deau snbs yobh' // Senha de aplicativo do Gmail
    }
});

// Rota para a raiz (GET)
app.get('/', (req, res) => {
    res.send('Back-end está funcionando!');
});

// Rota para enviar e-mail (POST)
app.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    console.log("Dados recebidos:", { name, email, message });

    const mailOptions = {
        from: email,
        to: 'iboxxrogi@gmail.com', // E-mail do destinatário
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
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});