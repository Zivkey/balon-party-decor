import Image from "next/image";
import { DIE_CUT, SOFT } from "./dieCut";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  dieCut?: boolean;
  priority?: boolean;
  /** Za next/image — koliko px se slika stvarno prikazuje (da ne servira ogromne varijante). */
  sizes?: string;
};

/** Isečena slika sa belom die-cut ivicom. Popunjava širinu roditelja
 *  (pozicioniranje/rotacija idu na omotač u Hero-u). */
export default function HeroSticker({
  src,
  alt,
  width,
  height,
  dieCut = false,
  priority = false,
  sizes = "300px",
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className="pointer-events-none block h-auto w-full select-none"
      style={{ filter: dieCut ? DIE_CUT : SOFT }}
    />
  );
}
