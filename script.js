// Navigation and page transitions
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const target = link.getAttribute('href').replace('#', '');
    pages.forEach(page => {
      if (page.id === target) {
        page.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        page.classList.remove('active');
      // Futuristic animated background (moving particles/lines)
      const canvas = document.getElementById('bg-canvas');
      const ctx = canvas.getContext('2d');
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const particles = [];
      const PARTICLE_COUNT = 48;
      const COLORS = ['#0a74da', '#00e0ff', '#fff', '#b2f7ff'];

      function randomBetween(a, b) { return a + Math.random() * (b - a); }

      function createParticle() {
        const angle = randomBetween(0, 2 * Math.PI);
        const speed = randomBetween(0.2, 1.2);
        return {
          x: randomBetween(0, width),
          y: randomBetween(0, height),
          r: randomBetween(1.5, 3.5),
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
      }

      function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12;
          ctx.globalAlpha = 0.7;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          // Draw lines to nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dist = Math.hypot(p.x - q.x, p.y - q.y);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = p.color + '33';
              ctx.lineWidth = 1;
              ctx.globalAlpha = 0.18;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      function updateParticles() {
        for (const p of particles) {
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0 || p.x > width) p.dx *= -1;
          if (p.y < 0 || p.y > height) p.dy *= -1;
        }
      }

      function animateBg() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animateBg);
      }

      function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }

      window.addEventListener('resize', resizeCanvas);

      // Initialize particles
      if (canvas && ctx) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push(createParticle());
        }
        animateBg();
      }
      }
    });
  });
});

// Modal for join team
const joinLink = document.getElementById('joinTeam');
const joinModal = document.getElementById('joinModal');
const closeModal = document.getElementById('closeModal');
if (joinLink && joinModal && closeModal) {
  joinLink.onclick = () => joinModal.style.display = 'flex';
  closeModal.onclick = () => joinModal.style.display = 'none';
  window.onclick = e => { if (e.target === joinModal) joinModal.style.display = 'none'; };
}

// Contact form submission (using EmailJS for client-side email)
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;
  const subject = encodeURIComponent('Contact Form Submission from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@MotarenEv.in&su=${subject}&body=${body}`;
  window.open(gmailUrl, '_blank');
});

// Scroll-based animation for sections
window.addEventListener('scroll', () => {
  document.querySelectorAll('.page').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
});
