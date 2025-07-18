let currentIndex = 0;

const images = document.querySelectorAll(".image-container img");
const totalImages = images.length;

function showImage(index) {
  images.forEach((img, i) => {
    img.style.display = i === index ? "block" : "none";
  });
}

function Slide(direction) {
  currentIndex += direction;

  if (currentIndex >= totalImages) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  }

  showImage(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  showImage(currentIndex);
});
