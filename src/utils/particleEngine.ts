import { Particle, Mode } from '../types/portfolio';
const CODE_CHARS = ['{', '}', '<', '>', '/', '*', ';', 'const', 'let', 'fn', '[]', '=>'];
export class ParticleEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  particles: Particle[] = [];
  width: number = 0;
  height: number = 0;
  mode: Mode = 'dev';
  mouseX: number = 0;
  mouseY: number = 0;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
  }
  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }
  setMode(mode: Mode) {
    this.mode = mode;
    // Morph existing particles
    this.particles.forEach(p => {
      p.type = mode === 'dev' ? 'code' : 'frame';
      p.color = mode === 'dev' ? '#00f5ff' : '#ff006e';
      if (mode === 'dev' && !p.char) {
        p.char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
      }
    });
  }
  createExplosion(x: number, y: number, count: number = 50) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        size: Math.random() * 15 + 5,
        color: this.mode === 'dev' ? '#00f5ff' : '#ff006e',
        type: this.mode === 'dev' ? 'code' : 'frame',
        char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
        life: 100,
        maxLife: 100
      });
    }
  }
  spawnAmbient() {
    if (this.particles.length < 100) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 10 + 2,
        color: this.mode === 'dev' ? 'rgba(0, 245, 255, 0.3)' : 'rgba(255, 0, 110, 0.3)',
        type: this.mode === 'dev' ? 'code' : 'frame',
        char: CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)],
        life: Infinity,
        maxLife: Infinity
      });
    }
  }
  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Mouse attraction radius
    const radius = 150;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Physics
      p.x += p.vx;
      p.y += p.vy;

      // Mouse interaction (magnetic effect)
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const force = (radius - dist) / radius;
        p.vx += dx / dist * force * 0.5;
        p.vy += dy / dist * force * 0.5;
      }

      // Friction
      p.vx *= 0.95;
      p.vy *= 0.95;

      // Wrap around screen
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Life for explosion particles
      if (p.life !== Infinity) {
        p.life--;
        p.size *= 0.95;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      }

      // Render
      this.ctx.fillStyle = p.color;
      this.ctx.font = `${p.size}px "JetBrains Mono"`;
      if (p.type === 'code') {
        this.ctx.fillText(p.char || '', p.x, p.y);
      } else {
        // Film frame style
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(p.x, p.y, p.size * 1.5, p.size);
        // Sprocket holes
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(p.x + 2, p.y + 2, 2, 2);
        this.ctx.fillRect(p.x + 2, p.y + p.size - 4, 2, 2);
      }
    }
    this.spawnAmbient();
    requestAnimationFrame(() => this.update());
  }
}