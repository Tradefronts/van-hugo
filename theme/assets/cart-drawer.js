document.addEventListener("DOMContentLoaded", function () {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  const panel = document.getElementById("cartPanel");
  const closeBtn = document.getElementById("closeCartDrawer");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const openBtn = document.getElementById("openCartDrawer");
  const openBtnMobile = document.getElementById("openCartDrawerMobile");

  /* ================= OPEN / CLOSE ================= */
  window.openDrawer = function () {
    loadCart();
    drawer.classList.remove("hidden");
    document.body.classList.add("overflow-hidden"); // 🔒 lock page scroll

    setTimeout(() => {
      overlay.classList.remove("opacity-0");
      panel.classList.remove("translate-x-full");
    }, 10);
  };

  function closeDrawer() {
    overlay.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    document.body.classList.remove("overflow-hidden"); // 🔓 unlock page scroll

    setTimeout(() => {
      drawer.classList.add("hidden");
    }, 300);
  }

  if (openBtn) openBtn.addEventListener("click", openDrawer);
  if (openBtnMobile) openBtnMobile.addEventListener("click", openDrawer);

  overlay.addEventListener("click", closeDrawer);
  closeBtn.addEventListener("click", closeDrawer);

  /* ================= LOAD CART ================= */

  function loadCart() {
    fetch("/cart.js")
      .then((res) => res.json())
      .then((cart) => {
        updateCartCount(cart.item_count);

        if (cart.items.length === 0) {
          cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
          cartSubtotal.textContent = "₹0";
          return;
        }

        cartItemsContainer.innerHTML = "";

        cart.items.forEach((item) => {
          cartItemsContainer.innerHTML += `
    <div class="flex gap-4 py-4 border-b border-gray-200 cart-item" data-key="${item.key}">

      <!-- Product Image -->
      <div class="w-20 h-24 flex-shrink-0 overflow-hidden rounded">
        ${
          item.image
            ? `<img 
                src="${item.image}" 
                alt="${item.product_title}"
                class="w-full h-full object-cover rounded"
                loading="lazy"
              >`
            : ""
        }
      </div>

      <!-- Product Info -->
      <div class="flex-1 flex flex-col justify-between">

        <div>
          <p class="font-medium text-sm leading-tight">
            ${item.product_title}
          </p>

          ${
            item.variant_title
              ? `<p class="text-xs text-gray-500 mt-1">${item.variant_title}</p>`
              : ""
          }
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="flex items-center space-x-2 rounded-lg border border-gray-400 ">
            <button class="decrease border-r  border-gray-400 px-2 py-0.5">-</button>
            <input type="number" class="quantity w-8 appearance-none outline-none text-center " value="${item.quantity}" min="1">
            <button class="increase border-l border-gray-400 px-2 py-0.5">+</button>
          </div>
          <p class="text-sm font-semibold item-price">    
        ₹${(item.line_price / 100).toLocaleString()}
          </p>

        </div>

      </div>
    </div>
    `;
        });

        cartSubtotal.textContent =
          "₹" + (cart.total_price / 100).toLocaleString();
      });
  }

  function updateCartCount(count) {
    const desktop = document.getElementById("cartCount");
    const mobile = document.getElementById("cartCountMobile");

    if (desktop) desktop.textContent = count;
    if (mobile) mobile.textContent = count;
  }

  cartItemsContainer.addEventListener("click", function (e) {
    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;

    const key = cartItem.dataset.key;
    const input = cartItem.querySelector(".quantity");
    const priceEl = cartItem.querySelector(".item-price"); // we will add this
    let currentQty = parseInt(input.value);

    // INCREASE
    if (e.target.classList.contains("increase")) {
      updateQuantityUI(key, currentQty + 1, input, priceEl);
    }

    // DECREASE
    if (e.target.classList.contains("decrease")) {
      if (currentQty > 1) {
        updateQuantityUI(key, currentQty - 1, input, priceEl);
      }
    }
  });

  function updateCart(key, quantity, inputEl) {
    fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: key, quantity: quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Find updated item from response
        const updatedItem = data.items.find((i) => i.key === key);

        // Use server quantity (real one)
        inputEl.value = updatedItem.quantity;

        cartSubtotal.textContent =
          "₹" + (data.total_price / 100).toLocaleString();

        updateCartCount(data.item_count);
      })
      .catch((err) => console.error("Error updating cart:", err));
  }
});
