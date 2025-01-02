document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".add-to-cart");

  cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");
      const productId = productCard.dataset.id;
      const productName = productCard.dataset.name;
      const productPrice = parseFloat(productCard.dataset.price);
      const productImage = productCard.querySelector("img").src;

      if (!productId || !productPrice) {
        alert("商品數據有誤，請稍後再試！");
        return;
      }

      // 從 LocalStorage 讀取購物車數據
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // 檢查是否已有該商品
      const existingItem = cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1; // 如果已存在，數量 +1
      } else {
        // 新增商品到購物車
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      // 更新 LocalStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // 顯示提示訊息
      const notification = document.getElementById("notification");
      notification.style.display = "block";
      setTimeout(() => {
        notification.style.display = "none";
      }, 2000);
    });
  });
});
