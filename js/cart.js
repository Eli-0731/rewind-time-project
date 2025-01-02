document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const subtotalElement = document.querySelector(".cart-summary .summary-item:nth-child(1) span:nth-child(2)");
  const totalElement = document.querySelector(".cart-summary .total span:nth-child(2)");

  // 從 LocalStorage 讀取購物車數據
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>購物車是空的！</p>";
    subtotalElement.textContent = "$0";
    totalElement.textContent = "$0";
    return;
  }

  let subtotal = 0;

  // 渲染購物車商品
  cart.forEach((item, index) => {
    if (!item.price || !item.quantity) {
      console.error("商品數據不完整：", item);
      return;
    }

    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    // 動態生成商品
    itemElement.innerHTML = `
      <div class="cart-item-details">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div>
          <p>${item.name}</p>
          <p>單價: $${item.price.toFixed(2)}</p>
          <p>
            數量: 
            <input 
              type="number" 
              value="${item.quantity}" 
              min="1" 
              class="item-quantity" 
              data-index="${index}">
          </p>
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="cart-item-total" id="item-total-${index}">
          小計: $${(item.price * item.quantity).toFixed(2)}
        </div>
        <button class="remove-item-btn" data-index="${index}">移除</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);

    // 計算小計
    subtotal += item.price * item.quantity;
  });

  // 更新小計與總金額
  updateSubtotal(subtotal);

  // 添加事件監聽器以處理數量變更
  const quantityInputs = document.querySelectorAll(".item-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      const newQuantity = parseInt(e.target.value);

      if (newQuantity > 0) {
        // 更新購物車數據
        cart[index].quantity = newQuantity;

        // 更新小計
        const itemTotal = (cart[index].price * newQuantity).toFixed(2);
        document.getElementById(`item-total-${index}`).textContent = `小計: $${itemTotal}`;

        // 更新總金額
        const newSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        updateSubtotal(newSubtotal);

        // 更新 LocalStorage
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  });

  // 添加事件監聽器以處理移除商品
  const removeButtons = document.querySelectorAll(".remove-item-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;

      // 移除該商品
      cart.splice(index, 1);

      // 更新 LocalStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // 重新渲染購物車
      renderCart();
    });
  });

  function updateSubtotal(newSubtotal) {
    subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;
    totalElement.textContent = `$${newSubtotal.toFixed(2)}`;
  }

  function renderCart() {
    // 清空購物車容器並重新載入頁面
    cartItemsContainer.innerHTML = "";
    subtotalElement.textContent = "$0";
    totalElement.textContent = "$0";

    // 重新執行頁面渲染
    document.dispatchEvent(new Event("DOMContentLoaded"));
  }
});

