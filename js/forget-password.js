// 驗證電子郵件格式的函數
function validateEmail() {
    const emailInput = document.getElementById('email'); // 取得輸入的電子郵件欄位
    const alertModal = document.getElementById('alert-modal'); // 取得錯誤提示彈窗元素
    const successModal = document.getElementById('success-modal'); // 取得成功提示彈窗元素
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 電子郵件格式的正則表達式

    if (!emailRegex.test(emailInput.value.trim())) {
        // 如果輸入格式不正確，顯示錯誤提示彈窗
        alertModal.style.display = 'flex';
    } else {
        // 如果格式正確，顯示成功提示彈窗
        successModal.style.display = 'flex';
    }
}

// 關閉主彈窗的函數
function closeModal() {
    const modal = document.querySelector('.modal'); // 取得主彈窗元素
    modal.style.display = 'none'; // 將主彈窗隱藏
}

// 關閉錯誤提示彈窗的函數
function closeAlert() {
    const alertModal = document.getElementById('alert-modal'); // 取得錯誤提示彈窗元素
    alertModal.style.display = 'none'; // 將錯誤提示彈窗隱藏
}

// 關閉成功提示彈窗的函數
function closeSuccess() {
    const successModal = document.getElementById('success-modal'); // 取得成功提示彈窗元素
    successModal.style.display = 'none'; // 將成功提示彈窗隱藏
}



  
  
  
  
  
  