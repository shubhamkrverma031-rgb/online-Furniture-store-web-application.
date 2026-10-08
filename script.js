// Simple JavaScript for CosyNest Furniture
// This code connects the HTML page to the actions the user does.

// 1) Find important HTML elements
const pages = document.querySelectorAll('.page'); // all page sections: home, store, cart, wallet
const navButtons = document.querySelectorAll('.nav-btn'); // all navigation buttons
const cartCount = document.getElementById('cartCount'); // cart number in header
const cartList = document.getElementById('cartList'); // cart items list
const cartTotal = document.getElementById('cartTotal'); // total price in cart
const walletBalance = document.getElementById('walletBalance'); // wallet balance text
const walletTop = document.getElementById('walletTop'); // wallet in header
const addAmount = document.getElementById('addAmount'); // amount input
const addMoneyBtn = document.getElementById('addMoneyBtn'); // add money button
const walletMessage = document.getElementById('walletMessage'); // wallet feedback message
const orderForm = document.getElementById('orderForm'); // order form
const orderMessage = document.getElementById('orderMessage'); // order feedback message
const payment = document.getElementById('payment'); // payment type dropdown

// 2) Create an empty cart and wallet
let cart = []; // stores all products added by user
let wallet = 0; // starts with Rs. 0

// 3) Function to hide all pages and show only the selected one
function showPage(pageId) {
  pages.forEach(function(page) {
    page.hidden = true; // hide every page
  });
  document.getElementById(pageId).hidden = false; // show chosen page
}

// 4) Update cart and wallet on the page
function updateUI() {
  let total = 0; // start total at 0

  // Add all product prices in cart
  cart.forEach(function(item) {
    total += Number(item.price);
  });

  // Update cart count and total price
  cartCount.textContent = cart.length;
  cartTotal.textContent = total;

  // Update wallet amounts in both places
  walletBalance.textContent = wallet;
  walletTop.textContent = wallet;

  // If cart is empty, show a message
  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }

  // If cart has items, clear the list and show them again
  cartList.innerHTML = '';
  cart.forEach(function(item, index) {
    const li = document.createElement('li');
    li.innerHTML = item.name + ' - Rs. ' + item.price + ' <button class="remove-btn" data-index="' + index + '">Remove</button>';
    cartList.appendChild(li);
  });

  // Add a click event to each Remove button
  document.querySelectorAll('.remove-btn').forEach(function(button) {
    button.addEventListener('click', function() {
      cart.splice(Number(button.getAttribute('data-index')), 1); // remove selected item
      updateUI(); // refresh the cart
    });
  });
}

// 5) Navigation buttons: when clicked, show that page
navButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    showPage(button.getAttribute('data-page'));
  });
});

// 6) Add to Cart buttons
document.querySelectorAll('.add-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const card = button.parentElement; // get the product card
    cart.push({
      name: card.getAttribute('data-name'),
      price: Number(card.getAttribute('data-price'))
    });
    updateUI(); // refresh totals and cart list
  });
});

// 7) Buy Now buttons: add product to cart and open cart page
document.querySelectorAll('.buy-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const card = button.parentElement;
    cart.push({
      name: card.getAttribute('data-name'),
      price: Number(card.getAttribute('data-price'))
    });
    updateUI();
    showPage('cart'); // open cart page
  });
});

// 8) Add money to wallet
addMoneyBtn.addEventListener('click', function() {
  const amount = Number(addAmount.value);

  if (amount > 0) {
    wallet += amount; // add money to wallet
    walletMessage.textContent = 'Money added successfully!';
    addAmount.value = ''; // clear input
    updateUI();
  } else {
    walletMessage.textContent = 'Please enter an amount greater than 0.';
  }
});

// 9) Place order when form is submitted
orderForm.addEventListener('submit', function(event) {
  event.preventDefault(); // stop page refresh

  // Check cart is not empty
  if (cart.length === 0) {
    orderMessage.textContent = 'Your cart is empty. Add a product first.';
    return;
  }

  // Check name and address fields are filled
  if (document.getElementById('custName').value.trim() === '' || document.getElementById('address').value.trim() === '') {
    orderMessage.textContent = 'Please fill in your name and address.';
    return;
  }

  // Calculate total price of cart items
  let total = 0;
  cart.forEach(function(item) {
    total += Number(item.price);
  });

  // If wallet payment is selected, check enough money
  if (payment.value === 'wallet') {
    if (wallet < total) {
      orderMessage.textContent = 'Not enough wallet money. Add more money or choose Cash on Delivery.';
      return;
    }
    wallet -= total; // subtract total from wallet
  }

  // Show success message and clear cart
  orderMessage.textContent = 'Order placed successfully!';
  cart = [];
  updateUI();
  orderForm.reset(); // clear form fields
});

// 10) Start the website on Home page
showPage('home');
updateUI();
