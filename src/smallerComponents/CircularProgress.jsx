const CircularProgress = ({ time, totalTime }) => {
  const radius = 40; // Radius of the outer circle
  const innerCircleRadius = 35; // inner stroke radius (slightly smaller for spacing)
  const circumference = 2 * Math.PI * radius;
  const progress = (time / totalTime) * circumference;

  // Calculate the angle (in radians) based on progress
  const progressAngle = (progress / circumference) * 2 * Math.PI;

  // Function to calculate the (x, y) position of the cap circles
  const getPosition = (angle, r) => ({
    x: 50 + r * Math.cos(angle), // Center (50,50) + radius * cos(angle)
    y: 50 + r * Math.sin(angle), // Center (50,50) + radius * sin(angle)
  });

  // Positions for start and end caps
  const startCap = getPosition(-Math.PI / 2, radius);
  const endCap = getPosition(-Math.PI / 2 + progressAngle, radius);

  return (
    <svg width="300" height="300" viewBox="0 0 100 100">
      {/* Background Circle, ended up not using this though */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="none"
        strokeWidth="5"
      />

      <circle
        cx="50"
        cy="50"
        r={innerCircleRadius}
        fill="#FFAF00"
        stroke="none"
      />

      {/* Progress Circle */}
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="darkblue"
        strokeWidth="1.5"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />

      {/* Start Cap (small filled circle) */}
      <circle cx={startCap.x} cy={startCap.y} r="3" fill="darkblue" />

      {/* End Cap (small filled circle) */}
      <circle cx={endCap.x} cy={endCap.y} r="3" fill="darkblue" />

      {/* Time Display */}
      <text x="50" y="48" textAnchor="middle" fontSize="6" fill="white">
        <tspan fontSize="12" fontWeight="bold">
          {Math.floor(time)} :{" "}
          {Math.floor((time * 60) % 60)
            .toString()
            .padStart(2, "0")}
        </tspan>
        <tspan x="50" dy="12" fontSize="8" fontWeight="medium">
          min / {totalTime}
        </tspan>
      </text>
    </svg>
  );
};

export default CircularProgress;
