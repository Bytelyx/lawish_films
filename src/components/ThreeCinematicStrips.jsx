import React from 'react';
import { CinematicBoxStrip } from './CinematicBoxStrip';

export const ThreeCinematicStrips = ({ images = [], onPhotoClick }) => {
  if (!images || images.length < 6) return null;

  const total = images.length;

  // Split into 3 independent groups of 3-4 photos:
  // BOX 01: Photo 01 -> Photo 02 -> Photo 03 -> Photo 04
  // BOX 02: Photo 05 -> Photo 06 -> Photo 07 -> Photo 08
  // BOX 03: Photo 09 -> Photo 10 -> Photo 11 -> Photo 12
  let box1Photos, box2Photos, box3Photos;
  let b1Start = 0, b2Start = 4, b3Start = 8;

  if (total >= 12) {
    box1Photos = images.slice(0, 4);
    box2Photos = images.slice(4, 8);
    box3Photos = images.slice(8, 12);
    b1Start = 0;
    b2Start = 4;
    b3Start = 8;
  } else if (total >= 9) {
    box1Photos = images.slice(0, 3);
    box2Photos = images.slice(3, 6);
    box3Photos = images.slice(6, 9);
    b1Start = 0;
    b2Start = 3;
    b3Start = 6;
  } else {
    const chunk = Math.floor(total / 3);
    box1Photos = images.slice(0, chunk);
    box2Photos = images.slice(chunk, chunk * 2);
    box3Photos = images.slice(chunk * 2, chunk * 3);
    b1Start = 0;
    b2Start = chunk;
    b3Start = chunk * 2;
  }

  return (
    <div className="w-full space-y-10 sm:space-y-14 mb-20 sm:mb-28">
      {/* Visual Section Intro Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/[0.08] text-xs">
        <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
          {/* THREE-ACT MOTION ANTHOLOGY */}
        </span>
        <span className="text-[10px] font-mono tracking-widest text-white/40 mt-1 sm:mt-0">
          3 INDEPENDENT CONTINUOUS STRIPS • 12 FEATURED FRAMES
        </span>
      </div>

      {/* BOX 01 — PHOTO STRIP 01 */}
      <CinematicBoxStrip
        boxNumber="01"
        boxLabel="ACT I • THE EMOTIONAL PRELUDE"
        photos={box1Photos}
        globalStartIndex={b1Start}
        direction="left"
        baseDuration={26}
        onPhotoClick={onPhotoClick}
      />

      {/* BOX 02 — PHOTO STRIP 02 */}
      <CinematicBoxStrip
        boxNumber="02"
        boxLabel="ACT II • THE CLIMAX & CELEBRATION"
        photos={box2Photos}
        globalStartIndex={b2Start}
        direction="right"
        baseDuration={30}
        onPhotoClick={onPhotoClick}
      />

      {/* BOX 03 — PHOTO STRIP 03 */}
      <CinematicBoxStrip
        boxNumber="03"
        boxLabel="ACT III • TWILIGHT & HEIRLOOM STILLS"
        photos={box3Photos}
        globalStartIndex={b3Start}
        direction="left"
        baseDuration={24}
        onPhotoClick={onPhotoClick}
      />
    </div>
  );
};
