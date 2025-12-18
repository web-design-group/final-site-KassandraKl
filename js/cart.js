
const PRODUCT_TYPE = 'product';
const MASTERCLASS_TYPE = 'masterclass';

const productsData = {
    1: {
        id: 1,
        name: 'серьги «синергия»',
        price: 4000,
        image: 'img/33-32.png',
        description: 'В этих серьгах рождается диалог между формой и движением...'
    },
    2: {
        id: 2,
        name: 'доспехи «сияние»',
        price: 15000,
        image: 'img/33-47.png',
        description: 'Эти доспехи для изящных дамских пальчиков создают сияние из глубин души...'
    },
    3: {
        id: 3,
        name: 'брошь «семья»',
        price: 8000,
        image: 'img/33-62.png',
        description: 'В этой работе мастера любовь прячется под крыльями летящих гусей...'
    },
    4: {
        id: 4,
        name: 'кольцо «двоеглавие»',
        price: 6500,
        image: 'img/33-107.png',
        description: 'Два трезубца, соединенные в серебряном сплаве...'
    },
    5: {
        id: 5,
        name: 'серьги «кокон»',
        price: 12000,
        image: 'img/33-92.png',
        description: 'Две птички, замершие в серебряных крыльях...'
    },
    6: {
        id: 6,
        name: 'кольцо «колорадо»',
        price: 9000,
        image: 'img/33-77.png',
        description: 'Это кольцо — встреча с удивительным...'
    },
    7: {
        id: 7,
        name: 'подсвечник «опора»',
        price: 11000,
        image: 'img/33-152.png',
        description: 'Плавные языки серебряного пламени застыли в вечном движении...'
    },
    8: {
        id: 8,
        name: 'зеркало «иллюзия»',
        price: 23000,
        image: 'img/33-137.png',
        description: 'В его отполированной поверхности живет дракон...'
    },
    9: {
        id: 9,
        name: 'набор «единение',
        price: 18500,
        image: 'img/33-122.png',
        description: 'Этот минималистичный набор из чистого серебра...'
    }
};

const masterclassesData = {
    101: {
        id: 101,
        type: MASTERCLASS_TYPE,
        name: 'Мастер-класс «Любовь, смерть и серебро»',
        price: 11000,
        image: 'img/mc1.png',
        description: 'Превратите ваши чувства в изящные серебряные украшения...',
        date: '08.02.2026'
    },
    102: {
        id: 102,
        type: MASTERCLASS_TYPE,
        name: 'Мастер-класс «Легенды и духи»',
        price: 9000,
        image: 'img/mc2.png',
        description: 'Погрузитесь в мир древних преданий и создайте свой собственный сакральный талисман...',
        date: '28.02.2026'
    },
    103: {
        id: 103,
        type: MASTERCLASS_TYPE,
        name: 'Мастер-класс «Страх поглощает смелость»',
        price: 7000,
        image: 'img/mc3.png',
        description: 'Этот мастер-класс стал невероятно популярным...',
        date: '18.02.2026'
    }
};

function getCart() {
    return JSON.parse(localStorage.getItem('lunarForgeCart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('lunarForgeCart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });

    const cartNavLinks = document.querySelectorAll('.nav-item[href="cart.html"], .nav-item[href="#"]');
    cartNavLinks.forEach(link => {
        if (link.textContent.includes('Корзина')) {
            link.innerHTML = `Корзина (<span id="cart-count">${totalItems}</span>)`;
        }
    });

    return totalItems;
}

function addToCart(productId, type = PRODUCT_TYPE) {
    let cart = getCart();

    let product;
    if (type === PRODUCT_TYPE) {
        product = productsData[productId];
    } else if (type === MASTERCLASS_TYPE) {
        product = masterclassesData[productId];
    }

    if (!product) {
        console.error('Товар не найден');
        return false;
    }

    const existingItemIndex = cart.findIndex(item =>
        item.id === productId && item.type === type
    );

    if (existingItemIndex !== -1) {

        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: productId,
            type: type,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            date: product.date || null
        });
    }


    saveCart(cart);
    showNotification(`${type === PRODUCT_TYPE ? 'Товар' : 'Билет'} ${product.name} добавлен в корзину!`);

    return true;
}


function showNotification(message) {

    let notification = document.getElementById('cart-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'cart-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #f3d06f;
            color: #2d1e8c;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
            z-index: 1000;
            font-family: 'Candara', sans-serif;
            font-size: 16px;
        `;
        document.body.appendChild(notification);
    }

    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    notification.style.transform = 'translateY(0)';
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
    }, 3000);
}


document.addEventListener('DOMContentLoaded', function () {

    updateCartCount();


    if (document.querySelector('.add-to-cart-btn')) {
        document.querySelectorAll('.add-to-cart-btn').forEach((button, index) => {

            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener('click', function (e) {
                e.preventDefault();
                const productId = index + 1; 
                addToCart(productId, PRODUCT_TYPE);
            });
        });
    }


    if (document.querySelector('.buy-ticket-btn')) {
        document.querySelectorAll('.buy-ticket-btn').forEach((button, index) => {

            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);


            newButton.addEventListener('click', function (e) {
                e.preventDefault();
                const masterclassId = 101 + index; 
                addToCart(masterclassId, MASTERCLASS_TYPE);
            });
        });
    }

});