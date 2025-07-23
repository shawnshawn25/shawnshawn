import React, { useEffect, useRef } from 'react';

const CasinoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const elements: CasinoElement[] = [];
    const elementCount = 25;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class CasinoElement {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      type: 'chip' | 'card' | 'dice' | 'coin' | 'diamond';
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 20;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.type = ['chip', 'card', 'dice', 'coin', 'diamond'][Math.floor(Math.random() * 5)] as any;
        this.color = ['#FFD700', '#DC143C', '#FF6B35', '#4ECDC4', '#45B7D1'][Math.floor(Math.random() * 5)];
        this.color = ['#FFD700', '#FFA500', '#DC143C', '#FF4500', '#DAA520'][Math.floor(Math.random() * 5)];
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x > canvas.width + this.size) {
          this.x = -this.size;
        } else if (this.x < -this.size) {
          this.x = canvas.width + this.size;
        }

        if (this.y > canvas.height + this.size) {
          this.y = -this.size;
        } else if (this.y < -this.size) {
          this.y = canvas.height + this.size;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        switch (this.type) {
          case 'chip':
            this.drawChip(ctx);
            break;
          case 'card':
            this.drawCard(ctx);
            break;
          case 'dice':
            this.drawDice(ctx);
            break;
          case 'coin':
            this.drawCoin(ctx);
            break;
          case 'diamond':
            this.drawDiamond(ctx);
            break;
        }

        ctx.restore();
      }

      drawChip(ctx: CanvasRenderingContext2D) {
        // Main chip circle
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Inner ring
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center circle
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Decorative lines
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const x1 = Math.cos(angle) * (this.size * 0.5);
          const y1 = Math.sin(angle) * (this.size * 0.5);
          const x2 = Math.cos(angle) * (this.size * 0.7);
          const y2 = Math.sin(angle) * (this.size * 0.7);
          
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      drawCard(ctx: CanvasRenderingContext2D) {
        const width = this.size * 0.7;
        const height = this.size;
        
        // Card background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-width/2, -height/2, width, height);
        
        // Card border
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(-width/2, -height/2, width, height);
        
        // Suit symbol
        ctx.fillStyle = this.color;
        ctx.font = `${this.size * 0.4}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const suits = ['♠', '♥', '♦', '♣'];
        ctx.fillText(suits[Math.floor(Math.random() * 4)], 0, 0);
      }

      drawDice(ctx: CanvasRenderingContext2D) {
        const size = this.size * 0.8;
        
        // Dice body
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-size/2, -size/2, size, size);
        
        // Dice border
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(-size/2, -size/2, size, size);
        
        // Dots
        ctx.fillStyle = this.color;
        const dotSize = size * 0.1;
        const positions = [
          [0, 0], // center
          [-size*0.25, -size*0.25], [size*0.25, size*0.25], // diagonal
          [-size*0.25, size*0.25], [size*0.25, -size*0.25], // other diagonal
          [0, -size*0.25], [0, size*0.25] // vertical
        ];
        
        const numDots = Math.floor(Math.random() * 6) + 1;
        for (let i = 0; i < numDots && i < positions.length; i++) {
          ctx.beginPath();
          ctx.arc(positions[i][0], positions[i][1], dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      drawCoin(ctx: CanvasRenderingContext2D) {
        // Outer ring
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Inner circle
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        // Dollar sign
        ctx.fillStyle = this.color;
        ctx.font = `bold ${this.size * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
      }

      drawDiamond(ctx: CanvasRenderingContext2D) {
        const size = this.size * 0.8;
        
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.6, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.6, 0);
        ctx.closePath();
        
        // Create gradient
        const gradient = ctx.createLinearGradient(-size, -size, size, size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, this.color);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // Create elements
    for (let i = 0; i < elementCount; i++) {
      elements.push(new CasinoElement());
    }

    // Floating sparkles
    const sparkles: Sparkle[] = [];
    const sparkleCount = 15;

    class Sparkle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;

        if (this.life > this.maxLife) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.life = 0;
        }

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const opacity = Math.sin((this.life / this.maxLife) * Math.PI) * 0.8;
        ctx.save();
        ctx.globalAlpha = opacity;
        
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 10;
        
        // Draw star shape
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) {
            ctx.moveTo(this.x + x, this.y + y);
          } else {
            ctx.lineTo(this.x + x, this.y + y);
          }
        }
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create sparkles
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push(new Sparkle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw casino elements
      for (const element of elements) {
        element.update();
        element.draw(ctx);
      }
      
      // Update and draw sparkles
      for (const sparkle of sparkles) {
        sparkle.update();
        sparkle.draw(ctx);
      }
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default CasinoBackground;