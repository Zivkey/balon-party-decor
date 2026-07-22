import { DIE_CUT } from "./dieCut";

type BalloonColor = "srebrna" | "zlatna" | "crvena" | "plava" | "tirkiz";

// Redosled balona u slici public/hero/baloni.png (5 komada, sleva nadesno).
const POSITION: Record<BalloonColor, string> = {
  srebrna: "0%",
  zlatna: "25%",
  crvena: "50%",
  plava: "75%",
  tirkiz: "100%",
};

/** Jedan balon isečen iz zajedničke slike, sa belom die-cut ivicom. Popunjava
 *  širinu roditelja (pozicioniranje/rotacija idu na omotač u Hero-u). */
export default function PhotoBalloon({ color }: { color: BalloonColor }) {
  return (
    <span
      className="pointer-events-none block w-full select-none bg-no-repeat"
      style={{
        aspectRatio: "1 / 2.14",
        backgroundImage: "url(/hero/baloni.png)",
        backgroundSize: "500% auto",
        backgroundPositionX: POSITION[color],
        backgroundPositionY: "top",
        filter: DIE_CUT,
      }}
      aria-hidden="true"
    />
  );
}
