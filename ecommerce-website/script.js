document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.product-item button');
    const cartCountSpan = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    function updateCartCount() {
        let count = 0;
        cart.forEach(item => {
            count += item.quantity;
        });
        cartCountSpan.textContent = count;
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = parseFloat(productItem.querySelector('p').textContent.slice(1));

            const item = {
                name: productName,
                price: productPrice,
                quantity: 1
            };

            const existingItem = cart.find(cartItem => cartItem.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(item);
            }

            updateCart();
            alert();
        });
    });
});

// Update cart count on page load
window.addEventListener('load', () => {
    const cartCountSpan = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });
    cartCountSpan.textContent = count;
});
