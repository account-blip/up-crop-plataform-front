"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { Variedad } from "@/types/variedad.type"
import { UnidadProductiva } from "@/types/unidad-productiva.type"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filter: string
  variedades?: Variedad[]                // 👈 agregado
  unidadesProductivas?: UnidadProductiva[] // 👈 si también la usás
  rolUser?: boolean                        // 👈 si también pasás este prop
}

export function GlobalTable<TData, TValue>({
  columns,
  data,
  filter,
  variedades,
  unidadesProductivas,
  rolUser
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  })

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-polar-bear/60" />
          <Input
            placeholder={`Buscar por ${filter}...`}
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filter)?.setFilterValue(event.target.value)}
            className="pl-9 h-10 bg-cocos-black/50 border-polar-bear/20 text-december-sky placeholder:text-polar-bear/50 focus-visible:ring-blue-titmouse focus-visible:border-blue-titmouse"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-lg border border-polar-bear/10 bg-cocos-black/30 shadow-lg">
        <ScrollArea className="w-full overflow-x-auto" type="always">
          <Table className="min-w-[900px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-polar-bear/10">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="h-12 px-6 text-xs font-semibold uppercase tracking-wider text-polar-bear/70 bg-cocos-black/40"
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-polar-bear/10 hover:bg-cocos-black/50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-4 text-december-sky/90">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center text-polar-bear/60">
                    No hay resultados para mostrar.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" className="bg-polar-bear/10" />
        </ScrollArea>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}
