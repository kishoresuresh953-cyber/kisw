const products = [
  {
    id: 1,
    name: 'Smart Essentials Bundle',
    description: 'A premium starter kit for modern work, travel, and everyday productivity.',
    price: 149,
    icon: '🎒'
  },
  {
    id: 2,
    name: 'Wireless Focus Headset',
    description: 'Comfortable audio with long battery life for calls, study, and entertainment.',
    price: 89,
    icon: '🎧'
  },
  {
    id: 3,
    name: 'Desk Upgrade Kit',
    description: 'Organize your workspace with useful accessories customers love to reorder.',
    price: 64,
    icon: '💻'
  }
];

const cart = new Map();
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const productGrid = document.querySelector('#product-grid');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const subtotalEl = document.querySelector('#subtotal');
const shippingEl = document.querySelector('#shipping');
const totalEl = document.querySelector('#total');

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-image" aria-hidden="true">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-meta">
        <span class="product-price">${currency.format(product.price)}</span>
        <button class="button primary" type="button" data-product-id="${product.id}">Add to cart</button>
      </div>
    </article>
  `).join('');
}

function renderCart() {
  const cartEntries = [...cart.values()];
  const itemCount = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartEntries.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 100 ? 8 : 0;
  const total = subtotal + shipping;

  cartCount.textContent = itemCount;
  subtotalEl.textContent = currency.format(subtotal);
  shippingEl.textContent = shipping === 0 ? 'Free' : currency.format(shipping);
  totalEl.textContent = currency.format(total);

  cartItems.innerHTML = cartEntries.length
    ? cartEntries.map(item => `
      <div class="cart-item">
        <span>${item.name} × ${item.quantity}</span>
        <strong>${currency.format(item.price * item.quantity)}</strong>
      </div>
    `).join('')
    : '<p class="form-note">Your cart is empty. Add a product to begin checkout.</p>';
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const current = cart.get(productId) || { ...product, quantity: 0 };
  current.quantity += 1;
  cart.set(productId, current);
  renderCart();
}

productGrid.addEventListener('click', event => {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;
  addToCart(Number(button.dataset.productId));
});

document.querySelector('.checkout-form').addEventListener('submit', event => {
  event.preventDefault();
  alert('Demo order received! Connect a payment processor to take real payments.');
});

renderProducts();
renderCart();
