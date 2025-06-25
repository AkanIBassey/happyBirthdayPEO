// scripts/view.js
const PASSWORD = "birthday2025";
let slideIndex = 0, intervalId = null, wishes = [];

document.getElementById("unlock").onclick = async () => {
  const entered = document.getElementById("password").value;
  if (entered !== PASSWORD) return document.getElementById("loginMsg").textContent = "Wrong password.";

  document.getElementById("login").classList.add("hidden");
  document.getElementById("slideshow").classList.remove("hidden");

  const snapshot = await db.collection("wishes").where("hidden", "!=", true).orderBy("timestamp", "asc").get();
  wishes = snapshot.docs.map(doc => doc.data());
  showSlide(0);
};

function showSlide(i) {
  const slide = wishes[i];
  const container = document.getElementById("slideContainer");
  container.innerHTML = `<h3>${slide.firstName} ${slide.surname || ""}</h3><p>${slide.message}</p>`;
  slide.mediaUrls.forEach(url => {
    const el = url.includes(".mp4") ? document.createElement("video") : document.createElement("img");
    el.src = url; if (el.tagName === "VIDEO") el.controls = true;
    container.appendChild(el);
  });
  slideIndex = i;
}

document.getElementById("prevBtn").onclick = () => showSlide((slideIndex - 1 + wishes.length) % wishes.length);
document.getElementById("nextBtn").onclick = () => showSlide((slideIndex + 1) % wishes.length);
document.getElementById("autoBtn").onclick = () => {
  const interval = parseInt(document.getElementById("intervalInput").value) * 1000;
  if (intervalId) { clearInterval(intervalId); intervalId = null; return; }
  intervalId = setInterval(() => showSlide((slideIndex + 1) % wishes.length), interval);
};