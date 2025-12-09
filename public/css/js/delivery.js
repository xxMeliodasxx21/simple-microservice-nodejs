const cart = [];
let total = 0;

function addToCart(id, name, price) {
    cart.push({id,name,price});
    total += price;
    renderCart();
}

function renderCart() {
    const cartEl = document.getElementById('cart');
    cartEl.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartEl.appendChild(li);
    });
    document.getElementById('total').textContent = total;
}

document.getElementById('orderForm').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    formData.items = cart;

    const res = await fetch('/delivery/order', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formData)
    });

    alert(await res.text());
    cart.length = 0;
    total = 0;
    renderCart();
    e.target.reset();
});
