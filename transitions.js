document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor (mouse-only devices)
  if (window.matchMedia('(pointer: fine)').matches) {
    const cat = document.createElement('div');
    cat.className = 'cursor-cat';
    const img = document.createElement('img');
    cat.appendChild(img);
    document.body.appendChild(cat);

    let isDown = false;

    function updateCursor() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      img.src = `assets/cinnaCursor${isDark ? 'White' : 'Black'}${isDown ? 2 : 1}.png`;
    }

    updateCursor();

    new MutationObserver(updateCursor).observe(document.documentElement, {
      attributes: true, attributeFilter: ['data-theme']
    });

    document.addEventListener('mousemove', e => {
      cat.style.left = (e.clientX - 2) + 'px';
      cat.style.top  = (e.clientY - 2) + 'px';
    });

    document.addEventListener('mouseover', e => {
      cat.classList.toggle('expanded', !!e.target.closest('a, button, [role="button"]'));
    });

    document.addEventListener('mousedown', () => { isDown = true;  updateCursor(); });
    document.addEventListener('mouseup',   () => { isDown = false; updateCursor(); });
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
