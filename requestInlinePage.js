//@ts-check

const { chromium } = require('playwright');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

//Cargo las variables de entorno
dotenv.config();

const myFunction = async () => {
    const browser = await chromium.launch({ chromiumSandbox: false });
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://inline.amd.com/',{timeout:120000});
        const error404 = await page.$$("#error-code");
        if (error404.length===0) {
            console.log(`${new Date().toLocaleTimeString()} - BINGO!!! 😎`);
            sendEmail();
        }else{
            console.log(`${new Date().toLocaleTimeString()} - Sigue buscando... 😢 \n`);
        }
        await browser.close();
    } catch (error) {
        console.log('Error cargando la web de AMD');
        console.log(error);
        await browser.close();
    }
};

myFunction();

setInterval(() => {
    myFunction();
}, 600000);

function sendEmail() {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SEND_EMAIL_FROM,
                pass: process.env.PWD_SEND_EMAIL_FROM,
            },
        });

        const mailOptions = {
            to: process.env.EMAIL_TO,
            subject: `https://inline.amd.com/ está viva!!!! 😎`,
            text: "https://inline.amd.com/",
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Falló el envío del email');
                console.log(err);
                return;
            }
            console.log(`Email enviado 📧`);
        });
    } catch (error) {
        console.log('Error enviando el email');
        console.log(error);
    }
}