// scripts/admin.js
document.getElementById("signInBtn").onclick = async () => {
  try {
    await auth.signInWithEmailAndPassword(
      document.getElementById("email").value,
      document.getElementById("pw").value
    );
    document.getElementById("auth").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadPosts();
  } catch (e) {
    document.getElementById("authMsg").textContent = e.message;
  }
};

async function loadPosts() {
  const snapshot = await db.collection("wishes").orderBy("timestamp", "desc").get();
  const list = document.getElementById("postsList");
  list.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.firstName} ${data.surname || ""}</strong>: ${data.message} 
      <button onclick="deletePost('${doc.id}')">Delete</button>
      <button onclick="toggleVisibility('${doc.id}', ${!data.hidden})">${data.hidden ? "Unhide" : "Hide"}</button>
    `;
    list.appendChild(li);
  });
}

async function deletePost(id) {
  await db.collection("wishes").doc(id).delete();
  loadPosts();
}

async function toggleVisibility(id, hidden) {
  await db.collection("wishes").doc(id).update({ hidden });
  loadPosts();
}