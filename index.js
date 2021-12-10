//@ts-check

const { chromium } = require('playwright');

const graphics = [
/*     {
        name: 'AMD Ryzen™ 5 5600G Processor',
        url: 'https://www.amd.com/en/direct-buy/5530312800/es'
    }, */
    {
        name: 'RX 6900 XT',
        url: 'https://www.amd.com/en/direct-buy/5458374200/es'
    },
    {
        name: 'RX 6800 XT',
        url: 'https://www.amd.com/en/direct-buy/5458374100/es'
    },
    {
        name: 'RX 6800',
        url: 'https://www.amd.com/en/direct-buy/5458374000/es'
    },
    {
        name: 'RX 6700 XT',
        url: 'https://www.amd.com/en/direct-buy/5496921400/es'
    },
    {
        name: 'RX 6800 XT Midnight Black Graphics Card',
        url: 'https://www.amd.com/en/direct-buy/5496921500/es'
    }
];

(async () => {
    const browser = await chromium.launch({ headless: false });

    for (const graphic of graphics) {
        const page = await browser.newPage();
        await page.goto(graphic.url);
        const content = await page.textContent('.product-page-description');
        if(content.includes("Add to cart")){
            console.log(`${graphic.name} TIENE STOCK!!!!`);
        }else{
            console.log(`No hay ${graphic.name}`);
        }
        await page.close();
    }
    await browser.close();
})();