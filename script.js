// Simple tabbed menu and local order pad

const menuContainer = document.getElementById("menu-items");
const tabs = document.querySelectorAll(".menu-tab");
const orderList = document.getElementById("order-list");
const orderEmpty = document.getElementById("order-empty");
const orderTotalEl = document.getElementById("order-total");
const copyBtn = document.getElementById("copy-order");
const checkoutBtn = document.getElementById("generate-checkout");
const checkoutOutput = document.getElementById("checkout-output");

let order = [];

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
  renderOrder();
}

function removeFromOrder(index) {
  order.splice(index, 1);
  renderOrder();
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
  if (order.length === 0) {
    checkoutOutput.textContent = "Add menu items first, then generate your order summary.";
    return;
  }

  const text = buildOrderText(true);
  checkoutOutput.textContent = text;
  copyText(text);
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

// Initial render
renderMenu("pizza");
