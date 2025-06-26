// scripts/admin.js
const loginForm = document.getElementById("loginForm");
const wishList = document.getElementById("wishList");

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("adminSection").style.display = "block";
    loadWishes();
  } else {
    document.getElementById("authSection").style.display = "block";
    document.getElementById("adminSection").style.display = "none";
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => loginForm.reset())
    .catch((error) => alert("Login failed: " + error.message));
});

const loadWishes = () => {
  wishList.innerHTML = "";
  db.collection("wishes").orderBy("timestamp", "asc").get().then((snap) => {
    snap.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${data.firstName} ${data.surname || ""}</strong>: ${data.message}</p>
        ${data.media.map(url => url.endsWith(".mp4") ?
          `<video src="${url}" controls style="max-width:100%"></video>` :
          `<img src="${url}" style="max-width:100%"/>`).join("")}
        <button onclick="deleteWish('${doc.id}', ${JSON.stringify(data.media)})">Delete</button>
      `;
      wishList.appendChild(div);
    });
  });
};

function deleteWish(id, urls) {
  if (!confirm("Delete this wish and its media?")) return;

  const deletePromises = urls.map((url) => {
    try {
      const ref = storage.refFromURL(url);
      return ref.delete();
    } catch {
      return Promise.resolve(); // fallback if refFromURL fails
    }
  });

  Promise.all(deletePromises).then(() =>
    db.collection("wishes").doc(id).delete()
  ).then(() => {
    alert("Wish deleted.");
    loadWishes();
  }).catch((err) => {
    console.error("Deletion error:", err);
    alert("Error deleting wish.");
  });
}