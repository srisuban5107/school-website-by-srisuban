/* ── Hamburger Menu Logic ── */
const hb = document.getElementById('hamburger'), mm = document.getElementById('mobileMenu');
hb.addEventListener('click', () => {
  hb.classList.toggle('open');
  mm.classList.toggle('open');
});
document.querySelectorAll('.mobile-nav-links a').forEach(a => a.addEventListener('click', () => {
  hb.classList.remove('open');
  mm.classList.remove('open');
}));

/* ── Category filtering Logic ── */
document.querySelectorAll('.cat-filter .cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-filter .cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.fac-grid .fac-card').forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      if (cat === 'all' || cardCat === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── FACILITIES DATA ARRAY ── */
const FACILITIES = [
  {
    id: 1,
    name: 'Science Lab',
    emoji: '🔬',
    bannerBg: 'bg-green',
    catBadge: '<span class="m-badge bc-lab">🔬 Lab</span>',
    desc: 'The Science Lab at S.S. Higher Secondary School is a fully equipped facility for hands-on experiments in Biology, Physics, and Chemistry. Students from Classes 9–12 use this lab for practicals and project work.',
    overview: [
      {key:'Location', val:'Ground Floor, Block A'},
      {key:'Capacity', val:'30 Students'},
      {key:'Available For', val:'Class 9 – 12'},
      {key:'Lab Type', val:'Combined Science'},
    ],
    highlights: [
      'Fully stocked with modern lab equipment',
      'Separate sections for Bio, Physics, Chemistry',
      'Safety equipment including fire extinguisher & first aid',
      'Lab practicals scheduled every week per class',
    ],
    teachers: [
      {emoji:'👩‍🔬', name:'Mrs. [Name Here]', role:'Science Lab Incharge', info:'M.Sc. Zoology · 14 Years Experience'},
      {emoji:'🧑‍🔬', name:'Mr. [Name Here]', role:'Lab Assistant', info:'B.Sc. · Handles equipment & chemical stock'},
    ],
    gallery: [
      {emoji:'🔬',label:'Microscope work'},{emoji:'⚗️',label:'Chemistry setup'},
      {emoji:'🧫',label:'Biology specimens'},{emoji:'📊',label:'Results board'},
      {emoji:'🧪',label:'Experiment day'},{emoji:'🏫',label:'Lab overview'},
    ],
    rules: [
      'Lab coat and gloves must be worn at all times.',
      'No food or drinks inside the lab.',
      'Handle chemicals only under teacher supervision.',
      'Report any breakage or accident immediately.',
      'Wash hands thoroughly before leaving the lab.',
      'Keep the lab clean and tidy at all times.',
    ],
    timings: [
      {day:'Monday – Friday', time:'8:30 AM – 4:00 PM'},
      {day:'Practical Sessions', time:'As per timetable'},
      {day:'Saturday', time:'Closed'},
    ],
    safetyTips: [
      'Never mix chemicals without instruction.',
      'Know the location of fire extinguisher and first aid box.',
      'Dispose of waste in designated containers.',
    ],
    equipment: [
      {icon:'🔬',name:'Microscopes',qty:'15 Units'},
      {icon:'⚗️',name:'Beakers & Flasks',qty:'50+ Sets'},
      {icon:'🌡️',name:'Thermometers',qty:'20 Units'},
      {icon:'🧪',name:'Test Tubes',qty:'100+'},
      {icon:'⚡',name:'Electrical Kit',qty:'10 Sets'},
      {icon:'🧬',name:'DNA Model',qty:'2 Units'},
      {icon:'🔭',name:'Telescope',qty:'1 Unit'},
      {icon:'📏',name:'Measuring Tools',qty:'30 Sets'},
    ],
  },
  {
    id: 2,
    name: 'Computer Lab',
    emoji: '💻',
    bannerBg: 'bg-blue',
    catBadge: '<span class="m-badge bc-lab">💻 Lab</span>',
    desc: 'The Computer Lab has 40 systems with high-speed internet connectivity. It is used for Computer Science practicals (Class 11–12) and IT classes for Class 6–10. The lab is equipped with a projector for screen sharing.',
    overview: [
      {key:'Systems', val:'40 Computers'},
      {key:'Internet', val:'Broadband (40 Mbps)'},
      {key:'Available For', val:'Class 6 – 12'},
      {key:'Software', val:'MS Office, Python, C++'},
    ],
    highlights: [
      '40 computers with Windows 10 and Linux dual-boot',
      'High-speed broadband internet connection',
      'Projector and screen for demonstrations',
      'Air-conditioned for comfortable learning',
    ],
    teachers: [
      {emoji:'👨‍💻', name:'Mr. [Name Here]', role:'CS Lab Incharge', info:'M.C.A. · Computer Science Teacher'},
    ],
    gallery: [
      {emoji:'💻',label:'Systems setup'},{emoji:'📡',label:'Network panel'},
      {emoji:'🖨️',label:'Printer station'},{emoji:'📽️',label:'Projector screen'},
      {emoji:'🧑‍💻',label:'Class in session'},{emoji:'🖥️',label:'Overview'},
    ],
    rules: [
      'Log in only with your assigned credentials.',
      'No downloading of unauthorized software.',
      'Do not eat or drink near computer systems.',
      'Shut down your system properly after use.',
      'Report any system fault to the incharge immediately.',
    ],
    timings: [
      {day:'Monday – Friday', time:'8:00 AM – 5:00 PM'},
      {day:'CS Practicals', time:'As per timetable'},
      {day:'Saturday', time:'9:00 AM – 12:00 PM'},
    ],
    safetyTips: [
      'Do not touch internal components of the computer.',
      'Use the system with clean, dry hands.',
      'Report electrical issues immediately.',
    ],
    equipment: [
      {icon:'🖥️',name:'Desktop Computers',qty:'40 Units'},
      {icon:'📽️',name:'Projector',qty:'1 Unit'},
      {icon:'🖨️',name:'Printers',qty:'2 Units'},
      {icon:'📡',name:'Router / Switch',qty:'2 Units'},
      {icon:'🔊',name:'Speakers',qty:'4 Units'},
      {icon:'❄️',name:'Air Conditioner',qty:'2 Units'},
    ],
  },
  {
    id: 3,
    name: 'Chemistry Lab',
    emoji: '⚗️',
    bannerBg: 'bg-teal',
    catBadge: '<span class="m-badge bc-lab">⚗️ Lab</span>',
    desc: 'A dedicated Chemistry Lab for Class 11–12 Bio-Maths and Computer Science students. Equipped with 80+ chemical reagents, fume hoods, and full safety gear. All practicals are conducted as per the Tamil Nadu State Board curriculum.',
    overview: [
      {key:'Location', val:'First Floor, Block B'},
      {key:'Capacity', val:'30 Students'},
      {key:'Available For', val:'Class 11 – 12'},
      {key:'Reagents', val:'80+ Chemicals'},
    ],
    highlights: [
      'Fume hood for safe handling of volatile chemicals',
      '80+ reagents stocked per State Board syllabus',
      'Safety goggles, gloves, and aprons provided',
      'Titration and organic chemistry setups available',
    ],
    teachers: [
      {emoji:'👩‍🔬', name:'Mrs. [Name Here]', role:'Chemistry Lab Incharge', info:'M.Sc. Chemistry · B.Ed. · 10 Years Experience'},
      {emoji:'🧑‍🔬', name:'Mr. [Name Here]', role:'Lab Assistant', info:'Handles chemical stock and equipment'},
    ],
    gallery: [
      {emoji:'⚗️',label:'Titration setup'},{emoji:'🔥',label:'Bunsen burner'},
      {emoji:'🧴',label:'Reagent shelf'},{emoji:'🕶️',label:'Safety gear'},
      {emoji:'📊',label:'Results board'},{emoji:'🧪',label:'Class practical'},
    ],
    rules: [
      'Wear safety goggles and lab apron at all times.',
      'Never smell or taste any chemical directly.',
      'Use fume hood when working with volatile chemicals.',
      'Label all containers clearly before use.',
      'Dispose of chemical waste in designated containers only.',
    ],
    timings: [
      {day:'Monday – Friday', time:'8:30 AM – 4:00 PM'},
      {day:'Practicals (11th)', time:'Tuesday & Thursday'},
      {day:'Practicals (12th)', time:'Monday & Wednesday'},
    ],
    safetyTips: [
      'Neutralize acid spills immediately with sodium bicarbonate.',
      'Know the eyewash station location.',
      'Never heat a closed container.',
    ],
    equipment: [
      {icon:'⚗️',name:'Conical Flasks',qty:'40 Units'},
      {icon:'🧪',name:'Burettes & Pipettes',qty:'30 Sets'},
      {icon:'🔥',name:'Bunsen Burners',qty:'15 Units'},
      {icon:'🕶️',name:'Safety Goggles',qty:'35 Pairs'},
      {icon:'🧴',name:'Chemical Reagents',qty:'80+ Types'},
      {icon:'💨',name:'Fume Hoods',qty:'2 Units'},
    ],
  },
  {
    id: 4,
    name: 'Library',
    emoji: '📚',
    bannerBg: 'bg-purple',
    catBadge: '<span class="m-badge bc-library">📚 Library</span>',
    desc: 'The School Library houses over 5,000 books covering all subjects, Tamil and English literature, reference materials, competitive exam guides, and magazines. A quiet reading area is available for students during free periods.',
    overview: [
      {key:'Total Books', val:'5,000+'},
      {key:'Magazines', val:'10 Subscriptions'},
      {key:'Newspapers', val:'3 Daily'},
      {key:'Reading Seats', val:'40 Students'},
    ],
    highlights: [
      'Books for all classes (6–12) and all subjects',
      'Tamil & English literature section',
      'Competitive exam guides (TNPSC, NEET, JEE)',
      'Quiet reading zone with comfortable seating',
    ],
    teachers: [
      {emoji:'👩‍💼', name:'Mrs. [Name Here]', role:'School Librarian', info:'B.Lib.Sc. · 8 Years Experience'},
    ],
    gallery: [
      {emoji:'📚',label:'Book shelves'},{emoji:'🪑',label:'Reading area'},
      {emoji:'📰',label:'Newspaper section'},{emoji:'🔖',label:'Issue counter'},
      {emoji:'📖',label:'Study area'},{emoji:'🏫',label:'Library overview'},
    ],
    rules: [
      'Maintain silence inside the library at all times.',
      'Books must be issued at the counter — no self-borrowing.',
      'Return books within 7 days to avoid fine.',
      'Handle books with clean hands. No writing or folding pages.',
      'No food or drinks allowed inside the library.',
    ],
    timings: [
      {day:'Monday – Friday', time:'8:00 AM – 5:00 PM'},
      {day:'Free Period Access', time:'As per schedule'},
      {day:'Saturday', time:'9:00 AM – 1:00 PM'},
    ],
    safetyTips: [
      'Report damaged books to the librarian immediately.',
      'Emergency exit is located near the reading area.',
    ],
    equipment: [
      {icon:'📚',name:'Books',qty:'5,000+'},
      {icon:'📰',name:'Magazines',qty:'10 Issues/month'},
      {icon:'📖',name:'Newspapers',qty:'3 Daily'},
      {icon:'🖥️',name:'Library Computer',qty:'1 System'},
      {icon:'🔦',name:'Reading Lamps',qty:'10 Units'},
      {icon:'📋',name:'Issue Register',qty:'Manual + Digital'},
    ],
  },
  {
    id: 5,
    name: 'Auditorium',
    emoji: '🏛️',
    bannerBg: 'bg-saffron',
    catBadge: '<span class="m-badge bc-hall">🎭 Hall</span>',
    desc: 'The School Auditorium seats 500 students and is used for Annual Day, prize distribution, cultural events, seminars, and parent meetings. It has a full stage setup with PA system, lighting, and backstage area.',
    overview: [
      {key:'Seating Capacity', val:'500'},
      {key:'Stage Size', val:'Large (with wings)'},
      {key:'PA System', val:'Yes — 8 Speakers'},
      {key:'Air Conditioned', val:'Yes (Partial)'},
    ],
    highlights: [
      '500-seat capacity with fixed seating',
      'Professional PA sound system',
      'Stage lighting and backdrop setup',
      'Backstage rooms for performers',
    ],
    teachers: [
      {emoji:'👨‍💼', name:'Mr. [Name Here]', role:'Auditorium Coordinator', info:'Handles event planning and bookings'},
    ],
    gallery: [
      {emoji:'🎤',label:'Stage setup'},{emoji:'🪑',label:'Seating area'},
      {emoji:'💡',label:'Stage lighting'},{emoji:'🔊',label:'PA system'},
      {emoji:'🎭',label:'Annual Day'},{emoji:'🏛️',label:'Overview'},
    ],
    rules: [
      'No entry without prior permission from the HM.',
      'Maintain cleanliness — no food or drinks.',
      'PA system to be operated only by authorized staff.',
      'All events must end by 6:00 PM.',
    ],
    timings: [
      {day:'Events & Programmes', time:'As per schedule'},
      {day:'Booking', time:'Prior approval from HM required'},
      {day:'Setup Time', time:'2 hours before event'},
    ],
    safetyTips: [
      'Emergency exits are at both sides of the stage.',
      'No open flames or fireworks inside.',
    ],
    equipment: [
      {icon:'🎤',name:'Microphones',qty:'6 Units'},
      {icon:'🔊',name:'Speakers',qty:'8 Units'},
      {icon:'💡',name:'Stage Lights',qty:'12 Units'},
      {icon:'📽️',name:'Projector',qty:'1 Unit'},
      {icon:'🎹',name:'Keyboard',qty:'1 Unit'},
      {icon:'🎚️',name:'Mixing Console',qty:'1 Unit'},
    ],
  },
  {
    id: 6,
    name: 'Playground',
    emoji: '⚽',
    bannerBg: 'bg-rose',
    catBadge: '<span class="m-badge bc-sports">⚽ Sports</span>',
    desc: 'A large open playground where students play cricket, football, kabaddi, throwball, and athletics. PE classes are held here daily. The ground also hosts inter-class tournaments and Sports Day events.',
    overview: [
      {key:'Ground Size', val:'~120m × 80m'},
      {key:'Sports Hosted', val:'6+ Games'},
      {key:'PE Classes', val:'Daily (Class-wise)'},
      {key:'Tournaments', val:'Inter-class & District'},
    ],
    highlights: [
      'Space for cricket, football, and kabaddi simultaneously',
      'Athletics track for running and field events',
      'Used for Sports Day and inter-school meets',
      'Separate area for girls games (throwball, kho-kho)',
    ],
    teachers: [
      {emoji:'👨‍🏫', name:'Mr. [Name Here]', role:'Physical Education Teacher (Boys)', info:'B.P.Ed. · 12 Years Experience'},
      {emoji:'👩‍🏫', name:'Mrs. [Name Here]', role:'Physical Education Teacher (Girls)', info:'B.P.Ed. · 8 Years Experience'},
    ],
    gallery: [
      {emoji:'⚽',label:'Football match'},{emoji:'🏏',label:'Cricket practice'},
      {emoji:'🏃',label:'Athletics'},{emoji:'🏆',label:'Sports Day'},
      {emoji:'🤸',label:'Warm-up session'},{emoji:'🌳',label:'Ground view'},
    ],
    rules: [
      'Students must wear PE uniform during sports periods.',
      'No rough play or fighting on the ground.',
      'Equipment must be returned to the sports room after use.',
      'Footwear must be worn on the ground.',
      'Students must listen to the PE teacher at all times.',
    ],
    timings: [
      {day:'PE Classes', time:'As per timetable'},
      {day:'Lunch Break', time:'12:30 PM – 1:15 PM'},
      {day:'After School', time:'4:00 PM – 5:30 PM'},
    ],
    safetyTips: [
      'Warm up before any physical activity.',
      'Stay hydrated — bring a water bottle.',
      'Report any injury to the PE teacher immediately.',
    ],
    equipment: [
      {icon:'⚽',name:'Footballs',qty:'6 Units'},
      {icon:'🏏',name:'Cricket Set',qty:'2 Sets'},
      {icon:'🏸',name:'Badminton Set',qty:'3 Sets'},
      {icon:'🏐',name:'Volleyballs',qty:'4 Units'},
      {icon:'🥅',name:'Goal Posts',qty:'2 Sets'},
      {icon:'🎽',name:'Team Jerseys',qty:'30 Sets'},
    ],
  },
  {
    id: 7,
    name: 'Sports Room',
    emoji: '🏸',
    bannerBg: 'bg-navy',
    catBadge: '<span class="m-badge bc-sports">🏸 Sports</span>',
    desc: 'The Sports Room is used for indoor games like carrom, chess, and table tennis. It also stores all outdoor sports equipment. Students can access it during breaks with permission from the PE teacher.',
    overview: [
      {key:'Indoor Games', val:'Carrom, Chess, TT'},
      {key:'Storage', val:'All outdoor equipment'},
      {key:'Access', val:'With PE teacher permission'},
      {key:'Capacity', val:'15 Students'},
    ],
    highlights: [
      'Table tennis table and carrom boards',
      'Chess sets and indoor game kits',
      'Outdoor sports equipment storage',
      'Open during lunch and after school',
    ],
    teachers: [
      {emoji:'👨‍🏫', name:'Mr. [Name Here]', role:'Sports Room Incharge', info:'Oversees indoor games and equipment'},
    ],
    gallery: [
      {emoji:'🏓',label:'Table tennis'},{emoji:'♟️',label:'Chess corner'},
      {emoji:'🎯',label:'Carrom board'},{emoji:'🎽',label:'Equipment shelf'},
      {emoji:'🏸',label:'Badminton'},{emoji:'🏫',label:'Room view'},
    ],
    rules: [
      'Return all equipment after use — no borrowing outside.',
      'Handle equipment with care.',
      'No running or shouting inside the sports room.',
      'Maximum 15 students allowed at one time.',
    ],
    timings: [
      {day:'Lunch Break', time:'12:30 PM – 1:15 PM'},
      {day:'After School', time:'4:00 PM – 5:30 PM'},
      {day:'Saturday', time:'Closed'},
    ],
    safetyTips: [],
    equipment: [
      {icon:'🏓',name:'TT Table',qty:'1 Unit'},
      {icon:'♟️',name:'Chess Sets',qty:'8 Sets'},
      {icon:'🎯',name:'Carrom Boards',qty:'4 Units'},
      {icon:'🏸',name:'Badminton Rackets',qty:'10 Pairs'},
      {icon:'🏐',name:'Indoor Balls',qty:'6 Units'},
      {icon:'🎽',name:'Equipment Store',qty:'Full stock'},
    ],
  },
  {
    id: 8,
    name: 'Smart Classrooms',
    emoji: '🏫',
    bannerBg: 'bg-gold',
    catBadge: '<span class="m-badge bc-other">🖥️ Smart</span>',
    desc: 'Select classrooms at S.S. Hr. Sec. School are equipped with digital projectors and smart boards for interactive learning. These classrooms enable teachers to use multimedia presentations, videos, and digital notes.',
    overview: [
      {key:'Smart Rooms', val:'4 Classrooms'},
      {key:'Projectors', val:'4 Units'},
      {key:'Smart Boards', val:'2 Units'},
      {key:'Internet', val:'Connected'},
    ],
    highlights: [
      '4 classrooms with ceiling-mounted projectors',
      '2 smart boards for interactive teaching',
      'Used for digital presentations and video lessons',
      'Connected to schools broadband internet',
    ],
    teachers: [
      {emoji:'👨‍💼', name:'Mr. [Name Here]', role:'ICT Coordinator', info:'Manages projectors and digital classroom setup'},
    ],
    gallery: [
      {emoji:'📽️',label:'Projector setup'},{emoji:'🖥️',label:'Smart board'},
      {emoji:'📊',label:'Class presentation'},{emoji:'💡',label:'Lighting'},
      {emoji:'🏫',label:'Class view'},{emoji:'📡',label:'Network point'},
    ],
    rules: [
      'Projector must be switched off after class.',
      'Do not touch the projector lens or smart board with bare hands.',
      'Report any technical issues to the ICT coordinator.',
      'Classroom must be left clean after each session.',
    ],
    timings: [
      {day:'Monday – Friday', time:'As per class schedule'},
      {day:'Booking Required', time:'For special sessions'},
      {day:'Saturday', time:'Closed'},
    ],
    safetyTips: [
      'Do not stare directly into the projector beam.',
      'Ensure power is fully off after use.',
    ],
    equipment: [
      {icon:'📽️',name:'Projectors',qty:'4 Units'},
      {icon:'🖥️',name:'Smart Boards',qty:'2 Units'},
      {icon:'📡',name:'Internet Points',qty:'4 Nodes'},
      {icon:'💻',name:'Teacher Laptop',qty:'2 Units'},
      {icon:'🔊',name:'Speakers',qty:'4 Sets'},
      {icon:'🎮',name:'Remote Control',qty:'4 Units'},
    ],
  }
];

/* ── Modal Rendering Controls ── */
function openFacility(id){
  const f = FACILITIES.find(x => x.id === id);
  if(!f) return;

  const banner = document.getElementById('mBanner');
  banner.className = 'modal-banner ' + f.bannerBg;

  const existingEmoji = banner.querySelector('.modal-banner-emoji');
  if(existingEmoji) existingEmoji.remove();
  
  const emojiDiv = document.createElement('div');
  emojiDiv.className = 'modal-banner-emoji';
  emojiDiv.textContent = f.emoji;
  banner.insertBefore(emojiDiv, banner.querySelector('.modal-banner-overlay'));

  document.getElementById('mName').textContent = f.name;
  document.getElementById('mBadges').innerHTML = f.catBadge;
  document.getElementById('mDesc').textContent = f.desc;
  
  document.getElementById('mOverviewGrid').innerHTML = f.overview.map(o => `
    <div class="ov-item">
      <div class="ov-key">${o.key}</div>
      <div class="ov-val">${o.val}</div>
    </div>
  `).join('');
  
  document.getElementById('mHighlights').innerHTML = f.highlights.map(h => `<li>${h}</li>`).join('');

  document.getElementById('mTeachers').innerHTML = f.teachers.length ? f.teachers.map(t => `
    <div class="t-card">
      <div class="t-avatar">${t.emoji}</div>
      <div>
        <div class="t-name">${t.name}</div>
        <div class="t-role">${t.role}</div>
        <div class="t-info">${t.info}</div>
      </div>
    </div>
  `).join('') : '<p style="color:var(--muted);font-size:14px;">No incharge assigned yet.</p>';

  document.getElementById('mGallery').innerHTML = f.gallery.map(g => `
    <div class="gm-item" title="${g.label}">${g.emoji}</div>
  `).join('');

  let infoHTML = '';
  if(f.rules.length){
    infoHTML += `<div class="info-section"><div class="info-section-title">📋 Lab / Facility Rules</div>
    <ul class="info-rule-list">${f.rules.map(r => `<li><span class="ri">📌</span>${r}</li>`).join('')}</ul></div>`;
  }
  if(f.timings.length){
    infoHTML += `<div class="info-section"><div class="info-section-title">🕐 Timings</div>
    <div class="timing-grid">${f.timings.map(t => `<div class="timing-item"><div class="timing-day">${t.day}</div><div class="timing-time">${t.time || ''}</div></div>`).join('')}</div></div>`;
  }
  if(f.safetyTips && f.safetyTips.length){
    infoHTML += `<div class="info-section"><div class="info-section-title">⚠️ Safety Tips</div>
    <ul class="info-rule-list">${f.safetyTips.map(s => `<li><span class="ri">⚠️</span>${s}</li>`).join('')}</ul></div>`;
  }
  document.getElementById('mInfo').innerHTML = infoHTML || '<p style="color:var(--muted);font-size:14px;">No information added yet.</p>';

  document.getElementById('mEquip').innerHTML = f.equipment.map(e => `
    <div class="equip-item">
      <div class="equip-icon">${e.icon}</div>
      <div class="equip-name">${e.name}</div>
      <div class="equip-qty">${e.qty}</div>
    </div>
  `).join('');

  document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-body .m-panel').forEach(p => p.classList.remove('active'));
  document.querySelector('.m-tab[data-tab="overview"]').classList.add('active');
  document.getElementById('tab-overview').classList.add('active');

  document.getElementById('modalBd').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* Modal Inner Tab Switching */
document.querySelectorAll('.m-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-body .m-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
  });
});

function closeModal(){
  document.getElementById('modalBd').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOutside(e){
  if(e.target === document.getElementById('modalBd')) closeModal();
}
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeModal();
});

/* Card Presentation Animation Trigger */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.style.animationPlayState = 'running' });
}, { threshold: 0.08 });

document.querySelectorAll('.fac-card').forEach((c, i) => {
  c.style.animationDelay = (i % 4) * 0.08 + 's';
  c.style.animationPlayState = 'paused';
  obs.observe(c);
});