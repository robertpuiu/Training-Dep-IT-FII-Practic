"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "../hooks/use-window-size";

export default function ConfettiCompoenent() {
  const { width, height } = useWindowSize();
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {isClient && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          initialVelocityY={10}
          // friction={0.985}
          // wind={0.1}
          gravity={0.1}
          tweenDuration={4000}
          // recycle = {false}
          numberOfPieces={250}
          colors={["#077EF5", "#FF077C", "#E514FE"]}
          drawShape={(ctx) => {
            ctx.beginPath();
            // for (let i = 0; i < 22; i++) {
            // 	const angle = 0.35 * i
            // 	const x = (0.2 + 1.5 * angle) * Math.cos(angle)
            // 	const y = (0.2 + 1.5 * angle) * Math.sin(angle)
            // 	ctx.lineTo(x, y)
            // }
            ctx.rect(-4, -8, 8, 16);
            ctx.fill();
            // ctx.stroke()
            // ctx.closePath()
          }}
        />
      )}
    </>
  );
}
