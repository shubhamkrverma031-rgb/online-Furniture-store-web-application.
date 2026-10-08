// The IDs below must match the bag elements with the same IDs in index.html.
const bag = []; // Store each product added to the shopping bag.
const count = document.querySelector("#cartCount"); // Find the HTML counter to display bag size.
const panel = document.querySelector("#cartPanel"); // Find the bag panel to open and close it.
const items = document.querySelector("#cartItems"); // Find the list where bag products appear.
const total = document.querySelector("#cartTotal"); // Find the element that displays the subtotal.
const message = document.querySelector("#cartMessage"); // Find the element that displays cart feedback.

function renderBag() { // Refresh the cart display after a change.
  count.textContent = bag.length; // Show how many products are in the bag.
  items.replaceChildren(); // Clear old rows before drawing current products.
  bag.forEach((item, index) => { // Create one visible row for each product.
    const row = document.createElement("li"); // Make a list item for this product.
    row.append(`${item.name} — Rs. ${item.price.toLocaleString("en-IN")} `); // Show its name and formatted price.
    const remove = document.createElement("button"); // Make a button to remove this product.
    remove.textContent = "Remove"; // Give the remove button its visible label.
    remove.setAttribute("aria-label", `Remove ${item.name}`); // Explain the button to screen readers.
    remove.addEventListener("click", () => { bag.splice(index, 1); renderBag(); }); // Remove the item and refresh the bag.
    row.append(remove); // Put the remove button in the product row.
    items.append(row); // Put the completed row in the bag list.
  }); // Finish drawing every product.
  const sum = bag.reduce((value, item) => value + item.price, 0); // Add all product prices together.
  total.textContent = `Rs. ${sum.toLocaleString("en-IN")}`; // Show the formatted subtotal.
  message.textContent = bag.length ? "" : "Your bag is waiting for something lovely."; // Show a message when the bag is empty.
} // Finish refreshing the cart display.

// .add-button selects HTML controls; .product data fields provide each item's details.
document.querySelectorAll(".add-button").forEach((button) => { // Find every product's Add to Bag button.
  button.addEventListener("click", () => { // Run this code when a shopper clicks a button.
    const product = button.closest(".product"); // Find the product card containing the clicked button.
    bag.push({ name: product.dataset.name, price: Number(product.dataset.price) }); // Copy product details into the bag.
    renderBag(); // Update the visible count, list, and subtotal.
    button.textContent = "Added ✓"; // Briefly confirm that the product was added.
    setTimeout(() => { button.textContent = "Add to bag +"; }, 1000); // Restore the original button label after a second.
  }); // Finish the click action for this product.
}); // Finish connecting all Add to Bag buttons.

// These HTML IDs connect the header, close, and checkout buttons to their actions.
document.querySelector("#cartToggle").addEventListener("click", () => { panel.hidden = false; }); // Open the bag from the header.
document.querySelector("#closeCart").addEventListener("click", () => { panel.hidden = true; }); // Close the bag with its close button.
document.querySelector("#checkout").addEventListener("click", () => { // Respond when checkout is selected.
  if (!bag.length) { message.textContent = "Add a piece to your bag before checkout."; return; } // Explain if checkout has no products.
  message.textContent = "Thank you! Your demo order is confirmed."; // Show demo checkout confirmation.
  bag.length = 0; // Empty all products from the bag after checkout.
  renderBag(); // Update the counter, list and subtotal to show an empty bag.
  message.textContent = "Thank you! Your demo order is confirmed."; // Keep the confirmation visible after the refresh.
}); // Finish the checkout click action.
document.addEventListener("keydown", (event) => { // Listen for keyboard keys across the page.
  if (event.key === "Escape") panel.hidden = true; // Close the bag when Escape is pressed.
}); // Finish the keyboard listener.
renderBag(); // Draw the initial empty bag when the page loads.
