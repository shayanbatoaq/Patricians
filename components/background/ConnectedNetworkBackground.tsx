"use client";

import { useEffect, useRef } from "react";

type NetworkNode = {
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  phaseX: number;
  phaseY: number;
  phaseZ: number;
  speed: number;
  driftX: number;
  driftY: number;
  driftZ: number;
  emphasis: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
};

type ProjectedNode = {
  index: number;
  x: number;
  y: number;
  z: number;
  worldX: number;
  worldY: number;
  worldZ: number;
  radius: number;
  opacity: number;
  scale: number;
  emphasis: number;
  phase: number;
};

const TWO_PI = Math.PI * 2;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function ConnectedNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const footer = document.querySelector<HTMLElement>("footer");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      normalizedX: 0,
      normalizedY: 0,
      targetNormalizedX: 0,
      targetNormalizedY: 0,
      active: false,
    };

    let nodes: NetworkNode[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let scrollProgressTarget = 0;
    let scrollProgress = 0;
    let previousScrollTarget = window.scrollY;
    let scrollEnergy = 0;
    let reducedMotion = motionPreference.matches;
    let animationFrame = 0;
    let resizeFrame = 0;
    let lastFrameTime = 0;

    const createNodes = () => {
      const random = seededRandom(width * 31 + height * 17);
      const nodeCount = width < 640 ? 32 : width < 1024 ? 44 : 58;

      nodes = Array.from({ length: nodeCount }, (_, index) => ({
        baseX: (random() - 0.5) * width * 1.12,
        baseY: (random() - 0.5) * height * 1.14,
        baseZ: (random() - 0.5) * 440,
        radius: 1.5 + random() * 1.85,
        phaseX: random() * TWO_PI,
        phaseY: random() * TWO_PI,
        phaseZ: random() * TWO_PI,
        speed: 0.075 + random() * 0.095,
        driftX: 9 + random() * 13,
        driftY: 8 + random() * 12,
        driftZ: 24 + random() * 38,
        emphasis: index % 9 === 0 ? 1 : 0,
        offsetX: 0,
        offsetY: 0,
        velocityX: 0,
        velocityY: 0,
      }));
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      pointer.x = clamp(pointer.x, 0, width);
      pointer.y = clamp(pointer.y, 0, height);
      pointer.targetX = clamp(pointer.targetX, 0, width);
      pointer.targetY = clamp(pointer.targetY, 0, height);

      createNodes();
    };

    const drawNode = (node: ProjectedNode, time: number) => {
      const glowRadius = node.radius * (node.emphasis ? 5.9 : 4.8);
      const glow = context.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        glowRadius,
      );
      glow.addColorStop(0, `rgba(56, 189, 248, ${node.opacity * 0.38})`);
      glow.addColorStop(0.42, `rgba(14, 165, 233, ${node.opacity * 0.18})`);
      glow.addColorStop(1, "rgba(56, 189, 248, 0)");

      context.beginPath();
      context.arc(node.x, node.y, glowRadius, 0, TWO_PI);
      context.fillStyle = glow;
      context.fill();

      if (node.emphasis) {
        const ringMotion = reducedMotion
          ? 1
          : 0.92 + Math.sin(time * 0.00055 + node.phase) * 0.08;
        context.beginPath();
        context.arc(node.x, node.y, node.radius * 2.5 * ringMotion, 0, TWO_PI);
        context.lineWidth = 0.8;
        context.strokeStyle = `rgba(7, 131, 184, ${node.opacity * 0.42})`;
        context.stroke();
      }

      const sphere = context.createRadialGradient(
        node.x - node.radius * 0.38,
        node.y - node.radius * 0.42,
        node.radius * 0.08,
        node.x,
        node.y,
        node.radius * 1.25,
      );
      sphere.addColorStop(0, `rgba(255, 255, 255, ${Math.min(0.95, node.opacity + 0.38)})`);
      sphere.addColorStop(0.26, `rgba(125, 211, 252, ${node.opacity * 0.95})`);
      sphere.addColorStop(0.68, `rgba(7, 131, 184, ${node.opacity})`);
      sphere.addColorStop(1, `rgba(7, 89, 133, ${node.opacity * 0.82})`);

      context.beginPath();
      context.arc(node.x, node.y, node.radius, 0, TWO_PI);
      context.fillStyle = sphere;
      context.fill();
    };

    const draw = (time: number, deltaFrames: number) => {
      context.clearRect(0, 0, width, height);

      const pointerDamping = 1 - Math.pow(0.925, deltaFrames);
      const scrollDamping = 1 - Math.pow(0.945, deltaFrames);
      pointer.x += (pointer.targetX - pointer.x) * pointerDamping;
      pointer.y += (pointer.targetY - pointer.y) * pointerDamping;
      pointer.normalizedX +=
        (pointer.targetNormalizedX - pointer.normalizedX) * pointerDamping;
      pointer.normalizedY +=
        (pointer.targetNormalizedY - pointer.normalizedY) * pointerDamping;
      scrollProgress +=
        (scrollProgressTarget - scrollProgress) * scrollDamping;
      scrollEnergy *= Math.pow(0.91, deltaFrames);

      const isMobile = width < 640;
      const elapsedSeconds = (reducedMotion ? 0 : time) * 0.001;
      const scrollValue = reducedMotion ? 0 : scrollProgress;
      const pointerX = reducedMotion ? 0 : pointer.normalizedX;
      const pointerY = reducedMotion ? 0 : pointer.normalizedY;
      const midpointArc = Math.sin(scrollValue * Math.PI);
      const returnArc = Math.sin(scrollValue * Math.PI * 2);
      const rotationX = midpointArc * 0.28 + returnArc * 0.055 - pointerY * 0.055;
      const rotationY = midpointArc * 0.42 + returnArc * 0.07 + pointerX * 0.085;
      const rotationZ = Math.sin(scrollValue * Math.PI * 1.5) * 0.04;
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosZ = Math.cos(rotationZ);
      const sinZ = Math.sin(rotationZ);
      const sceneZoom = 0.96 + midpointArc * 0.14;
      const sceneX =
        -pointerX * (isMobile ? 12 : 28) +
        Math.sin(scrollValue * Math.PI * 1.2) * (isMobile ? 18 : 48);
      const sceneY =
        -pointerY * (isMobile ? 9 : 20) -
        scrollValue * (isMobile ? 30 : 72) +
        midpointArc * (isMobile ? 8 : 18);
      const sceneZ = -28 + midpointArc * 72;
      const focalLength = Math.max(760, width * 0.72);
      const influenceRadius = isMobile ? 180 : 260;
      const maximumDisplacement = isMobile ? 10 : 22;

      const projectedNodes: ProjectedNode[] = nodes.map((node, index) => {
        const orbitX =
          Math.sin(elapsedSeconds * node.speed + node.phaseX) * node.driftX;
        const orbitY =
          Math.cos(elapsedSeconds * node.speed * 0.83 + node.phaseY) * node.driftY;
        const orbitZ =
          Math.sin(elapsedSeconds * node.speed * 0.67 + node.phaseZ) * node.driftZ;

        const worldX = (node.baseX + orbitX) * sceneZoom;
        const worldY = (node.baseY + orbitY) * sceneZoom;
        const worldZ = node.baseZ + orbitZ + sceneZ;

        const rotatedY = worldY * cosX - worldZ * sinX;
        const rotatedZFromX = worldY * sinX + worldZ * cosX;
        const rotatedX = worldX * cosY + rotatedZFromX * sinY;
        const rotatedZ = -worldX * sinY + rotatedZFromX * cosY;
        const finalX = rotatedX * cosZ - rotatedY * sinZ;
        const finalY = rotatedX * sinZ + rotatedY * cosZ;
        const perspective = clamp(focalLength / (focalLength - rotatedZ), 0.7, 1.5);

        let projectedX = width / 2 + finalX * perspective + sceneX;
        let projectedY = height / 2 + finalY * perspective + sceneY;

        let desiredOffsetX = 0;
        let desiredOffsetY = 0;

        if (!reducedMotion && pointer.active) {
          const pointerDeltaX = pointer.x - projectedX;
          const pointerDeltaY = pointer.y - projectedY;
          const pointerDistance = Math.hypot(pointerDeltaX, pointerDeltaY);

          if (pointerDistance > 0.001 && pointerDistance < influenceRadius) {
            const influence = (1 - pointerDistance / influenceRadius) ** 2;
            desiredOffsetX =
              (pointerDeltaX / pointerDistance) * influence * maximumDisplacement;
            desiredOffsetY =
              (pointerDeltaY / pointerDistance) * influence * maximumDisplacement;
          }
        }

        if (reducedMotion) {
          node.offsetX = 0;
          node.offsetY = 0;
          node.velocityX = 0;
          node.velocityY = 0;
        } else {
          node.velocityX +=
            (desiredOffsetX - node.offsetX) * 0.022 * deltaFrames;
          node.velocityY +=
            (desiredOffsetY - node.offsetY) * 0.022 * deltaFrames;
          const velocityDamping = Math.pow(0.82, deltaFrames);
          node.velocityX *= velocityDamping;
          node.velocityY *= velocityDamping;
          node.offsetX += node.velocityX * deltaFrames;
          node.offsetY += node.velocityY * deltaFrames;
        }

        projectedX += node.offsetX;
        projectedY += node.offsetY;

        const depth = clamp((rotatedZ + 330) / 660, 0, 1);
        const opacity = 0.45 + depth * 0.3;
        const radius = node.radius * perspective * (0.84 + depth * 0.34);

        return {
          index,
          x: projectedX,
          y: projectedY,
          z: rotatedZ,
          worldX,
          worldY,
          worldZ,
          radius,
          opacity,
          scale: perspective,
          emphasis: node.emphasis,
          phase: node.phaseZ,
        };
      });

      const connectionDistance = isMobile ? 190 : width < 1024 ? 225 : 255;
      const cursorLineRadius = isMobile ? 190 : 290;
      const pulseIntensity =
        0.72 + midpointArc * 0.28 + Math.abs(returnArc) * 0.12 + scrollEnergy * 0.35;

      for (let index = 0; index < projectedNodes.length; index += 1) {
        const firstNode = projectedNodes[index];

        for (
          let comparisonIndex = index + 1;
          comparisonIndex < projectedNodes.length;
          comparisonIndex += 1
        ) {
          const secondNode = projectedNodes[comparisonIndex];
          const worldDeltaX = secondNode.worldX - firstNode.worldX;
          const worldDeltaY = secondNode.worldY - firstNode.worldY;
          const worldDeltaZ = (secondNode.worldZ - firstNode.worldZ) * 0.48;
          const worldDistance = Math.hypot(worldDeltaX, worldDeltaY, worldDeltaZ);

          if (worldDistance >= connectionDistance) {
            continue;
          }

          const proximity = 1 - worldDistance / connectionDistance;
          const depthOpacity = clamp(
            ((firstNode.opacity + secondNode.opacity) / 2 - 0.45) / 0.3,
            0,
            1,
          );
          const midpointX = (firstNode.x + secondNode.x) / 2;
          const midpointY = (firstNode.y + secondNode.y) / 2;
          const cursorDistance = pointer.active
            ? Math.hypot(pointer.x - midpointX, pointer.y - midpointY)
            : cursorLineRadius;
          const cursorBoost =
            !reducedMotion && cursorDistance < cursorLineRadius
              ? (1 - cursorDistance / cursorLineRadius) * 0.08
              : 0;
          const lineAlpha = clamp(
            0.18 + proximity * 0.1 + depthOpacity * 0.07 + cursorBoost,
            0.18,
            0.39,
          );

          context.beginPath();
          context.moveTo(firstNode.x, firstNode.y);
          context.lineTo(secondNode.x, secondNode.y);
          context.lineWidth = 2.8;
          context.strokeStyle = `rgba(56, 189, 248, ${lineAlpha * 0.26})`;
          context.stroke();

          context.lineWidth = 1.05;
          context.strokeStyle = `rgba(7, 131, 184, ${lineAlpha})`;
          context.stroke();

          const hasPulse = (firstNode.index * 29 + secondNode.index * 17) % 9 === 0;

          if (!hasPulse) {
            continue;
          }

          const progress = reducedMotion
            ? 0.5
            : (time * 0.000052 +
                (firstNode.index + secondNode.index) * 0.071 +
                scrollValue * 0.23) %
              1;
          const pulseX = firstNode.x + (secondNode.x - firstNode.x) * progress;
          const pulseY = firstNode.y + (secondNode.y - firstNode.y) * progress;
          const pulseAlpha =
            Math.sin(progress * Math.PI) * proximity * 0.42 * pulseIntensity;
          const pulseRadius = 1.15 * ((firstNode.scale + secondNode.scale) / 2);

          context.beginPath();
          context.arc(pulseX, pulseY, pulseRadius * 3.2, 0, TWO_PI);
          context.fillStyle = `rgba(56, 189, 248, ${pulseAlpha * 0.18})`;
          context.fill();

          context.beginPath();
          context.arc(pulseX, pulseY, pulseRadius, 0, TWO_PI);
          context.fillStyle = `rgba(56, 189, 248, ${pulseAlpha})`;
          context.fill();
        }
      }

      projectedNodes
        .sort((firstNode, secondNode) => firstNode.z - secondNode.z)
        .forEach((node) => drawNode(node, time));

      if (footer) {
        const footerBounds = footer.getBoundingClientRect();
        const maskTop = clamp(Math.ceil(footerBounds.top), 0, height);
        const maskBottom = clamp(Math.floor(footerBounds.bottom), 0, height);

        if (maskBottom > maskTop) {
          context.clearRect(0, maskTop, width, maskBottom - maskTop);
        }
      }
    };

    const animate = (time: number) => {
      if (document.hidden || reducedMotion) {
        animationFrame = 0;
        return;
      }

      const minimumFrameDuration = width < 640 ? 1000 / 45 : 1000 / 60;
      const elapsed = time - lastFrameTime;

      if (elapsed >= minimumFrameDuration) {
        const deltaFrames = clamp(elapsed / (1000 / 60), 0.5, 2);
        draw(time, deltaFrames);
        lastFrameTime = time;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (reducedMotion) {
        draw(0, 1);
        return;
      }

      if (!animationFrame && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.targetNormalizedX = (event.clientX / width - 0.5) * 2;
      pointer.targetNormalizedY = (event.clientY / height - 0.5) * 2;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetNormalizedX = 0;
      pointer.targetNormalizedY = 0;
    };

    const updateScrollProgress = () => {
      const maximumScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      scrollProgressTarget = clamp(window.scrollY / maximumScroll, 0, 1);
    };

    const handleScroll = () => {
      const nextScrollTarget = window.scrollY;
      const scrollDelta = Math.abs(nextScrollTarget - previousScrollTarget);
      scrollEnergy = Math.min(1, scrollEnergy + scrollDelta / 180);
      previousScrollTarget = nextScrollTarget;
      updateScrollProgress();
    };

    const handleResize = () => {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        resizeCanvas();
        updateScrollProgress();

        if (reducedMotion) {
          draw(0, 1);
        }
      });
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        return;
      }

      lastFrameTime = 0;
      startAnimation();
    };

    resizeCanvas();
    updateScrollProgress();
    scrollProgress = scrollProgressTarget;
    startAnimation();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionPreference);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] hidden h-[100dvh] w-screen sm:block"
    />
  );
}
