//@ts-check

const { chromium } = require('playwright');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

//Cargo las variables de entorno
dotenv.config();

const graphics = [
    'RX 6900 XT Graphics',
    'RX 6800 XT Graphics',
    'RX 6800 Graphics',
    'RX 6700 XT Graphics',
    'RX 6800 XT Midnight Black',
    //'5950X Processor'
];

const myFunction =async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.amd.com/en/direct-buy/es');
    const elements = await page.$$('.direct-buy');
    
    let hasStock=false;
    for(const element of elements){
        const text = await element.innerText();
        graphics.forEach(graphic=>{
            if(text.includes(graphic) && !text.includes('Out of Stock')){
                hasStock=true;
                console.log(`${graphic} TIENE STOCK!!!!`);
                sendEmail(graphic);
            }
        });
    }
    if(!hasStock) console.log('\n Sigue buscando... 😢 \n' );
    await browser.close();
};

myFunction();

setInterval(() => {
    myFunction();
}, 600000);

function sendEmail(graphic) {
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
            subject: `HAY STOCK DE ${graphic} 😎` ,
            text: "https://www.amd.com/en/direct-buy/es",
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('Falló el envío del email');
                console.log(err);                
            }
            console.log(`Email enviado 📧`);
        });
    } catch (error) {
        console.log('Error enviando el email');
        console.log(error);
    }
}