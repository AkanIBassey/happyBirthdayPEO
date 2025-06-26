// admin.js
const loginBtn=document.getElementById('loginBtn');
loginBtn.onclick=async()=>{
  const res=await fetch('https://<your-domain>.pythonanywhere.com/api/token/',{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:document.getElementById('user').value,password:document.getElementById('pass').value})
  });
  if(!res.ok)return alert('Login failed');
  const {access}=await res.json();
  localStorage.setItem('token',access);
  load();
};
async function load(){
  document.getElementById('loginSec').style.display='none';
  const res=await fetch('https://<your-domain>.pythonanywhere.com/api/wishes/',{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
  const wishes=await res.json();
  const c=document.getElementById('posts');
  wishes.forEach(w=>{
    const d=document.createElement('div'); d.innerHTML=`<p>${w.first_name}: ${w.message}</p><button data-id='${w.id}'>Delete</button>`;
    d.querySelector('button').onclick=async()=>{await fetch(`https://<your-domain>.pythonanywhere.com/api/wishes/${w.id}/`,{method:'DELETE',headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});load();};
    c.appendChild(d);
  });
}