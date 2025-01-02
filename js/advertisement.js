document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const indicators = document.querySelectorAll(".indicator");
  
    let currentIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
  
    function updateSlide(index) {
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === index);
      });
    }
  
    function autoPlay() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide(currentIndex);
    }
  
    // 手動切換
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateSlide(currentIndex);
        clearInterval(autoPlayInterval); // 清除自動播放計時器
        autoPlayInterval = setInterval(autoPlay, 5000); // 重新啟動
      });
    });
  
    // 自動播放
    let autoPlayInterval = setInterval(autoPlay, 5000); // 每 5 秒切換
  });
  