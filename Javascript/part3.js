
document.addEventListener('DOMContentLoaded', () => {
  // Accordion
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      if (panel) panel.hidden = expanded;
    });
  });

  // Modal
  const openPromo = document.getElementById('openPromo');
  const promoModal = document.getElementById('promoModal');
  if (openPromo && promoModal) {
    const closeBtn = promoModal.querySelector('.modal-close');
    function show(){ promoModal.hidden=false; promoModal.setAttribute('aria-hidden','false'); }
    function hide(){ promoModal.hidden=true; promoModal.setAttribute('aria-hidden','true'); }
    openPromo.addEventListener('click', show);
    closeBtn.addEventListener('click', hide);
    promoModal.addEventListener('click', e => { if (e.target===promoModal) hide(); });
    document.addEventListener('keydown', e => { if (e.key==='Escape') hide(); });
  }

  // Lightbox for gallery
  const lb = document.getElementById('lightbox');
  const lbImg = lb ? lb.querySelector('img') : null;
  document.querySelectorAll('.gallery-thumb').forEach(img => {
    img.addEventListener('click', () => {
      if (!lb || !lbImg) return;
      lbImg.src = img.dataset.large || img.src;
      lbImg.alt = img.alt || '';
      lb.hidden = false;
    });
  });
  if (lb) {
    lb.addEventListener('click', e => { if (e.target === lb) lb.hidden = true; });
    const close = lb.querySelector('#lbClose');
    if (close) close.addEventListener('click', ()=> lb.hidden = true);
  }

  // Dynamic products loader if products.json exists
  const prodContainer = document.getElementById('products');
  const searchInput = document.getElementById('searchInput');
  if (prodContainer) {
    fetch('Javascript/products.json').then(r=>r.json()).then(items=>{
      function render(list){
        prodContainer.innerHTML = list.map(p=>`<article class="product"><img src="${p.img}" alt="${p.title}" loading="lazy"><h3>${p.title}</h3><p>$${p.price.toFixed(2)}</p></article>`).join('');
      }
      render(items);
      if (searchInput) {
        searchInput.addEventListener('input', ()=> {
          const q=searchInput.value.trim().toLowerCase();
          render(items.filter(i=> i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)));
        });
      }
    }).catch(err=>console.log('No products.json or failed to load',err));
  }

  // Enhance contact/enquiry forms: nicer inline errors and mailto compile for contact form
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
      }
      if (form.id === 'contactForm') {
        e.preventDefault();
        const fd = new FormData(form);
        const to = 'office@example.org';
        const subject = encodeURIComponent('Website contact: ' + fd.get('subject'));
        const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\nMessage:\n${fd.get('message')}`);
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      }
    });
  });

  // Basic Leaflet map init if #map present
  if (document.getElementById('map')) {
    try {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = ()=> {
        const L = window.L;
        const map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);
        L.marker([51.505, -0.09]).addTo(map).bindPopup('Our Roastery').openPopup();
      };
      document.head.appendChild(script);
      const link = document.createElement('link'); link.rel='stylesheet'; link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(link);
    } catch(e){ console.log('Leaflet init failed',e); }
  }

});
