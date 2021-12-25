# Para conseguir una tarjeta gráfica AMD a un precio razonable

Es una locura los precios de las tarjetas gráficas, están al doble y triple de su precio las pocas unidades que salen a la venta, es por ello que me he creado este *scrapper*.

En este proyecto voy a usar [Playwright](https://playwright.dev/)

Los desarrolladores de *Puppeteer* se fueron de Google a Microsoft y han creado Playwright partiendo de cero y corrigiendo algunos errores de concepción de Puppeteer.

## ¿Qué fichero usar?
Usa el fichero requestInlinePage.js, me acabo de enterar que cuando AMD habilita la URL https://inline.amd.com/ es para que te apuntes a la cola para la compra.

El fichero requestOnePage.js lo que hace es ver si en la página https://www.amd.com/en/direct-buy/es las gráficas tienen stock.

El fichero requestSeveralPages.js lo que hace es ver si hay stock en la página de la tarjeta que deseas comprar.