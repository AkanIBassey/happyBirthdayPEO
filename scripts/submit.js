// scripts/submit.js
document.getElementById("wishForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = e.target.firstName.value.trim();
  const surname = e.target.surname.value.trim();
  const message = e.target.message.value.trim();
  const files = document.getElementById("mediaFiles").files;

  if (files.length > 5) return alert("You can upload up to 5 files only.");
  let totalSize = 0;
  for (let f of files) totalSize += f.size;
  if (totalSize > 100 * 1024 * 1024) return alert("Total file size must not exceed 100MB.");

  const mediaUrls = [];
  for (let file of files) {
    const ref = storage.ref().child(`uploads/${Date.now()}_${file.name}`);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    mediaUrls.push(url);
  }

  await db.collection("wishes").add({
    firstName,
    surname,
    message,
    mediaUrls,
    timestamp: Date.now(),
    hidden: false
  });

  document.getElementById("status").textContent = "Thank you for your submission!";
  e.target.reset();
});