// Neural Network Background using p5.js
let nodes = [];
let connections = [];
let mouseInfluence = 150;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('neural-bg');
    
    // Create nodes
    for (let i = 0; i < 80; i++) {
        nodes.push({
            x: random(width),
            y: random(height),
            vx: random(-0.5, 0.5),
            vy: random(-0.5, 0.5),
            size: random(3, 6),
            pulse: random(0, TWO_PI)
        });
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let distance = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            if (distance < 120) {
                connections.push({
                    from: i,
                    to: j,
                    strength: random(0.3, 1),
                    pulse: random(0, TWO_PI)
                });
            }
        }
    }
}

function draw() {
    clear();
    
    // Update and draw connections
    for (let conn of connections) {
        let nodeA = nodes[conn.from];
        let nodeB = nodes[conn.to];
        
        // Update pulse
        conn.pulse += 0.02;
        let alpha = (sin(conn.pulse) + 1) * 0.3 + 0.2;
        
        stroke(0, 212, 255, alpha * 255 * conn.strength);
        strokeWeight(1);
        line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
    }
    
    // Update and draw nodes
    for (let node of nodes) {
        // Mouse interaction
        let mouseDistance = dist(mouseX, mouseY, node.x, node.y);
        if (mouseDistance < mouseInfluence) {
            let force = map(mouseDistance, 0, mouseInfluence, 0.02, 0);
            let angle = atan2(node.y - mouseY, node.x - mouseX);
            node.vx += cos(angle) * force;
            node.vy += sin(angle) * force;
        }
        
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -0.8;
        if (node.y < 0 || node.y > height) node.vy *= -0.8;
        
        // Keep within bounds
        node.x = constrain(node.x, 0, width);
        node.y = constrain(node.y, 0, height);
        
        // Apply damping
        node.vx *= 0.99;
        node.vy *= 0.99;
        
        // Update pulse
        node.pulse += 0.05;
        let pulseSize = node.size + sin(node.pulse) * 2;
        
        // Draw node
        fill(0, 212, 255, 200);
        noStroke();
        ellipse(node.x, node.y, pulseSize);
        
        // Inner glow
        fill(255, 255, 255, 100);
        ellipse(node.x, node.y, pulseSize * 0.5);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Typewriter Effect
const phrases = [
    "从零开始构建你的第一个神经网络",
    "掌握GPT、Stable Diffusion等前沿AI技术",
    "与顶尖AI专家一起探索人工智能的奥秘",
    "通过实战项目打造专业的AI作品集"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    const typewriterElement = document.getElementById('typewriter');
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Scroll Reveal Animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// AI Quotes
const aiQuotes = [
    "人工智能是新的电力，它将改变一切。 - 吴恩达",
    "机器学习是人工智能的核心，深度学习是机器学习的未来。",
    "数据是新的石油，AI是新的引擎。",
    "第一个神经网络在1957年就被提出了，叫做感知机。",
    "GPT-3拥有1750亿个参数，是目前最大的语言模型之一。",
    "你知道吗？AI可以创作音乐、绘画，甚至写诗。",
    "深度学习模仿人脑神经网络，但有自己独特的学习方式。",
    "AIGC代表着人工智能生成内容，是创意产业的未来。"
];

function updateAIQuote() {
    const quoteElement = document.getElementById('ai-quote');
    const randomQuote = aiQuotes[Math.floor(Math.random() * aiQuotes.length)];
    
    // Fade out
    quoteElement.style.opacity = 0;
    
    setTimeout(() => {
        quoteElement.textContent = randomQuote;
        // Fade in
        quoteElement.style.opacity = 1;
    }, 300);
}

// Text Splitting Animation
function initTextSplitting() {
    Splitting();
    
    const chars = document.querySelectorAll('[data-splitting] .char');
    
    anime({
        targets: chars,
        opacity: [0, 1],
        translateY: [50, 0],
        rotateZ: [10, 0],
        duration: 800,
        delay: anime.stagger(50),
        easing: 'easeOutExpo'
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Initialize text splitting
    setTimeout(initTextSplitting, 500);
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for visible elements
    revealOnScroll();
    
    // Update AI quote every 10 seconds
    setInterval(updateAIQuote, 10000);
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Add mobile menu functionality here
            alert('移动端菜单功能即将推出！');
        });
    }
});

// Add some interactive features
function addInteractivity() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize interactivity after DOM load
document.addEventListener('DOMContentLoaded', addInteractivity);

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);