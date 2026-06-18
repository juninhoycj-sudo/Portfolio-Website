document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor (mouse-only devices)
  if (window.matchMedia('(pointer: fine)').matches) {
    const cat = document.createElement('div');
    cat.className = 'cursor-cat';
    const img = document.createElement('img');
    img.src = 'popcat.png';
    cat.appendChild(img);
    document.body.appendChild(cat);

    document.addEventListener('mousemove', e => {
      cat.style.left = e.clientX + 'px';
      cat.style.top  = e.clientY + 'px';
    });

    document.addEventListener('mouseover', e => {
      cat.classList.toggle('expanded', !!e.target.closest('a, button, [role="button"]'));
    });

    document.addEventListener('mousedown', () => cat.classList.add('closed'));
    document.addEventListener('mouseup',   () => cat.classList.remove('closed'));
  }

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('#') ||
      link.target === '_blank'
    ) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => { window.location.href = href; }, 250);
    });
  });
});
