// 1. Custom Cursor Logic
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (animation in CSS)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// 2. Cursor Interaction with Bugs
const bugTargets = document.querySelectorAll('.bug-target');

bugTargets.forEach(bug => {
    bug.addEventListener('mouseenter', () => {
        document.body.classList.add('hover-bug'); // Triggers Crosshair CSS
    });
    bug.addEventListener('mouseleave', () => {
        document.body.classList.remove('hover-bug');
    });
});

// 3. Bug Kill Game Logic (Experience Section)
function killBug(element, contentId) {
    // A. Animate the bug "Death"
    element.classList.add('dead');

    // B. Reveal the Experience Content
    const content = document.getElementById(contentId);
    content.classList.remove('hidden');
    content.classList.add('slide-in');

    // Optional: Play a sound effect could go here
    console.log(`Bug ${contentId} squashed. Loading module...`);
}

// 4. Scroll Reveal (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add CSS class for fade-up
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-up elements (add .fade-up class in HTML to elements you want to animate on scroll)
document.querySelectorAll('.card, .bug-card').forEach(el => {
    el.classList.add('fade-in-scroll'); // Initial state
    observer.observe(el);
});
// Galaxy background bugs
const galaxy = document.querySelector(".galaxy-bg");

function spawnBgBug() {
  const bug = document.createElement("div");
  bug.className = "bg-bug";
  bug.textContent = "🐞";
  bug.style.left = Math.random() * 100 + "vw";
  bug.style.animationDuration = 6 + Math.random() * 6 + "s";

  galaxy.appendChild(bug);

  setTimeout(() => bug.remove(), 8000);
}

setInterval(spawnBgBug, 2000);
//photo
// 4D photo tilt
const photo = document.querySelector(".photo-4d img");

if (photo) {
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 25;
    const y = (window.innerHeight / 2 - e.clientY) / 25;

    photo.style.transform = `
      rotateY(${x}deg)
      rotateX(${y}deg)
      translateY(-10px)
    `;
  });
}

/* --- PROJECTS SECTION ANIMATIONS --- */

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const badge = card.querySelector('.status-badge');
    let isRunning = false; // Prevent multiple triggers at once

    // 1. "Test Execution" on HOVER
    card.addEventListener('mouseenter', () => {
        
        // If test is already running, do nothing
        if (isRunning) return;
        isRunning = true;

        // Step A: Set to "RUNNING" state
        badge.innerText = "⚙ RUNNING...";
        badge.style.color = "#f39c12"; // Orange
        badge.style.borderColor = "#f39c12";
        badge.style.background = "rgba(243, 156, 18, 0.1)";

        // Step B: Wait 0.6 seconds (Simulation time)
        setTimeout(() => {
            // Step C: Set to "PASS" state
            badge.innerText = "✔ PASS";
            
            // Revert styles to CSS defaults (Neon Green)
            badge.style.color = ""; 
            badge.style.borderColor = "";
            badge.style.background = "";

            // Optional: Green flash on the card border
            const originalBorder = card.style.borderColor;
            card.style.borderColor = "var(--accent-green)";
            setTimeout(() => {
                card.style.borderColor = originalBorder;
            }, 300);

            isRunning = false; // Allow re-run on next hover
        }, 600);
    });

    // 2. 3D Holographic Tilt Effect (Kept this for cool factor)
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt math
        const rotateX = ((y - centerY) / 15) * -1;
        const rotateY = (x - centerX) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Reset Tilt on leave
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});