import type { TableType } from "@/types/page.type";
import Flex from "./Flex";
import {
  ArrowLeft2,
  ArrowRight2,
  Edit2,
  MedalStar,
  Note,
  Trash,
} from "iconsax-reactjs";

type Props = {
  tableData: TableType;
  onNext: () => void;
  onPrev: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number, name: string) => void;
  onDetail: (id: number) => void;
};

const Table = ({
  tableData,
  onNext,
  onPrev,
  onEdit,
  onDelete,
  onDetail,
}: Props) => {
  return (
    <Flex className="flex-1 overflow-hidden">
      <Flex className="px-6 pb-3.5">
        <table className="table-fixed">
          <thead>
            <tr>
              {tableData.header.map((header, index) => (
                <th
                  key={index.toString()}
                  className={`px-4 py-[16.5px] bg-neutral-100 text-xs font-medium text-neutral-500 text-left ${
                    index === 0 && "rounded-l-lg"
                  }`}
                >
                  {header}
                </th>
              ))}

              <th className="bg-neutral-100 rounded-r-lg" />
            </tr>
          </thead>

          <tbody>
            {tableData.row.map((row, indexRow) => (
              <tr
                key={indexRow.toString()}
                className="border-b border-b-neutral-200"
              >
                {row.data.map((col, indexCol) => {
                  if (col.variant === "badge" && Array.isArray(col.value)) {
                    return (
                      <td key={indexCol.toString()} className="p-4">
                        <Flex className="flex-row! flex-wrap gap-2">
                          {col.value.map((badge, indexBadge) => (
                            <span
                              key={indexBadge.toString()}
                              className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB] inline-flex"
                            >
                              {badge}
                            </span>
                          ))}
                        </Flex>
                      </td>
                    );
                  }

                  if (col.variant === "rating") {
                    return (
                      <td key={indexCol.toString()} className="p-4">
                        <Flex className="flex-row! gap-2 items-center">
                          <MedalStar size="18" color="#FF8A65" variant="Bold" />

                          <p className="text-sm text-neutral-900">
                            {col.value}
                          </p>
                        </Flex>
                      </td>
                    );
                  }

                  if (
                    col.variant === "statusSuccess" ||
                    col.variant === "statusWarning" ||
                    col.variant === "statusFailed"
                  ) {
                    return (
                      <td key={indexCol.toString()} className="p-4">
                        <Flex
                          className={`px-3.5 py-1 ${col.variant === "statusSuccess" ? "bg-green-100" : col.variant === "statusWarning" ? "bg-yellow-100" : "bg-red-100"} inline-block! rounded-full`}
                        >
                          <p
                            className={`text-sm font-medium ${col.variant === "statusSuccess" ? "text-green-500" : col.variant === "statusWarning" ? "text-yellow-500" : "text-red-500"} truncate`}
                          >
                            {col.value}
                          </p>
                        </Flex>
                      </td>
                    );
                  }

                  return (
                    <td
                      key={indexCol.toString()}
                      className={`p-4 text-sm text-neutral-900 ${col.variant === "currency" ? "font-semibold" : ""}`}
                    >
                      {col.value}
                    </td>
                  );
                })}

                <td className="p-3">
                  <Flex className="flex-row! items-center justify-center gap-2">
                    <button
                      type="button"
                      className="size-8 rounded-md border border-neutral-200 bg-neutral-0 hover:bg-neutral-200 duration-300 transition-colors"
                      onClick={() => onDetail(row.id)}
                    >
                      <Note size={16} color="var(--neutral-900)" />
                    </button>

                    <button
                      type="button"
                      className="size-8 rounded-md border border-neutral-200 bg-neutral-0 hover:bg-neutral-200 duration-300 transition-colors"
                      onClick={() => onEdit(row.id)}
                    >
                      <Edit2 size={16} color="var(--neutral-900)" />
                    </button>

                    <button
                      type="button"
                      className="size-8 rounded-md border border-neutral-200 bg-neutral-0 hover:bg-neutral-200 duration-300 transition-colors"
                      onClick={() =>
                        onDelete(row.id, row.data[0].value as string)
                      }
                    >
                      <Trash size={16} color="var(--neutral-900)" />
                    </button>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>

      <Flex className="flex-row! items-center justify-end bg-neutral-50 px-6 py-3.5 gap-4.5">
        <p className="text-sm text-neutral-500">
          Showing {tableData.meta.from} - {tableData.meta.to} from{" "}
          {tableData.meta.total}
        </p>

        <Flex className="flex-row! items-center gap-2">
          <button
            type="button"
            disabled={tableData.meta.from === 1}
            className={`size-8 border border-neutral-200 rounded-md items-center justify-center ${tableData.meta.from === 1 ? "bg-neutral-200 cursor-not-allowed! text-neutral-400" : "bg-neutral-0 text-neutral-900"}`}
            onClick={onPrev}
          >
            <ArrowLeft2 size={16} strokeWidth={1.25} />
          </button>

          <button
            type="button"
            disabled={tableData.meta.to === tableData.meta.total}
            className={`size-8 border border-neutral-200 rounded-md items-center justify-center ${tableData.meta.to === tableData.meta.total ? "bg-neutral-200 cursor-not-allowed! text-neutral-400" : "bg-neutral-0 hover:bg-neutral-200 duration-300 transition-colors text-neutral-900"}`}
            onClick={onNext}
          >
            <ArrowRight2 size={16} strokeWidth={1.25} />
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Table;
