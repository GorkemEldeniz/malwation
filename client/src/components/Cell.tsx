import { cn } from "@utils/index";

interface ICell extends React.TdHTMLAttributes<HTMLTableCellElement> {
  value: string | boolean | number;
  key: React.Key;
}

function Cell({ key, value, className, ...rest }: ICell) {
  return (
    <td
      key={key}
      {...rest}
      className={cn("whitespace-nowrap px-6 py-4 text-center", className)}
    >
      {typeof value === "boolean" ? (value ? "🟢" : "🔴") : value}
    </td>
  );
}

export default Cell;
