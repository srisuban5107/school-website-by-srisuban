/* ── Hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-nav-links a').forEach(a =>
    a.addEventListener('click', () => { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); })
  );

  /* ── Filter tabs ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const roleSections = document.querySelectorAll('.role-section');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      roleSections.forEach(sec => {
        if (filter === 'all' || sec.dataset.role === filter) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });
    });
  });

  /* ── Modal ── */
  function openModal(card) {
    const d = card.querySelector('.staff-data');
    const name        = d.dataset.name;
    const role        = d.dataset.role;
    const roleType    = d.dataset.roleType;
    const gender      = d.dataset.gender;
    const subjects    = d.dataset.subjects;
    const classTeacher= d.dataset.classTeacher;
    const experience  = d.dataset.experience;
    const qualification= d.dataset.qualification;
    const extra       = d.dataset.extra;
    const emoji       = d.dataset.photoEmoji;
    const photoSrc    = d.dataset.photoSrc;

    // Photo
    const modalImg   = document.getElementById('modalImg');
    const modalEmoji = document.getElementById('modalEmoji');
    if (photoSrc) {
      modalImg.src = photoSrc; modalImg.style.display = 'block';
      modalEmoji.style.display = 'none';
    } else {
      modalEmoji.textContent = emoji; modalEmoji.style.display = '';
      modalImg.style.display = 'none';
    }

    document.getElementById('modalName').textContent = name;

    // Role badge color
    const badge = document.getElementById('modalRoleBadge');
    badge.textContent = role;
    badge.className = 'modal-role-badge';
    if (roleType === 'hm') badge.style.cssText = 'background:rgba(245,185,78,.95);color:#0b1f3a;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;';
    else if (roleType === 'teacher') badge.style.cssText = 'background:rgba(17,45,78,.85);color:#f5b94e;border:1px solid rgba(245,185,78,.4);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;';
    else badge.style.cssText = 'background:rgba(107,114,128,.85);color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;';

    // Subject & class tags
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    if (subjects && subjects !== '—') {
      subjects.split(',').forEach(s => {
        const t = document.createElement('span');
        t.className = 'modal-tag tag-subject';
        t.textContent = '📚 ' + s.trim();
        tagsEl.appendChild(t);
      });
    }
    if (classTeacher && classTeacher !== '—') {
      const c = document.createElement('span');
      c.className = 'modal-tag tag-class';
      c.textContent = '🏷️ Class Teacher: ' + classTeacher;
      tagsEl.appendChild(c);
    }

    // Detail grid
    document.getElementById('modalDetails').innerHTML = `
      <div class="detail-item"><div class="detail-label">Gender</div><div class="detail-value">${gender}</div></div>
      <div class="detail-item"><div class="detail-label">Experience</div><div class="detail-value">${experience}</div></div>
      <div class="detail-item"><div class="detail-label">Qualification</div><div class="detail-value">${qualification}</div></div>
      <div class="detail-item"><div class="detail-label">Role</div><div class="detail-value">${role}</div></div>
    `;

    // Extra info
    const extraEl = document.getElementById('modalExtra');
    const extraText = document.getElementById('modalExtraText');
    if (extra && extra.trim() !== '' && extra !== 'Add extra info here.' && extra !== 'Add any extra information here — awards, achievements, message, etc.') {
      extraEl.style.display = 'block';
      extraText.textContent = extra;
    } else {
      extraEl.style.display = 'none';
    }

    document.getElementById('modalBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeModalOutside(e) {
    if (e.target === document.getElementById('modalBackdrop')) closeModal();
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });