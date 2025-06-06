document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = ;
            cartItemsList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotalSpan.textContent = total.toFixed(2);
    }

    displayCart();
});
