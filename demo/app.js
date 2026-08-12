const seedProducts = [
  {code:'000001',name:'Kırmızı Gül Buketi',price:950,stock:12,emoji:'🌹'},
  {code:'000002',name:'Beyaz Orkide',price:1250,stock:4,emoji:'🌸'},
  {code:'000003',name:'Papatya Buketi',price:650,stock:8,emoji:'🌼'},
  {code:'000004',name:'Pastel Aranjman',price:1100,stock:3,emoji:'💐'},
  {code:'000005',name:'Lilyum Buketi',price:890,stock:9,emoji:'🪷'},
  {code:'000006',name:'Sepet Çiçek',price:1450,stock:5,emoji:'🌺'}
];
let products = structuredClone(seedProducts), sales = [
  {no:'S-0001',product:'Kırmızı Gül Buketi',qty:1,total:950,payment:'Kart'},
  {no:'S-0002',product:'Papatya Buketi',qty:2,total:1300,payment:'Nakit'}
], notes=['Vitrindeki orkide stoklarını kontrol edin.'];
let selectedCode = '000001';
const money=n=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n);

function renderStore(){const g=document.querySelector('#productGrid');if(!g)return;g.innerHTML=products.map(p=>`<article class="product"><div class="product-image">${p.emoji}</div><h3>${p.name}</h3><div class="product-row"><strong>${money(p.price)}</strong><span class="stock ${p.stock<5?'low':''}">${p.stock?'Stokta':'Tükendi'}</span></div><p class="muted">Ürün kodu: ${p.code}</p></article>`).join('')}
function renderAdmin(){
  const pt=document.querySelector('#productsTable'); if(!pt)return;
  const q=(document.querySelector('#productSearch')?.value||'').toLocaleLowerCase('tr');
  pt.innerHTML=products.filter(p=>!q||p.name.toLocaleLowerCase('tr').includes(q)||p.code.includes(q)).map(p=>`<tr data-code="${p.code}" style="${p.code===selectedCode?'background:#f2f8f4':''}"><td>${p.code}</td><td>${p.name}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><span class="pill ${p.stock<5?'low':''}">${p.stock<5?'Kritik':'Normal'}</span></td><td><button class="button secondary select-product" data-code="${p.code}">Seç</button></td></tr>`).join('');
  document.querySelector('#salesTable').innerHTML=sales.map(s=>`<tr><td>${s.no}</td><td>${s.product}</td><td>${s.qty}</td><td>${money(s.total)}</td><td>${s.payment}</td></tr>`).join('');
  document.querySelector('#notesList').innerHTML=notes.map((n,i)=>`<div class="note"><strong>${i+1}.</strong> ${n}</div>`).join('');
  document.querySelector('#lowStockList').innerHTML=products.filter(p=>p.stock<5).map(p=>`<div class="note"><strong>${p.code} • ${p.name}</strong><div class="muted">Kalan stok: ${p.stock}</div></div>`).join('')||'<div class="muted">Kritik stok yok.</div>';
  document.querySelector('#kpiProducts').textContent=products.length;document.querySelector('#kpiStock').textContent=products.reduce((a,p)=>a+p.stock,0);document.querySelector('#kpiSales').textContent=sales.length;document.querySelector('#kpiRevenue').textContent=money(sales.reduce((a,s)=>a+s.total,0));
  document.querySelectorAll('.select-product').forEach(b=>b.onclick=()=>{selectedCode=b.dataset.code;renderAdmin()});
}
function setView(v){document.querySelectorAll('.view').forEach(x=>x.classList.add('hidden'));document.querySelector('#'+v+'View').classList.remove('hidden');document.querySelectorAll('.side-nav button[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===v));const names={dashboard:'Genel Bakış',products:'Ürünler',sales:'Satışlar',notes:'Notlar'};document.querySelector('#viewTitle').textContent=names[v]}
document.querySelectorAll('.side-nav button[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));
document.querySelector('#productSearch')?.addEventListener('input',renderAdmin);
document.querySelector('#addStockBtn')?.addEventListener('click',()=>{const p=products.find(p=>p.code===selectedCode);if(p){p.stock++;renderAdmin()}});
document.querySelector('#createSaleBtn')?.addEventListener('click',()=>{const p=products.find(p=>p.stock>0);if(!p)return alert('Satılabilir stok yok.');p.stock--;sales.unshift({no:'S-'+String(sales.length+1).padStart(4,'0'),product:p.name,qty:1,total:p.price,payment:sales.length%2?'Kart':'Nakit'});renderAdmin()});
document.querySelector('#addNoteBtn')?.addEventListener('click',()=>{const i=document.querySelector('#noteInput');if(i.value.trim()){notes.unshift(i.value.trim());i.value='';renderAdmin()}});
document.querySelector('#resetDemo')?.addEventListener('click',()=>{products=structuredClone(seedProducts);sales=[{no:'S-0001',product:'Kırmızı Gül Buketi',qty:1,total:950,payment:'Kart'},{no:'S-0002',product:'Papatya Buketi',qty:2,total:1300,payment:'Nakit'}];notes=['Vitrindeki orkide stoklarını kontrol edin.'];selectedCode='000001';renderAdmin()});
renderStore();renderAdmin();
