// document.addEventListener('DOMContentLoaded', () => {

//     // Custom Dazzling Cursor Logic & Sparks
//     const cursorDot = document.getElementById('cursor-dot');
//     const cursorOutline = document.getElementById('cursor-outline');

//     let lastSparkTime = 0;
//     const sparkColors = ['var(--accent-blue)', 'var(--accent-purple)', 'var(--accent-pink)', '#ffffff'];

//     window.addEventListener('mousemove', (e) => {
//         const posX = e.clientX;
//         const posY = e.clientY;

//         // Update dot position instantly
//         cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;

//         // Update outline position (transition delay in CSS creates the trailing effect)
//         cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;

//         // Create electric sparks on move
//         const now = Date.now();
//         if (now - lastSparkTime > 35) { // Spawn rate limit
//             createSpark(posX, posY);
//             lastSparkTime = now;
//         }
//     });

//     function createSpark(x, y) {
//         const spark = document.createElement('div');
//         spark.classList.add('spark');

//         // Randomize color
//         const color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
//         spark.style.backgroundColor = color;
//         spark.style.boxShadow = `0 0 8px ${color}, 0 0 15px #ffffff`;

//         // Randomize direction and distance
//         const angle = Math.random() * Math.PI * 2;
//         const distance = Math.random() * 50 + 20; // 20px to 70px travel
//         const tx = Math.cos(angle) * distance;
//         const ty = Math.sin(angle) * distance;

//         spark.style.left = `${x}px`;
//         spark.style.top = `${y}px`;
//         spark.style.setProperty('--tx', `${tx}px`);
//         spark.style.setProperty('--ty', `${ty}px`);

//         // Rotate spark line to point towards travel direction
//         const rotation = (angle * 180 / Math.PI) + 90;
//         spark.style.transform = `rotate(${rotation}deg)`;
//         spark.style.setProperty('--rot', `${rotation}deg`);

//         document.body.appendChild(spark);

//         // Cleanup spark
//         setTimeout(() => {
//             spark.remove();
//         }, 400);
//     }

//     // Add hover effects to clickable elements
//     const clickables = document.querySelectorAll('a, button, .btn, .nav-link, .mobile-menu-btn');
//     clickables.forEach(el => {
//         el.addEventListener('mouseenter', () => {
//             document.body.classList.add('cursor-hover');
//         });
//         el.addEventListener('mouseleave', () => {
//             document.body.classList.remove('cursor-hover');
//         });
//     });

// });
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let particles = [];
    let mouse = { x: 0, y: 0 };
    let lastSpawn = 0;

    window.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        const now = performance.now();

        if (now - lastSpawn > 10) {
            for (let i = 0; i < 4; i++) {
                spawnSpark(mouse.x, mouse.y);
            }
            lastSpawn = now;
        }
    });

    window.addEventListener("touchmove", e => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;

            const now = performance.now();

            // Mobile optimized spawn rate
            if (now - lastSpawn > 15) {
                for (let i = 0; i < 3; i++) {
                    spawnSpark(mouse.x, mouse.y);
                }
                lastSpawn = now;
            }
        }
    }, { passive: true });

    function spawnSpark(x, y) {

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 40,
            size: Math.random() * 2 + 1,
            color: randomColor()
        });

    }

    function randomColor() {
        const colors = [
            "#00f0ff",
            "#8a2eff",
            "#ff2ec4",
            "#ffffff"
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function drawCursor() {

        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 20;

        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fill();

    }

    function update() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.length - 1; i >= 0; i--) {

            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            p.vy += 0.05;
            p.vx *= 0.98;

            p.life++;

            const alpha = 1 - p.life / p.maxLife;

            ctx.globalAlpha = alpha;

            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 15;

            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.life >= p.maxLife) {
                particles.splice(i, 1);
            }

        }

        ctx.globalAlpha = 1;

        drawCursor();

        requestAnimationFrame(update);
    }

    update();

});