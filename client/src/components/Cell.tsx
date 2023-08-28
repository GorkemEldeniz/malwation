import { cn } from "@utils/index";

interface ICell extends React.TdHTMLAttributes<HTMLTableCellElement> {
  value: string | boolean | number;
}

function Cell({ value, className, ...rest }: ICell) {
  return (
    <td
      {...rest}
      className={cn("whitespace-nowrap px-6 py-4 text-center", className)}
    >
      {typeof value === "boolean" ? (value ? "🟢" : "🔴") : value}
    </td>
  );
}

export default Cell;
