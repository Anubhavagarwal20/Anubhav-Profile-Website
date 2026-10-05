import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // Coordinates references for 60/120fps direct RAF animation without React re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad) and user allows motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);
    document.documentElement.classList.add('custom-cursor-active');

    // Smooth RAF loop for direct transform updates
    const renderLoop = () => {
      // Smooth fluid lerp for outer reticle ring (factor 0.18)
      const lerp = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    // Target element evaluator
    const evaluateTarget = (target: Element | null) => {
      if (!target) return;

      // Detect text inputs where native text caret should take precedence
      const isText = Boolean(target.closest('input[type="text"], input[type="email"], textarea'));

      // Detect white canvas section (Services "WHAT I DO")
      const isLight = Boolean(target.closest('#services, .bg-white, [data-theme="light"]'));

      // Detect contextual badge text (e.g. "VIEW", "INSPECT")
      const textEl = target.closest('[data-cursor-text]') as HTMLElement | null;
      const text = textEl?.getAttribute('data-cursor-text') || null;

      // Detect interactive clickable items
      const isClickable = Boolean(
        text ||
        target.closest(
          'a, button, [role="button"], input[type="submit"], input[type="button"], select, summary, label, .cursor-pointer, [data-cursor-hover]'
        )
      );

      setIsTextInput(isText);
      setIsLightSection(isLight);
      setCursorText(text);
      setIsHovered(isClickable);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        // Initialize ring pos immediately on first move to prevent flying in from offscreen
        if (ringPos.current.x === -100) {
          ringPos.current = { x: e.clientX, y: e.clientY };
        }
      }

      evaluateTarget(e.target as Element | null);
    };

    const handleScroll = () => {
      const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
      evaluateTarget(el);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  // Determine dynamic ring size and scale based on interaction state
  let scaleClass = 'scale-100';
  if (cursorText) {
    scaleClass = isClicking ? 'scale-[1.8]' : 'scale-[2.1]';
  } else if (isHovered) {
    scaleClass = isClicking ? 'scale-[1.2]' : 'scale-[1.65]';
  } else if (isClicking) {
    scaleClass = 'scale-[0.75]';
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible && !isTextInput ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Outer Fluid Reticle Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ease-out ${scaleClass} ${
            isLightSection
              ? isHovered
                ? 'border-[1.5px] border-[#0C0C0C] bg-[#0C0C0C]/10 shadow-[0_0_20px_rgba(12,12,12,0.2)]'
                : 'border-[1.5px] border-[#0C0C0C]/70 bg-[#0C0C0C]/5'
              : isHovered
              ? 'border-[1.5px] border-cyan-300 bg-cyan-400/15 shadow-[0_0_22px_rgba(0,240,255,0.45)]'
              : 'border-[1.5px] border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
          }`}
        >
          {/* 4 Precision Micro-Ticks (Autofocus Target Reticle) */}
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-out ${
              isHovered ? 'rotate-45' : 'rotate-0'
            }`}
          >
            {/* Top Tick */}
            <span
              className={`absolute -top-1 left-1/2 -translate-x-1/2 w-[1.5px] h-[3.5px] rounded-full transition-colors ${
                isLightSection ? 'bg-[#0C0C0C]' : 'bg-cyan-400'
              }`}
            />
            {/* Bottom Tick */}
            <span
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1.5px] h-[3.5px] rounded-full transition-colors ${
                isLightSection ? 'bg-[#0C0C0C]' : 'bg-cyan-400'
              }`}
            />
            {/* Left Tick */}
            <span
              className={`absolute -left-1 top-1/2 -translate-y-1/2 h-[1.5px] w-[3.5px] rounded-full transition-colors ${
                isLightSection ? 'bg-[#0C0C0C]' : 'bg-cyan-400'
              }`}
            />
            {/* Right Tick */}
            <span
              className={`absolute -right-1 top-1/2 -translate-y-1/2 h-[1.5px] w-[3.5px] rounded-full transition-colors ${
                isLightSection ? 'bg-[#0C0C0C]' : 'bg-cyan-400'
              }`}
            />
          </div>

          {/* Orbital Satellite Node (Echoes Hero's 3D Metallic Sphere Satellite) */}
          {!cursorText && (
            <div className="absolute inset-0 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none">
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isLightSection
                    ? 'bg-[#0C0C0C] shadow-[0_0_6px_rgba(12,12,12,0.5)]'
                    : 'bg-cyan-300 shadow-[0_0_10px_#00F0FF]'
                } ${isHovered ? 'scale-125' : 'scale-100'}`}
              />
            </div>
          )}

          {/* Contextual Action Text (e.g. "VIEW", "EXPLORE") */}
          {cursorText && (
            <span
              className={`font-kanit font-extrabold text-[8px] tracking-[0.18em] uppercase select-none transition-colors ${
                isLightSection ? 'text-[#0C0C0C]' : 'text-cyan-200 drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]'
              }`}
            >
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Inner Precision Core Dot (Zero-lag immediate mouse follower) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-150 ease-out ${
            cursorText
              ? 'opacity-0 scale-0'
              : isHovered
              ? 'opacity-70 scale-75'
              : 'opacity-100 scale-100'
          } ${
            isLightSection
              ? 'bg-[#0C0C0C] border border-cyan-500 shadow-[0_0_8px_rgba(0,240,255,0.4)]'
              : 'bg-cyan-400 shadow-[0_0_10px_#00F0FF,0_0_20px_rgba(0,240,255,0.7)]'
          }`}
        />
      </div>
    </div>
  );
};
