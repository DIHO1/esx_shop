import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        html_path = os.path.abspath('html/index.html')
        await page.goto(f'file://{html_path}')

        # Ta funkcja zostanie wykonana w kontekście strony
        await page.evaluate("""() => {
            // 1. Odtwórz strukturę HTML, którą tworzy script.js
            const container = document.createElement('div');
            container.id = 'shop-container';
            container.innerHTML = `
                <div class="shop-header">
                    <h2>SKLEP</h2>
                    <button class="close-button">&times;</button>
                </div>
                <div class="shop-body">
                    <div class="items-grid"></div>
                </div>
            `;
            document.body.appendChild(container);

            // 2. Symuluj dane, które normalnie przyszłyby z Lua
            const items = [
                { name: 'water', label: 'Woda', price: 15 },
                { name: 'bread', label: 'Chleb', price: 25 },
                { name: 'burger', label: 'Burger', price: 50 },
                { name: 'tunerchip', label: 'Chip tuningowy', price: 50000 },
                { name: 'fixkit', label: 'Zestaw naprawczy', price: 1500 },
                { name: 'medikit', label: 'Apteczka', price: 250 },
                { name: 'radio', label: 'Radio', price: 400 },
                { name: 'phone', label: 'Telefon', price: 800 },
                { name: 'lockpick', label: 'Wytrych', price: 300 },
                { name: 'armor', label: 'Kamizelka', price: 1000 }
            ];

            const itemsGrid = document.querySelector('.items-grid');
            itemsGrid.innerHTML = ''; // Wyczyść

            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item';
                itemElement.innerHTML = `
                    <div class="item-icon">
                        <img src="https://via.placeholder.com/64" alt="${item.label}">
                    </div>
                    <div class="item-name">${item.label}</div>
                    <div class="item-price">$${item.price.toLocaleString()}</div>
                    <button class="buy-button">KUP</button>
                `;
                itemsGrid.appendChild(itemElement);
            });

            // 3. Pokaż kontener
            container.style.display = 'flex';
        }""")

        await page.wait_for_selector('.item')
        await page.screenshot(path='jules-scratch/verification/verification.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
