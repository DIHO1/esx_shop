document.addEventListener('DOMContentLoaded', () => {
    // --- Elementy UI ---
    const shopContainer = document.getElementById('shop-container');
    const closeButton = document.querySelector('.close-button');
    const itemsGrid = document.querySelector('.items-grid');
    const categoryList = document.querySelector('.category-list');

    // --- Elementy Modala ---
    const quantityModal = document.getElementById('quantity-modal');
    const modalItemName = document.getElementById('modal-item-name');
    const quantityInput = document.getElementById('quantity-input');
    const confirmPurchaseBtn = document.getElementById('confirm-purchase');
    const cancelPurchaseBtn = document.getElementById('cancel-purchase');

    // --- Stan Aplikacji ---
    let allShopItems = [];
    let currentZone = null;
    let itemToBuy = null;
    let activeCategory = 'all';

    // --- Komunikacja z Lua ---
    window.addEventListener('message', (event) => {
        if (event.data.action === 'open') {
            shopContainer.style.display = 'flex';
            allShopItems = event.data.items;
            currentZone = event.data.zone;
            setupShop();
        }
    });

    const sendCloseNui = () => {
        fetch(`https://esx_shops/close`, { method: 'POST', body: '{}' })
            .catch(err => console.error('Error closing NUI:', err));
    };

    const sendBuyItem = (item, amount, zone) => {
        fetch(`https://esx_shops/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ item, amount, zone }),
        }).catch(err => console.error('Error buying item:', err));
    };

    // --- Logika Sklepu ---
    const setupShop = () => {
        populateCategories();
        filterItemsByCategory('all');
    };

    const populateCategories = () => {
        categoryList.innerHTML = '';
        const categories = ['all', ...new Set(allShopItems.map(item => item.category || 'other'))];

        categories.forEach(category => {
            const li = document.createElement('li');
            li.dataset.category = category;
            li.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            if (category === activeCategory) {
                li.classList.add('active');
            }
            categoryList.appendChild(li);
        });
    };

    const filterItemsByCategory = (category) => {
        activeCategory = category;

        // Aktualizuj aktywną kategorię w UI
        document.querySelectorAll('.category-list li').forEach(li => {
            li.classList.toggle('active', li.dataset.category === category);
        });

        const filteredItems = category === 'all'
            ? allShopItems
            : allShopItems.filter(item => (item.category || 'other') === category);

        populateItems(filteredItems);
    };

    const populateItems = (items) => {
        itemsGrid.innerHTML = '';
        if (!items || items.length === 0) {
            itemsGrid.innerHTML = '<p style="color: var(--text-secondary);">Brak przedmiotów w tej kategorii.</p>';
            return;
        }
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <div class="item-icon"><img src="nui://ox_inventory/web/images/${item.name}.png" alt="${item.label}" onerror="this.src='https://via.placeholder.com/64';"></div>
                <div class="item-name">${item.label}</div>
                <div class="item-price">$${item.price.toLocaleString()}</div>
                <button class="buy-button" data-item-name="${item.name}">KUP</button>
            `;
            itemsGrid.appendChild(itemElement);
        });
    };

    // --- Logika Modala ---
    const openQuantityModal = (item) => {
        itemToBuy = item;
        modalItemName.textContent = item.label;
        quantityInput.value = '1';
        quantityModal.style.display = 'flex';
        quantityInput.focus();
    };

    const closeQuantityModal = () => {
        quantityModal.style.display = 'none';
        itemToBuy = null;
    };

    const confirmPurchase = () => {
        const amount = parseInt(quantityInput.value, 10);
        if (itemToBuy && !isNaN(amount) && amount > 0) {
            sendBuyItem(itemToBuy.name, amount, currentZone);
        }
        closeQuantityModal();
    };

    // --- Event Listeners ---
    closeButton.addEventListener('click', () => {
        shopContainer.style.display = 'none';
        sendCloseNui();
    });

    categoryList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            filterItemsByCategory(event.target.dataset.category);
        }
    });

    itemsGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('buy-button')) {
            const itemName = event.target.dataset.itemName;
            const item = allShopItems.find(i => i.name === itemName);
            if (item) {
                openQuantityModal(item);
            }
        }
    });

    cancelPurchaseBtn.addEventListener('click', closeQuantityModal);
    confirmPurchaseBtn.addEventListener('click', confirmPurchase);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (quantityModal.style.display === 'flex') {
                closeQuantityModal();
            } else {
                shopContainer.style.display = 'none';
                sendCloseNui();
            }
        }
    });

    quantityInput.addEventListener('keydown', (e) => e.key === 'Enter' && confirmPurchase());
});
