//@ts-check

const { chromium } = require('playwright');

const graphics = [
    'RX 6900 XT Graphics',
    'RX 6800 XT Graphics',
    'RX 6800 Graphics',
    'RX 6700 XT Graphics',
    'RX 6800 XT Midnight Black'
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
            }
        });
    }
    if(!hasStock) console.log('\n Sigue buscando... \n');
    await browser.close();
};

myFunction();

setInterval(() => {
    myFunction();
}, 600000);