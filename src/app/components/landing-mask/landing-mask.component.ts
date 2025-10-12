import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewChildren,
  QueryList,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  OnInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface PanelData {
  class: string;
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  width: number;
  height: number;
  color: string;
  clipPath: string;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
}

@Component({
  selector: 'app-landing-mask',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-mask.component.html',
  styleUrls: ['./landing-mask.component.scss']
})
export class LandingMaskComponent implements OnInit, AfterViewInit, OnDestroy {
  initialAnimation = true;
  panels: PanelData[] = [];

  @ViewChildren('panelElement') panelElements!: QueryList<ElementRef<HTMLDivElement>>;

  private animationFrameId?: number;
  private rotationAngles: number[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private isBrowser = false;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.generatePanels();
    this.rotationAngles = new Array(this.panels.length).fill(0);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    setTimeout(() => {
      this.initialAnimation = false;

      // Calcolo velocità per spargimento dai pannelli centrali verso i bordi
      this.panels.forEach(p => {
        const dx = p.targetX - p.posX;
        const dy = p.targetY - p.posY;
        const dz = p.targetZ - p.posZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Velocità proporzionale alla distanza (più lontano, più veloce)
        const speed = 15 + Math.random() * 15;

        p.velocityX = (dx / dist) * speed;
        p.velocityY = (dy / dist) * speed;
        p.velocityZ = (dz / dist) * speed;
      });
    }, 1500);

    this.animate();
  }

  private generatePanels(): void {
    const panelCount = window.innerWidth < 768 ? 10 : 20;
    const centerX = 0;
    const centerY = 0;
    // distance from the edges where panels will stop
    const margin = 20;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    this.panels = Array.from({ length: panelCount }, (_, i) => {
      const angle = Math.random() * 2 * Math.PI;

      // Calcoliamo la distanza massima dal centro verso i bordi
      const maxX = Math.cos(angle) > 0
        ? (screenW / 2) - margin
        : -(screenW / 2) + margin;

      const maxY = Math.sin(angle) > 0
        ? (screenH / 2) - margin
        : -(screenH / 2) + margin;

      // Calcoliamo il fattore minimo per evitare di uscire
      const k = Math.min(
        Math.abs(maxX / Math.cos(angle)),
        Math.abs(maxY / Math.sin(angle))
      );

      // Punto finale (target) sul bordo nella direzione dell’angolo
      const targetX = Math.cos(angle) * k;
      const targetY = Math.sin(angle) * k;
      const targetZ = -100 - Math.random() * 300;

      return {
        class: `panel-${i}`,
        // start slightly around the center so the panels appear already spread
        posX: centerX + (Math.random() - 0.5) * 200,
        posY: centerY + (Math.random() - 0.5) * 200,
        posZ: 0,
        rotX: Math.random() * 40 - 20,
        rotY: Math.random() * 40 - 20,
        width: 120 + Math.random() * 180,
        height: 120 + Math.random() * 180,
        color: this.randomGlassColor(),
        clipPath: this.generateRandomPolygon(),
        velocityX: 0,
        velocityY: 0,
        velocityZ: 0,
        targetX,
        targetY,
        targetZ
      };
    });
  }

  private generateRandomPolygon(): string {
    const points = Array.from({ length: Math.floor(Math.random() * 4) + 3 }, () => {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      return `${x}% ${y}%`;
    });
    return `polygon(${points.join(',')})`;
  }

  private randomGlassColor(): string {
    const opacity = (Math.random() * 0.2 + 0.05).toFixed(2);
    const hue = Math.floor(Math.random() * 360);
    return `hsla(${hue}, 100%, 85%, ${opacity})`;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser) {
      return;
    }
    this.mouseX = (event.clientX / window.innerWidth - 0.5) * 4;
    this.mouseY = (event.clientY / window.innerHeight - 0.5) * 4;
  }

  animate = (): void => {
    this.panelElements.forEach((elRef, i) => {
      const p = this.panels[i];
      this.rotationAngles[i] += 0.4;

      const rotY = p.rotY + this.mouseX * 70 + this.rotationAngles[i];
      const rotX = p.rotX + this.mouseY * 70;

      if (!this.initialAnimation) {
        // Movimento verso target
        p.posX += p.velocityX;
        p.posY += p.velocityY;
        p.posZ += p.velocityZ;

        const threshold = 10;
        if (
          Math.abs(p.posX - p.targetX) < threshold &&
          Math.abs(p.posY - p.targetY) < threshold &&
          Math.abs(p.posZ - p.targetZ) < threshold
        ) {
          p.posX = p.targetX;
          p.posY = p.targetY;
          p.posZ = p.targetZ;
          p.velocityX = 0;
          p.velocityY = 0;
          p.velocityZ = 0;
        } else {
          // Freno per rallentare movimento
          p.velocityX *= 0.9;
          p.velocityY *= 0.9;
          p.velocityZ *= 0.9;
        }
      }

      const scale = 1;
      const transform = `
        translate3d(${p.posX}px, ${p.posY}px, ${p.posZ}px)
        rotateX(${rotX}deg) rotateY(${rotY}deg)
        scale(${scale})
      `;

      this.renderer.setStyle(elRef.nativeElement, 'transform', transform);
    });

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}