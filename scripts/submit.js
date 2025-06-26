// scripts/submit.js
// const form = document.getElementById("wishForm");
const fileInput = document.getElementById("media");

const generateRandomID = () => Math.random().toString(36).substring(2, 10);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = form.firstName.value.trim();
  const surname = form.surname.value.trim();
  const message = form.message.value.trim();
  const files = fileInput.files;

  if (files.length > 5) {
    return alert("Maximum of 5 files allowed.");
  }

  let totalSize = 0;
  for (let file of files) totalSize += file.size;
  if (totalSize > 100 * 1024 * 1024) {
    return alert("Total file size must not exceed 100MB.");
  }

  const uploadPromises = [];
  for (let file of files) {
    const uniqueName = `${Date.now()}_${generateRandomID()}_${file.name}`;
    const fileRef = storage.ref(`uploads/${uniqueName}`);

    const uploadTask = fileRef.put(file).then((snap) => snap.ref.getDownloadURL());
  }

  try {
    const urls = await Promise.all(uploadPromises);
    await db.collection("wishes").add({
      firstName,
      surname,
      message,
      media: urls,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Wish submitted successfully!");
    form.reset();
  } catch (err) {
    console.error("Upload failed:", err);
    alert("There was an error uploading your wish.");
  }
});