"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";

/**
 * HangingIdCard — pendulum-hanging ID badge with real swing physics.
 *
 * Interaction & physics adapted from the Lightswind HangingIdCard reference.
 * All content (name/role/badge ID/accent/avatar/facts) comes from the
 * portfolio's real data via props — no demo values.
 *
 * Physics: angular pendulum (gravity + damping) integrated in a
 * requestAnimationFrame loop. Physics values live in refs; React state is
 * updated only for rendering the rotation.
 */

// ─── Physics constants (from the reference) ──────────────────────────────────
const SPRING_K = 0;    // real pendulum relies on gravity
const MASS = 1;

// Defaults chosen for a natural "hanging badge" feel:
// - gravity 3400: slightly snappier than the reference's 3000
// - damping 0.985/s: lighter air resistance - swings a touch longer before settling
// - click impulse 2.6 rad/s: a gentle nudge (~12 degree swing), not an aggressive whack
const DEFAULT_GRAVITY = 3400;
const DEFAULT_DAMPING = 0.985;
const DEFAULT_CLICK_IMPULSE = 2.6;

interface CardPhysicsState {
  angle: number; // radians from vertical
  vel: number;   // angular velocity rad/s
}

export interface HangingIdCardProps {
  children?: React.ReactNode;
  ropeLength?: number;
  ropeColor?: string;
  className?: string;
  name?: string;
  role?: string;
  badgeId?: string;
  accentColor?: string;
  avatarSrc?: string;
  status?: string | null;
  facts?: { label: string; value: React.ReactNode }[];
  footerBrand?: string;
  /** Linear velocity loss per second (higher = settles faster). Default 0.985 */
  damping?: number;
  /** Angular velocity imparted by a stationary click, rad/s. Default 2.6 */
  clickImpulse?: number;
  /** Gravity scalar (higher = snappier, heavier feel). Default 3400 */
  gravity?: number;
}

// ─── SVG Lanyard Ribbon & Metal Lock Clip (reference structure) ──────────────
const Lanyard = ({ length, color }: { length: number; color: string }) => {
  const clampY = length;
  const ringY = length + 10;
  const hookY = length + 18;

  return (
    <svg
      width="44"
      height={length + 38}
      viewBox={`0 0 44 ${length + 38}`}
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        {/* Metal clamp & ring gradient */}
        <linearGradient id="hidMetalDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71717a" />
          <stop offset="35%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>

        {/* Hook gradient */}
        <linearGradient id="hidHookDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="40%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>

        {/* Ribbon fabric texture shading */}
        <linearGradient id="hidStrapHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Main lanyard ribbon strap */}
      <rect x="12" y="0" width="20" height={clampY + 4} rx="2" fill={color || "#18181b"} />
      {/* Strap fabric depth shading */}
      <rect x="12" y="0" width="20" height={clampY + 4} rx="2" fill="url(#hidStrapHighlight)" />

      {/* Strap side stitch lines */}
      <line x1="13.5" y1="0" x2="13.5" y2={clampY + 4} stroke="#ffffff" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="3 2" />
      <line x1="30.5" y1="0" x2="30.5" y2={clampY + 4} stroke="#ffffff" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="3 2" />

      {/* Metallic ribbon crimp clamp (base of strap) */}
      <rect x="10" y={clampY} width="24" height="10" rx="2.5" fill="url(#hidMetalDark)" stroke="#18181b" strokeWidth="0.8" />
      {/* Rivets on clamp */}
      <circle cx="13.5" cy={clampY + 5} r="1.3" fill="#a1a1aa" />
      <circle cx="30.5" cy={clampY + 5} r="1.3" fill="#a1a1aa" />

      {/* Swivel ring loop */}
      <path
        d={`M 15 ${clampY + 9} C 15 ${ringY + 6}, 29 ${ringY + 6}, 29 ${clampY + 9}`}
        fill="none"
        stroke="url(#hidMetalDark)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Swivel joint */}
      <rect x="19" y={ringY + 2} width="6" height="6" rx="1" fill="url(#hidMetalDark)" />

      {/* Metal snap hook / lock clip */}
      <path
        d={`M 20 ${ringY + 7}
           L 20 ${hookY + 6}
           C 20 ${hookY + 15}, 24 ${hookY + 15}, 24 ${hookY + 6}
           L 24 ${ringY + 7}`}
        fill="none"
        stroke="url(#hidHookDark)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Spring clip latch lever */}
      <line x1="20.5" y1={hookY + 1} x2="20.5" y2={hookY + 10} stroke="#d4d4d8" strokeWidth="1.2" />
    </svg>
  );
};

// ─── Deterministic pseudo-random barcode bars ────────────────────────────────
const BAR_HEIGHTS = Array.from({ length: 26 }, (_, i) => 50 + Math.sin(i * 1.3) * 35);

// ─── Main component ──────────────────────────────────────────────────────────
export const HangingIdCard = ({
  children,
  ropeLength = 140,
  ropeColor = "#18181b",
  className,
  name = "John Doe",
  role = "Product Designer",
  badgeId = "ID-84920",
  accentColor = "#2563eb",
  avatarSrc,
  status = null,
  facts,
  footerBrand,
  damping = DEFAULT_DAMPING,
  clickImpulse = DEFAULT_CLICK_IMPULSE,
  gravity = DEFAULT_GRAVITY,
}: HangingIdCardProps) => {
  const dampingRef = useRef(damping);
  const gravityRef = useRef(gravity);
  dampingRef.current = damping;
  gravityRef.current = gravity;
  const physRef = useRef<CardPhysicsState>({ angle: 0, vel: 0 });
  const rafRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number | null>(null);
  const prevAngleRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  const [angle, setAngle] = useState(0);
  const dragStartX = useRef(0);
  const dragAngle0 = useRef(0);

  // ── Physics loop ────────────────────────────────────────────────────────────
  const tick = useCallback(
    (now: number) => {
      if (prevTimeRef.current === null) prevTimeRef.current = now;
      const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05); // cap at 50ms
      prevTimeRef.current = now;

      const s = physRef.current;
      if (!isDraggingRef.current) {
        // Realistic pendulum: L approximates the center of mass
        const L = ropeLength + 100;
        const torque =
          -(gravityRef.current / L) * Math.sin(s.angle) - (dampingRef.current / MASS) * s.vel - (SPRING_K / MASS) * s.angle;

        s.vel += torque * dt;
        s.angle += s.vel * dt;

        setAngle(s.angle);

        if (Math.abs(s.angle) > 0.001 || Math.abs(s.vel) > 0.001) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // settled perfectly at bottom
          s.angle = 0;
          s.vel = 0;
          setAngle(0);
        }
      } else {
        // Track velocity while dragging so it can be "flicked"
        if (dt > 0) s.vel = (s.angle - prevAngleRef.current) / dt;
        prevAngleRef.current = s.angle;
        rafRef.current = requestAnimationFrame(tick);
      }
    },
    [ropeLength]
  );

  const startPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ── Pointer events (mouse + touch + pen via Pointer Events) ─────────────────
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      dragStartX.current = e.clientX;
      dragAngle0.current = physRef.current.angle;
      prevAngleRef.current = physRef.current.angle;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      prevTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    },
    [tick]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartX.current;
      const L = ropeLength + 100;
      const newAngle = dragAngle0.current - dx / L;
      const clamped = Math.max(-1.4, Math.min(1.4, newAngle));
      physRef.current.angle = clamped;
      setAngle(clamped);
    },
    [ropeLength]
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    isDraggingRef.current = false;
  }, []);

  // ── Click impulse (tap) ─────────────────────────────────────────────────────
  const onCardClick = useCallback(() => {
    if (Math.abs(physRef.current.vel) < 0.1 && Math.abs(physRef.current.angle) < 0.05) {
      physRef.current.vel = clickImpulse; // a satisfying push
      startPhysics();
    }
  }, [startPhysics, clickImpulse]);

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const cardRotateDeg = angle * (180 / Math.PI);

  return (
    <div
      className={`hid-root select-none ${className ?? ""}`}
      style={{ touchAction: "none" }}
    >
      {/* Fixed ceiling mount — never rotates; pivot sits at its center */}
      <div className="hid-anchor" aria-hidden="true" />

      {/* The pendulum assembly (ring + rope + lock clip + card) rotates as one */}
      <div
        className="hid-pendulum"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onCardClick}
        style={{
          transform: `rotate(${cardRotateDeg}deg)`,
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-6px",
        }}
      >
        {/* Closed swivel ring through the mount, then the lanyard strap */}
        <div style={{ pointerEvents: "none" }}>
          <div className="hid-mount-ring" aria-hidden="true" />
          <Lanyard length={ropeLength} color={ropeColor} />
        </div>

        {/* ID card — portfolio identity, reference structure */}
        <div className="hid-card">
          {children ?? (
            <>
              {/* Card header banner with slot hole + avatar */}
              <div className="hid-banner" style={{ "--hid-accent": accentColor } as React.CSSProperties}>
                {/* Punched slot hole for the lanyard clip */}
                <span className="hid-slot-hole" />

                {/* Profile avatar — real photo via next/image, monogram fallback */}
                <div className="hid-avatar-ring">
                  <div className="hid-avatar">
                    {avatarSrc ? (
                      <Image
                        src={avatarSrc}
                        alt={name}
                        fill
                        sizes="120px"
                        className="hid-avatar-img"
                        priority
                      />
                    ) : (
                      <span className="hid-avatar-fallback">
                        {name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="hid-body">
                <p className="hid-name">{name}</p>
                {role ? <p className="hid-role">{role}</p> : null}

                <div className="hid-divider" />

                {facts?.length ? (
                  <dl className="hid-facts">
                    {facts.map((fact) => (
                      <div className="hid-fact" key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {/* Barcode strip */}
                <div className="hid-barcode">
                  {BAR_HEIGHTS.map((h, i) => (
                    <span
                      key={i}
                      className="hid-bar"
                      style={{ width: i % 3 === 0 ? 3.5 : 2, height: `${h}%` }}
                    />
                  ))}
                </div>

                {/* Serial row */}
                <div className="hid-serial-row">
                  <span>{badgeId}</span>
                  {footerBrand ? <span>{footerBrand}</span> : null}
                </div>

                {/* Optional status pill (not used when facts carry status) */}
                {status ? (
                  <div className="hid-status" style={{ background: accentColor }}>
                    {status}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Drag hint */}
      <p className="hid-hint">Drag or click the card</p>
    </div>
  );
};

export default HangingIdCard;
