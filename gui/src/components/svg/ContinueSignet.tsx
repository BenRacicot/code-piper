interface CodePiperSignetProps {
  height?: number;
  width?: number;
  className?: string;
}

export default function ContinueSignet({
  height = 107,
  width = 107,
  className = "",
}: CodePiperSignetProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="512"
        cy="512"
        r="225.3"
        stroke="#fef08a"
        strokeWidth="4"
        strokeOpacity="0.250"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="255.4"
        stroke="#fcea7d"
        strokeWidth="4"
        strokeOpacity="0.325"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="285.4"
        stroke="#fae470"
        strokeWidth="4"
        strokeOpacity="0.400"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="315.5"
        stroke="#f8de63"
        strokeWidth="4"
        strokeOpacity="0.475"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="345.6"
        stroke="#f6d856"
        strokeWidth="4"
        strokeOpacity="0.550"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="375.7"
        stroke="#f4d249"
        strokeWidth="4"
        strokeOpacity="0.625"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="405.8"
        stroke="#f2cb3c"
        strokeWidth="4"
        strokeOpacity="0.700"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="435.8"
        stroke="#f0c52f"
        strokeWidth="4"
        strokeOpacity="0.775"
        fill="none"
      />
      <circle
        cx="512"
        cy="512"
        r="465.9"
        stroke="#eebf22"
        strokeWidth="4"
        strokeOpacity="0.850"
        fill="none"
      />
      <text
        x="512"
        y="512"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="307"
        fontWeight="800"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
      >
        C
      </text>
    </svg>
  );
}
