// Simple tabbed menu and local order pad

const menuContainer = document.getElementById("menu-items");
const tabs = document.querySelectorAll(".menu-tab");
const orderList = document.getElementById("order-list");
const orderEmpty = document.getElementById("order-empty");
const orderTotalEl = document.getElementById("order-total");
const copyBtn = document.getElementById("copy-order");
const checkoutBtn = document.getElementById("generate-checkout");
const checkoutOutput = document.getElementById("checkout-output");
const cartToggle = document.getElementById("cart-toggle");
const cartDrawer = document.getElementById("cart-drawer");
const cartClose = document.getElementById("cart-close");
const cartList = document.getElementById("cart-list");
const cartEmpty = document.getElementById("cart-empty");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartTaxEl = document.getElementById("cart-tax");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const cartToCheckoutBtn = document.getElementById("cart-to-checkout");

let order = [];
let cart = [];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function renderMenu(categoryKey) {
  const category = MENU_DATA[categoryKey];
  if (!category) return;

  menuContainer.innerHTML = "";

  const header = document.createElement("div");
  const title = document.createElement("h3");
  title.className = "menu-section-title";
  title.textContent = category.title;
  const subtitle = document.createElement("p");
  subtitle.className = "menu-section-subtitle";
  subtitle.textContent = category.subtitle;

  header.appendChild(title);
  header.appendChild(subtitle);
  menuContainer.appendChild(header);

  category.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "menu-item";

    const main = document.createElement("div");
    main.className = "menu-item-main";

    const name = document.createElement("p");
    name.className = "menu-item-name";
    name.textContent = item.name;

    const desc = document.createElement("p");
    desc.className = "menu-item-desc";
    desc.textContent = item.description;

    main.appendChild(name);
    main.appendChild(desc);

    const meta = document.createElement("div");
    meta.className = "menu-item-meta";

    item.prices.forEach((p, index) => {
      const priceLine = document.createElement("div");
      priceLine.className = "menu-item-price";
      priceLine.textContent = formatPrice(p.price);

      const sizeLine = document.createElement("div");
      sizeLine.className = "menu-item-size";
      sizeLine.textContent = p.size;

      const addBtn = document.createElement("button");
      addBtn.className = "add-btn";
      addBtn.textContent = index === 0 ? "Add" : "Add";
      addBtn.addEventListener("click", () => {
        addToOrder({ id: item.id + "-" + p.size, name: `${item.name} (${p.size})`, price: p.price, category: category.title });
      });

      const group = document.createElement("div");
      group.style.display = "flex";
      group.style.flexDirection = "column";
      group.style.alignItems = "flex-end";
      group.style.gap = "0.15rem";
      group.appendChild(priceLine);
      group.appendChild(sizeLine);
      group.appendChild(addBtn);

      meta.appendChild(group);
    });

    row.appendChild(main);
    row.appendChild(meta);

    menuContainer.appendChild(row);
  });
}

function addToOrder(item) {
  order.push(item);
  addToCart(item);
  renderOrder();
}

function removeFromOrder(index) {
  const removed = order.splice(index, 1)[0];
  if (removed) {
    // remove one matching cart entry if present
    const cartIndex = cart.findIndex((c) => c.id === removed.id && c.price === removed.price);
    if (cartIndex !== -1) {
      if (cart[cartIndex].qty > 1) {
        cart[cartIndex].qty -= 1;
      } else {
        cart.splice(cartIndex, 1);
      }
    }
    renderCart();
  }
  renderOrder();
}

function addToCart(item) {
  const existing = cart.find((c) => c.id === item.id && c.price === item.price);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

function updateCartQty(index, delta) {
  const entry = cart[index];
  if (!entry) return;
  entry.qty += delta;
  if (entry.qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartSubtotalEl.textContent = "$0.00";
    cartTaxEl.textContent = "$0.00";
    cartTotalEl.textContent = "$0.00";
    cartCountEl.textContent = "0";
    return;
  }

  cartEmpty.style.display = "none";

  let subtotal = 0;
  let count = 0;

  cart.forEach((entry, index) => {
    subtotal += entry.price * entry.qty;
    count += entry.qty;

    const li = document.createElement("li");
    li.className = "cart-item";

    const main = document.createElement("div");
    main.className = "cart-item-main";

    const name = document.createElement("span");
    name.className = "cart-item-name";
    name.textContent = entry.name;

    const meta = document.createElement("span");
    meta.className = "cart-item-meta";
    meta.textContent = entry.category;

    main.appendChild(name);
    main.appendChild(meta);

    const right = document.createElement("div");
    right.className = "cart-item-controls";

    const minus = document.createElement("button");
    minus.className = "qty-btn";
    minus.textContent = "-";
    minus.addEventListener("click", () => updateCartQty(index, -1));

    const qty = document.createElement("span");
    qty.className = "cart-item-qty";
    qty.textContent = entry.qty;

    const plus = document.createElement("button");
    plus.className = "qty-btn";
    plus.textContent = "+";
    plus.addEventListener("click", () => updateCartQty(index, +1));

    const price = document.createElement("span");
    price.className = "cart-item-price";
    price.textContent = formatPrice(entry.price * entry.qty);

    const remove = document.createElement("button");
    remove.className = "cart-remove";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => removeCartItem(index));

    right.appendChild(minus);
    right.appendChild(qty);
    right.appendChild(plus);
    right.appendChild(price);
    right.appendChild(remove);

    li.appendChild(main);
    li.appendChild(right);

    cartList.appendChild(li);
  });

  const tax = subtotal * 0.0625;
  const total = subtotal + tax;

  cartSubtotalEl.textContent = formatPrice(subtotal);
  cartTaxEl.textContent = formatPrice(tax);
  cartTotalEl.textContent = formatPrice(total);
  cartCountEl.textContent = String(count);
}

function renderOrder() {
  orderList.innerHTML = "";

  if (order.length === 0) {
    orderEmpty.style.display = "block";
    orderTotalEl.textContent = "$0.00";
    return;
  }

  orderEmpty.style.display = "none";

  let total = 0;

  order.forEach((item, index) => {
    total += item.price;

    const row = document.createElement("li");
    row.className = "order-item-row";

    const main = document.createElement("div");
    main.className = "order-item-main";

    const name = document.createElement("span");
    name.className = "order-item-name";
    name.textContent = item.name;

    const meta = document.createElement("span");
    meta.className = "order-item-meta";
    meta.textContent = item.category;

    main.appendChild(name);
    main.appendChild(meta);

    const price = document.createElement("span");
    price.className = "order-item-price";
    price.textContent = formatPrice(item.price);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromOrder(index));

    row.appendChild(main);
    row.appendChild(price);
    row.appendChild(removeBtn);

    orderList.appendChild(row);
  });

  orderTotalEl.textContent = formatPrice(total);
}

function buildOrderText(includeCustomer = false) {
  const lines = ["Royal Pizza order:"];

  order.forEach((item) => {
    lines.push(`- ${item.name} — ${formatPrice(item.price)}`);
  });

  lines.push(`Total (approx.): ${orderTotalEl.textContent}`);

  if (includeCustomer) {
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const pickup = document.getElementById("pickup-time").value.trim();
    const notes = document.getElementById("order-notes").value.trim();

    lines.push("");
    lines.push("Pickup details:");
    lines.push(`Name: ${name || "Not provided"}`);
    lines.push(`Phone: ${phone || "Not provided"}`);
    lines.push(`Pickup time: ${pickup || "ASAP"}`);
    lines.push(`Notes: ${notes || "None"}`);
    lines.push("");
    lines.push("This summary does not place a live order. Call the restaurant to confirm.");
  }

  return lines.join("\n");
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}

function copyOrderSummary() {
  if (order.length === 0) return;
  copyText(buildOrderText(false));
}

function generateCheckoutSummary() {
  if (cart.length === 0) {
    checkoutOutput.textContent = "Add items to your cart first, then generate your order summary.";
    return;
  }

  const text = buildOrderText(true);
  checkoutOutput.textContent = text;
  copyText(text);
}

function openCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  if (!cartDrawer) return;
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

// Tab wiring
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const key = tab.getAttribute("data-category");
    renderMenu(key);
  });
});

copyBtn.addEventListener("click", copyOrderSummary);
checkoutBtn.addEventListener("click", generateCheckoutSummary);

cartToggle.addEventListener("click", () => {
  if (cartDrawer.classList.contains("open")) {
    closeCart();
  } else {
    openCart();
  }
});

cartClose.addEventListener("click", closeCart);
cartToCheckoutBtn.addEventListener("click", () => {
  closeCart();
  const section = document.getElementById("checkout");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
});

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) {
    closeCart();
  }
});

// Initial render
renderMenu("pizza");
renderCart();
