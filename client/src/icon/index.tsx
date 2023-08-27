export const iconPaths = [
  "rocket",
  "people",
  "dashboard",
  "key",
  "lock",
  "help",
  "attach",
  "brush",
  "pin",
  "skull",
  "home",
  "hierarchy",
  "layer",
  "upload",
  "file",
  "locationpin",
  "world",
  "folder",
  "setting",
  "gauge",
  "time",
  "bookmark",
  "tag",
  "plane",
  "play",
  "flow",
  "sun",
  "bulb",
  "fingerprint",
  "fire",
  "disk",
  "graph",
  "recycle",
  "bell",
  "search",
  "crown",
  "signal",
  "qrcode",
  "shoppingcard",
  "scienceflask",
  "web",
  "diamond",
  "camera",
  "flash",
  "puzzle",
  "cube",
  "pause",
  "truck",
  "chip",
  "database",
  "usb",
  "battery",
  "spinner",
  "rubbish",
  "check",
  "back",
] as const;

export type IconTypes = (typeof iconPaths)[number];

interface IIcon extends React.ComponentPropsWithoutRef<"svg"> {
  icon: IconTypes;
}
export function Icon({ icon, className, ...props }: IIcon) {
  return (
    <svg {...props} className={className}>
      <use href={`/assets/icon/base.svg#${icon}`} />
    </svg>
  );
}
