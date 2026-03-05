interface ShapePreviewProps {
  shapeId: string;
  label: string;
}

const baseFill = "#E9D7C6";
const accentFill = "#C4956A";

function ShapeSvg({ shapeId }: { shapeId: string }) {
  switch (shapeId) {
    case "round":
      return <circle cx="50" cy="50" r="26" fill={baseFill} stroke={accentFill} strokeWidth="2" />;

    case "oval":
      return <ellipse cx="50" cy="50" rx="30" ry="22" fill={baseFill} stroke={accentFill} strokeWidth="2" />;

    case "heart":
      return (
        <path
          d="M50 77C50 77 22 60 22 39C22 29 30 22 40 22C45 22 49 25 50 30C51 25 55 22 60 22C70 22 78 29 78 39C78 60 50 77 50 77Z"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );

    case "pear":
    case "teardrop":
      return (
        <path
          d="M50 20C64 36 72 49 72 59C72 72 62 80 50 80C38 80 28 72 28 59C28 49 36 36 50 20Z"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );

    case "square":
      return <rect x="27" y="27" width="46" height="46" fill={baseFill} stroke={accentFill} strokeWidth="2" />;

    case "princess":
      return <rect x="29" y="29" width="42" height="42" fill={baseFill} stroke={accentFill} strokeWidth="2" />;

    case "emerald":
      return (
        <polygon
          points="36,24 64,24 76,36 76,64 64,76 36,76 24,64 24,36"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );

    case "star":
      return (
        <polygon
          points="50,20 58,40 80,40 62,54 70,76 50,62 30,76 38,54 20,40 42,40"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );

    case "moon":
      return (
        <path
          d="M62 24C50 24 40 34 40 46C40 58 50 68 62 68C53 72 42 70 35 63C26 54 26 39 35 30C42 23 53 21 62 24Z"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );

    case "almond":
    case "marquise":
      return (
        <path
          d="M50 25C63 33 72 41 78 50C72 59 63 67 50 75C37 67 28 59 22 50C28 41 37 33 50 25Z"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );

    case "snowflake":
      return (
        <g stroke={accentFill} strokeWidth="2" strokeLinecap="round">
          <line x1="50" y1="24" x2="50" y2="76" />
          <line x1="24" y1="50" x2="76" y2="50" />
          <line x1="31" y1="31" x2="69" y2="69" />
          <line x1="69" y1="31" x2="31" y2="69" />
          <circle cx="50" cy="50" r="8" fill={baseFill} stroke={accentFill} />
        </g>
      );

    case "cushion":
      return (
        <rect
          x="26"
          y="26"
          width="48"
          height="48"
          rx="12"
          ry="12"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );

    default:
      return (
        <polygon
          points="50,22 72,50 50,78 28,50"
          fill={baseFill}
          stroke={accentFill}
          strokeWidth="2"
        />
      );
  }
}

export function ShapePreview({ shapeId, label }: ShapePreviewProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAF8]">
      <svg viewBox="0 0 100 100" className="h-[70%] w-[70%]" role="img" aria-label={label}>
        <defs>
          <radialGradient id="shapeGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FFF9F3" />
            <stop offset="100%" stopColor="#F2E4D7" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#shapeGlow)" opacity="0.7" />
        <ShapeSvg shapeId={shapeId} />
      </svg>
    </div>
  );
}
