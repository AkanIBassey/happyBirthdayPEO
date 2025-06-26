const form = document.getElementById('wishForm');
const fileInput = document.getElementById('mediaFiles');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData();
  data.append('first_name', form.firstName.value);
  data.append('surname', form.surname.value);
  data.append('message', form.message.value);
  Array.from(fileInput.files).slice(0,5).forEach((file, i) => data.append('media', file));

  try {
    const resp = await fetch('https://<your-domain>.pythonanywhere.com/api/wishes/', {
      method: 'POST',
      body: data
    });
    if (!resp.ok) throw new Error('Submit failed');
    document.getElementById('status').textContent = 'Thank you!';
    form.reset();
  } catch (err) {
    console.error(err);
    alert('Error submitting your wish.');
  }
});