// ============================================
// ASTRA TERMINAL - Built by SΛILΞ
// Complete JavaScript - Loading + Terminal
// ============================================

(function() {
    'use strict';

    // ==========================================
    // DOM ELEMENTS
    // ==========================================
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const loadingStatus = document.getElementById('loading-status');
    const mainApp = document.getElementById('main-app');
    const particleCanvas = document.getElementById('particle-canvas');
    const statusTime = document.getElementById('status-time');
    
    // ==========================================
    // PARTICLE SYSTEM
    // ==========================================
    const ctx = particleCanvas.getContext('2d');
    
    function resizeCanvas() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = this.randomColor();
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
            this.pulseOffset = Math.random() * Math.PI * 2;
        }
        
        randomColor() {
            const colors = [
                [0, 240, 255],
                [179, 71, 234],
                [255, 45, 149],
                [0, 255, 136],
                [255, 215, 0],
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update(time) {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
            
            this.currentOpacity = this.opacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15;
        }
        
        draw(time) {
            this.update(time);
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${Math.max(0, this.currentOpacity)})`;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${Math.max(0, this.currentOpacity * 0.2)})`;
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());

    function animateParticles(timestamp) {
        if (loadingScreen.classList.contains('hidden')) return;
        
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => particle.draw(timestamp));
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 130) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 * (1 - distance / 130)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);

    // ==========================================
    // LOADING SEQUENCE
    // ==========================================
    const loadingMessages = [
        { text: 'INITIALIZING SYSTEM...', progress: 15 },
        { text: 'LOADING ASTRA CORE...', progress: 30 },
        { text: 'ESTABLISHING SECURE CONNECTION...', progress: 50 },
        { text: 'CALIBRATING TERMINAL INTERFACE...', progress: 70 },
        { text: 'LOADING MODULES...', progress: 85 },
        { text: 'RENDERING ENVIRONMENT...', progress: 95 },
        { text: 'SYSTEM READY', progress: 100 },
    ];

    let currentStep = 0;

    function updateLoading() {
        if (currentStep < loadingMessages.length) {
            const step = loadingMessages[currentStep];
            loadingStatus.textContent = step.text;
            progressBar.style.width = step.progress + '%';
            currentStep++;
        }
    }

    const loadingInterval = setInterval(() => {
        updateLoading();
        if (currentStep >= loadingMessages.length) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainApp.style.display = 'flex';
                initTerminal();
            }, 500);
        }
    }, 500);

    updateLoading();

    // ==========================================
    // CLOCK UPDATE
    // ==========================================
    function updateClock() {
        const now = new Date();
        statusTime.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // ==========================================
    // TERMINAL INITIALIZATION
    // ==========================================
    function initTerminal() {
        const term = new Terminal({
            cursorBlink: true,
            cursorStyle: 'bar',
            cursorWidth: 2,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', monospace",
            fontSize: 14,
            lineHeight: 1.4,
            letterSpacing: 0.5,
            theme: {
                background: '#0b0b14',
                foreground: '#e0e0f0',
                cursor: '#00f0ff',
                cursorAccent: '#0b0b14',
                selectionBackground: 'rgba(0, 240, 255, 0.3)',
                selectionForeground: '#ffffff',
                black: '#1a1a2e',
                red: '#ff2d95',
                green: '#00ff88',
                yellow: '#ffd700',
                blue: '#00f0ff',
                magenta: '#b347ea',
                cyan: '#00f0ff',
                white: '#e0e0f0',
                brightBlack: '#555577',
                brightRed: '#ff6b9d',
                brightGreen: '#5fffaf',
                brightYellow: '#ffe44d',
                brightBlue: '#5cffff',
                brightMagenta: '#d07fff',
                brightCyan: '#5cffff',
                brightWhite: '#ffffff',
            },
            allowProposedApi: true,
            scrollback: 5000,
            tabStopWidth: 4,
            bellStyle: 'visual',
        });

        // Add-ons
        const fitAddon = new FitAddon.FitAddon();
        const webLinksAddon = new WebLinksAddon.WebLinksAddon();
        
        term.loadAddon(fitAddon);
        term.loadAddon(webLinksAddon);
        
        term.open(document.getElementById('terminal'));
        fitAddon.fit();
        
        window.addEventListener('resize', () => {
            fitAddon.fit();
        });

        // ==========================================
        // COMMAND HISTORY
        // ==========================================
        const commandHistory = [];
        let historyIndex = -1;
        let currentInput = '';

        // ==========================================
        // COMMAND DEFINITIONS
        // ==========================================
        const commands = {
            help: () => {
                return `
\x1b[1;36m╔══════════════════════════════════════════════╗\x1b[0m
\x1b[1;36m║           AVAILABLE COMMANDS                 ║\x1b[0m
\x1b[1;36m╠══════════════════════════════════════════════╣\x1b[0m
\x1b[1;36m║\x1b[0m                                              \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mhelp\x1b[0m       Show this help menu            \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mabout\x1b[0m      About ASTRA Terminal           \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mclear\x1b[0m      Clear the terminal             \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mdate\x1b[0m       Show current date/time        \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mwhoami\x1b[0m     Display current user           \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mneofetch\x1b[0m   System information              \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mskills\x1b[0m     ASTRA capabilities              \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mcontact\x1b[0m    Get in touch                    \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mecho\x1b[0m       Echo text back                 \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mbanner\x1b[0m     Display ASTRA banner            \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mcolors\x1b[0m     Show color palette              \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mweather\x1b[0m    Current weather (demo)          \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mquote\x1b[0m      Random developer quote         \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33msudo\x1b[0m       Try it if you dare...          \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m                                              \x1b[1;36m║\x1b[0m
\x1b[1;36m╚══════════════════════════════════════════════╝\x1b[0m

\x1b[0;37mTip: Press \x1b[1;33m↑\x1b[0;37m/\x1b[1;33m↓\x1b[0;37m arrows for command history.\x1b[0m
\x1b[0;37mTip: Press \x1b[1;33mTab\x1b[0;37m for autocomplete (coming soon).\x1b[0m
`;
            },

            about: () => {
                return `
\x1b[1;36m┌─────────────────────────────────────────────┐\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[1;33mASTRA Terminal v1.0\x1b[0m                        \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  A cloud-native terminal environment         \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  designed for developers who demand          \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  power, speed, and style.                    \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[1;35mBuilt with passion by SΛILΞ\x1b[0m                \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[0;37m"Code the future, one command\x1b[0m               \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m   \x1b[0;37mat a time."\x1b[0m                               \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m└─────────────────────────────────────────────┘\x1b[0m
`;
            },

            clear: () => {
                term.clear();
                return '';
            },

            date: () => {
                const now = new Date();
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short'
                };
                return `\x1b[1;32m${now.toLocaleDateString('en-US', options)}\x1b[0m`;
            },

            whoami: () => {
                return `\x1b[1;33mastra-user@cloud-terminal\x1b[0m`;
            },

            neofetch: () => {
                return `
\x1b[1;36m        .--.        \x1b[0m  \x1b[1;33mASTRA@Cloud\x1b[0m
\x1b[1;36m       |o_o |       \x1b[0m  \x1b[0;37m────────────────────\x1b[0m
\x1b[1;36m       |:_/ |       \x1b[0m  \x1b[1;32mOS:\x1b[0m ASTRA Terminal v1.0
\x1b[1;36m      //   \\ \\      \x1b[0m  \x1b[1;32mHost:\x1b[0m Cloud Instance
\x1b[1;36m     (|     | )     \x1b[0m  \x1b[1;32mKernel:\x1b[0m WebAssembly
\x1b[1;36m    /'\\_   _/\`\\     \x1b[0m  \x1b[1;32mShell:\x1b[0m ASTRA Shell
\x1b[1;36m    \\___)=(___/     \x1b[0m  \x1b[1;32mUptime:\x1b[0m ${Math.floor(Math.random() * 24)} hours
\x1b[1;36m                    \x1b[0m  \x1b[1;32mPackages:\x1b[0m ${Math.floor(Math.random() * 500 + 100)}
\x1b[1;36m                    \x1b[0m  \x1b[1;32mTerminal:\x1b[0m xterm.js
\x1b[1;36m                    \x1b[0m  \x1b[1;32mCreator:\x1b[0m SΛILΞ
\x1b[1;36m                    \x1b[0m  \x1b[1;32mTheme:\x1b[0m Cyberpunk Neon
`;
            },

            skills: () => {
                return `
\x1b[1;36m╔══════════════════════════════════════════════╗\x1b[0m
\x1b[1;36m║           ASTRA CAPABILITIES                 ║\x1b[0m
\x1b[1;36m╠══════════════════════════════════════════════╣\x1b[0m
\x1b[1;36m║\x1b[0m                                              \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;35m◆ Cloud Terminal\x1b[0m       \x1b[0;32m[██████████]\x1b[0m 100%  \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;35m◆ AI Integration\x1b[0m      \x1b[0;33m[████████░░]\x1b[0m 80%   \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;35m◆ Multi-Platform\x1b[0m      \x1b[0;32m[██████████]\x1b[0m 100%  \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;35m◆ Real-time Sync\x1b[0m      \x1b[0;33m[███████░░░]\x1b[0m 70%   \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;35m◆ Container Support\x1b[0m   \x1b[0;36m[█████░░░░░]\x1b[0m 50%   \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;35m◆ Plugin System\x1b[0m       \x1b[0;36m[███░░░░░░░]\x1b[0m 30%   \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m                                              \x1b[1;36m║\x1b[0m
\x1b[1;36m╚══════════════════════════════════════════════╝\x1b[0m
`;
            },

            contact: () => {
                return `
\x1b[1;36m┌─────────────────────────────────────────────┐\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[1;33mGet in Touch with SΛILΞ\x1b[0m                     \x1b[1;36m│\x1b[0m
\x1b[1;36m├─────────────────────────────────────────────┤\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[1;32mWhatsApp Channel:\x1b[0m                           \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[0;34mhttps://whatsapp.com/channel/\x1b[0m               \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[0;34m0029Vb794NKBadmdwkPN6i0B\x1b[0m                     \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[0;37mJoin for updates, tips, and more!\x1b[0m          \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m                                             \x1b[1;36m│\x1b[0m
\x1b[1;36m└─────────────────────────────────────────────┘\x1b[0m
`;
            },

            echo: (args) => {
                if (args.length === 0) {
                    return '\x1b[0;37mUsage: echo <text>\x1b[0m';
                }
                return `\x1b[0;37m${args.join(' ')}\x1b[0m`;
            },

            banner: () => {
                return welcomeArt();
            },

            colors: () => {
                let output = '\n\x1b[0;37mColor Palette:\x1b[0m\n\n';
                const colorNames = [
                    'Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'
                ];
                for (let i = 0; i < 8; i++) {
                    output += `  \x1b[${30 + i}m███\x1b[0m Regular ${colorNames[i]}`;
                    output += `    \x1b[${90 + i}m███\x1b[0m Bright ${colorNames[i]}\n`;
                }
                return output;
            },

            weather: () => {
                const conditions = ['☀️ Sunny', '🌤️ Partly Cloudy', '☁️ Cloudy', '🌧️ Rainy', '⛈️ Stormy', '🌨️ Snowy'];
                const randomWeather = conditions[Math.floor(Math.random() * conditions.length)];
                const temp = Math.floor(Math.random() * 35) + 5;
                return `
\x1b[1;36m┌────────────────────────────────┐\x1b[0m
\x1b[1;36m│\x1b[0m  \x1b[1;33mWeather Report (Demo)\x1b[0m          \x1b[1;36m│\x1b[0m
\x1b[1;36m├────────────────────────────────┤\x1b[0m
\x1b[1;36m│\x1b[0m                                 \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  Condition: ${randomWeather}           \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  Temperature: \x1b[1;32m${temp}°C\x1b[0m                   \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  Humidity: \x1b[1;34m${Math.floor(Math.random() * 60 + 30)}%\x1b[0m              \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m  Wind: \x1b[1;35m${Math.floor(Math.random() * 30 + 5)} km/h\x1b[0m            \x1b[1;36m│\x1b[0m
\x1b[1;36m│\x1b[0m                                 \x1b[1;36m│\x1b[0m
\x1b[1;36m└────────────────────────────────┘\x1b[0m
`;
            },

            quote: () => {
                const quotes = [
                    ['"First, solve the problem. Then, write the code."', '— John Johnson'],
                    ['"Code is like humor. When you have to explain it, it\'s bad."', '— Cory House'],
                    ['"The best error message is the one that never shows up."', '— Thomas Fuchs'],
                    ['"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."', '— Martin Fowler'],
                    ['"Simplicity is the soul of efficiency."', '— Austin Freeman'],
                    ['"Make it work, make it right, make it fast."', '— Kent Beck'],
                    ['"Programming isn\'t about what you know; it\'s about what you can figure out."', '— Chris Pine'],
                ];
                const random = quotes[Math.floor(Math.random() * quotes.length)];
                return `
\x1b[1;33m${random[0]}\x1b[0m
\x1b[0;37m${random[1]}\x1b[0m
`;
            },

            sudo: () => {
                return `
\x1b[1;31m╔══════════════════════════════════════════════╗\x1b[0m
\x1b[1;31m║  ⚠️  ACCESS DENIED  ⚠️                        ║\x1b[0m
\x1b[1;31m║                                              ║\x1b[0m
\x1b[1;31m║  Nice try! But this is a demo terminal.      ║\x1b[0m
\x1b[1;31m║  Real sudo requires root privileges.         ║\x1b[0m
\x1b[1;31m║                                              ║\x1b[0m
\x1b[1;31m║  \x1b[0;37mBut we admire your spirit! 🚀\x1b[0m               \x1b[1;31m║\x1b[0m
\x1b[1;31m╚══════════════════════════════════════════════╝\x1b[0m
`;
            }
        };

        // ==========================================
        // WELCOME ART
        // ==========================================
        function welcomeArt() {
            return `
\x1b[1;36m    ╔═══════════════════════════════════════════╗\x1b[0m
\x1b[1;36m    ║                                           ║\x1b[0m
\x1b[1;36m    ║     █████╗ ███████╗████████╗██████╗  █████╗     ║\x1b[0m
\x1b[1;36m    ║    ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔══██╗    ║\x1b[0m
\x1b[1;36m    ║    ███████║███████╗   ██║   ██████╔╝███████║    ║\x1b[0m
\x1b[1;36m    ║    ██╔══██║╚════██║   ██║   ██╔══██╗██╔══██║    ║\x1b[0m
\x1b[1;36m    ║    ██║  ██║███████║   ██║   ██║  ██║██║  ██║    ║\x1b[0m
\x1b[1;36m    ║    ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝    ║\x1b[0m
\x1b[1;36m    ║                                           ║\x1b[0m
\x1b[1;36m    ║        TERMINAL v1.0 — Built by 𝐒𝚳𝚰𝐋𝚵            ║\x1b[0m
\x1b[1;36m    ╚═══════════════════════════════════════════╝\x1b[0m
`;
        }

        // ==========================================
        // PROMPT
        // ==========================================
        const prompt = '\x1b[1;32m┌──(\x1b[0m\x1b[1;33mastra-user\x1b[0m\x1b[1;32m@\x1b[0m\x1b[1;36mcloud\x1b[0m\x1b[1;32m)-[\x1b[0m\x1b[1;35m~\x1b[0m\x1b[1;32m]\x1b[0m\n\x1b[1;32m└─$\x1b[0m ';

        // ==========================================
        // COMMAND EXECUTION
        // ==========================================
        function executeCommand(input) {
            const trimmed = input.trim();
            
            if (trimmed === '') return;
            
            commandHistory.push(trimmed);
            historyIndex = commandHistory.length;
            
            const parts = trimmed.split(/\s+/);
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);
            
            if (commands[cmd]) {
                const result = commands[cmd](args);
                if (result) {
                    term.writeln(result);
                }
            } else {
                term.writeln(`\x1b[1;31mCommand not found:\x1b[0m ${cmd}`);
                term.writeln(`\x1b[0;37mType \x1b[1;33mhelp\x1b[0;37m to see available commands.\x1b[0m`);
            }
        }

        // ==========================================
        // TERMINAL INPUT HANDLING
        // ==========================================
        term.onData((data) => {
            const charCode = data.charCodeAt(0);
            
            // Enter
            if (charCode === 13) {
                term.writeln('');
                executeCommand(currentInput);
                currentInput = '';
                term.write(prompt);
                return;
            }
            
            // Backspace
            if (charCode === 127) {
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    term.write('\b \b');
                }
                return;
            }
            
            // Ctrl+L - Clear screen
            if (charCode === 12) {
                term.clear();
                term.write(prompt + currentInput);
                return;
            }
            
            // Ctrl+C - Cancel current input
            if (charCode === 3) {
                currentInput = '';
                term.writeln('^C');
                term.write(prompt);
                return;
            }
            
            // Up arrow - Previous command
            if (data === '\x1b[A') {
                if (commandHistory.length > 0) {
                    if (historyIndex > 0) {
                        historyIndex--;
                    }
                    while (currentInput.length > 0) {
                        term.write('\b \b');
                        currentInput = currentInput.slice(0, -1);
                    }
                    currentInput = commandHistory[historyIndex];
                    term.write(currentInput);
                }
                return;
            }
            
            // Down arrow - Next command
            if (data === '\x1b[B') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    while (currentInput.length > 0) {
                        term.write('\b \b');
                        currentInput = currentInput.slice(0, -1);
                    }
                    currentInput = commandHistory[historyIndex];
                    term.write(currentInput);
                } else if (historyIndex === commandHistory.length - 1) {
                    historyIndex = commandHistory.length;
                    while (currentInput.length > 0) {
                        term.write('\b \b');
                        currentInput = currentInput.slice(0, -1);
                    }
                }
                return;
            }
            
            // Tab - Basic autocomplete
            if (charCode === 9) {
                const availableCommands = Object.keys(commands);
                const matches = availableCommands.filter(c => c.startsWith(currentInput));
                if (matches.length === 1) {
                    const completion = matches[0].slice(currentInput.length);
                    currentInput += completion;
                    term.write(completion);
                } else if (matches.length > 1) {
                    term.writeln('\n\x1b[0;37m' + matches.join('  ') + '\x1b[0m');
                    term.write(prompt + currentInput);
                }
                return;
            }
            
            // Printable characters
            if (charCode >= 32 && charCode <= 126) {
                currentInput += data;
                term.write(data);
            }
        });

        // ==========================================
        // INITIAL DISPLAY
        // ==========================================
        term.writeln(welcomeArt());
        term.writeln('');
        term.writeln('  \x1b[1;36m✦ Welcome to ASTRA Terminal ✦\x1b[0m');
        term.writeln('  A next-generation cloud terminal for developers.');
        term.writeln('');
        term.writeln('  Type \x1b[1;33mhelp\x1b[0;37m to explore available commands.\x1b[0m');
        term.writeln('  Join WhatsApp: \x1b[1;32mhttps://whatsapp.com/channel/0029Vb794NKBadmdwkPN6i0B\x1b[0m');
        term.writeln('');
        term.write(prompt);

        // Focus terminal on click anywhere in terminal area
        term.element.addEventListener('click', () => {
            term.focus();
        });
        
        // Auto-focus
        setTimeout(() => term.focus(), 100);
    }

})();
