"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface ConstellationNetworkProps {
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  currentOpacity: number;
  currentRadius: number;
}

// Electric-indigo RGB components for canvas drawing
const NODE_R = 99;
const NODE_G = 102;
const NODE_B = 241;

const CONNECTION_DISTANCE = 150;
const MOUSE_INFLUENCE_RADIUS = 120;
const MOUSE_GRAVITY = 0.02;
const LERP_SPEED = 0.08;

function createNodes(width: number, height: number, count: number): Node[] {
  const nodes: Node[] = [];
  for (let i = 0; i < count; i++) {
    const radius = 1.5 + Math.random() * 1.5;
    const baseOpacity = 0.1 + Math.random() * 0.05;
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4, // range: -0.2 to 0.2
      vy: (Math.random() - 0.5) * 0.4,
      radius,
      baseOpacity,
      currentOpacity: baseOpacity,
      currentRadius: radius,
    });
  }
  return nodes;
}

function lerp(current: number, target: number, speed: number): number {
  return current + (target - current) * speed;
}

export default function ConstellationNetwork({
  className = "",
}: ConstellationNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const animationRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getNodeCount = useCallback(() => {
    if (typeof window === "undefined") return 25;
    return window.innerWidth < 768 ? 15 : 25;
  }, []);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    const count = getNodeCount();
    // Reinitialize nodes if count changed or first init
    if (nodesRef.current.length === 0) {
      nodesRef.current = createNodes(rect.width, rect.height, count);
    } else {
      // On resize, clamp existing nodes within new bounds
      for (const node of nodesRef.current) {
        if (node.x > rect.width) node.x = Math.random() * rect.width;
        if (node.y > rect.height) node.y = Math.random() * rect.height;
      }
      // Adjust node count if needed
      const diff = count - nodesRef.current.length;
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          const radius = 1.5 + Math.random() * 1.5;
          const baseOpacity = 0.1 + Math.random() * 0.05;
          nodesRef.current.push({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius,
            baseOpacity,
            currentOpacity: baseOpacity,
            currentRadius: radius,
          });
        }
      } else if (diff < 0) {
        nodesRef.current = nodesRef.current.slice(0, count);
      }
    }
  }, [getNodeCount]);

  useEffect(() => {
    if (!mounted) return;

    initCanvas();

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false };
    };

    const handleResize = () => {
      initCanvas();
    };

    // Listen on the container's parent (the footer) for mouse events
    // since canvas is pointer-events-none
    const parent = container.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx || !container) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update nodes
      for (const node of nodes) {
        // Mouse influence
        let targetOpacity = node.baseOpacity;
        let targetRadius = node.radius;

        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_INFLUENCE_RADIUS) {
            const influence = 1 - dist / MOUSE_INFLUENCE_RADIUS;
            targetOpacity = node.baseOpacity + influence * 0.25;
            targetRadius = node.radius * (1 + influence * 0.5);

            // Gentle gravity toward mouse
            const force = MOUSE_GRAVITY * influence;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        // Lerp visual properties
        node.currentOpacity = lerp(node.currentOpacity, targetOpacity, LERP_SPEED);
        node.currentRadius = lerp(node.currentRadius, targetRadius, LERP_SPEED);

        // Dampen velocity to prevent runaway speeds
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 0.5;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;
        if (node.y < -10) node.y = height + 10;
        if (node.y > height + 10) node.y = -10;
      }

      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${NODE_R}, ${NODE_G}, ${NODE_B}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections (lines from mouse to nearby nodes)
      if (mouse.active) {
        for (const node of nodes) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_INFLUENCE_RADIUS) {
            const opacity = (1 - dist / MOUSE_INFLUENCE_RADIUS) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${NODE_R}, ${NODE_G}, ${NODE_B}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes on top
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_R}, ${NODE_G}, ${NODE_B}, ${node.currentOpacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, initCanvas]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className={`pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
