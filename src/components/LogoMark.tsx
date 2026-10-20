import { useId } from "react";

const INK = "#f4f1e8";

export function LogoMark({
  className = "",
  variant = "display",
}: {
  className?: string;
  variant?: "display" | "compact";
}) {
  const arch = `dtlc-arch-${useId().replace(/:/g, "")}`;
  const word = {
    fontFamily: "Graduate, serif",
    fontSize: 96,
    letterSpacing: 1,
  };

  return (
    <svg className={`logo-mark ${className}`} viewBox="-70 -36 820 320" overflow="hidden" role="img" aria-hidden="true">
      <defs>
        <path id={arch} d="M 36 150 Q 340 -8 644 150" />
      </defs>
      {variant === "display" ? (
        <>
          <text {...word}>
            <textPath href={`#${arch}`} startOffset="50%" textAnchor="middle" fill="none" stroke={INK} strokeWidth="10" strokeLinejoin="round">
              DEEP TECH
            </textPath>
          </text>
          <text {...word}>
            <textPath href={`#${arch}`} startOffset="50%" textAnchor="middle" fill="none" stroke="#000" strokeWidth="6.4" strokeLinejoin="round">
              DEEP TECH
            </textPath>
          </text>
          <text {...word}>
            <textPath href={`#${arch}`} startOffset="50%" textAnchor="middle" fill="none" stroke={INK} strokeWidth="2.6" strokeLinejoin="round">
              DEEP TECH
            </textPath>
          </text>
        </>
      ) : (
        <text {...word}>
          <textPath href={`#${arch}`} startOffset="50%" textAnchor="middle" fill="none" stroke={INK} strokeWidth="7.5" strokeLinejoin="round">
            DEEP TECH
          </textPath>
        </text>
      )}
      <text x="340" y="198" textAnchor="middle" fontFamily="Graduate, serif" fontSize="36" fill={INK} letterSpacing="8">
        LIFTING CLUB
      </text>
      <text x="340" y="246" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="30" fill={INK}>
        &gt;_
      </text>
    </svg>
  );
}
