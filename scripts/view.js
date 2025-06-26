// scripts/view.js
const gallery = document.getElementById("gallery");
const password = prompt("Enter password to view wishes:");
const correctPassword = "my-secret-password"; // Change this!

if (password !== correctPassword) {
  alert("Incorrect password.");
  window.location.href = "index.html";
}

// Navigation support
let slides = [];
let currentSlide = 0;
let slideInterval = null;

const renderSlides = () => {
  gallery.innerHTML = "";

  slides.forEach((wish, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.display = index === currentSlide ? "block" : "none";

    const msg = document.createElement("p");
    msg.innerText = `${wish.firstName} ${wish.surname || ""}: ${wish.message}`;
    slide.appendChild(msg);

    wish.media.forEach((url) => {
      if (url.match(/\.(mp4|webm|ogg)$/)) {
        const video = document.createElement("video");
        video.src = url;
        video.controls = true;
        video.style.maxWidth = "100%";
        slide.appendChild(video);
      } else {
        const img = document.createElement("img");
        img.src = url;
        img.style.maxWidth = "100%";
        slide.appendChild(img);
      }
    });

    gallery.appendChild(slide);
  });
};

const showSlide = (n) => {
  slides[currentSlide].element.style.display = "none";
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].element.style.display = "block";
};

const startSlideshow = (interval = 3000) => {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => showSlide(currentSlide + 1), interval);
};

const stopSlideshow = () => {
  clearInterval(slideInterval);
};

document.getElementById("nextBtn").onclick = () => showSlide(currentSlide + 1);
document.getElementById("prevBtn").onclick = () => showSlide(currentSlide - 1);
document.getElementById("startSlideBtn").onclick = () => {
  const interval = parseInt(prompt("Slide interval in ms:", "3000"));
  if (!isNaN(interval)) startSlideshow(interval);
};
document.getElementById("stopSlideBtn").onclick = stopSlideshow;

// Fetch wishes
db.collection("wishes").orderBy("timestamp", "asc").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    slides.push(data);
  });
  renderSlides();
});