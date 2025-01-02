function navigateToPage(option) {
    // 根據選擇的運送方式跳轉到不同頁面
    if (option === 'delivery') {
      window.location.href = 'delivery.html'; // 跳轉到宅配頁面
    } else if (option === 'store-pickup') {
      window.location.href = 'store-pickup.html'; // 跳轉到超商取貨頁面
    }
  }
  