"use client"

import React from "react"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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

interface ExpandableTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filter: string
  renderSubComponent?: (props: { row: any }) => React.ReactElement
}

export function ExpandableTable<TData, TValue>({
  columns,
  data,
  filter,
  renderSubComponent,
}: ExpandableTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      columnFilters,
      sorting,
      expanded,
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
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Buscar por ${filter}...`}
            value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filter)?.setFilterValue(event.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-lg border border-border bg-card shadow-lg">
        <ScrollArea className="w-full overflow-x-auto" type="always">
          <Table className="min-w-[900px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="h-12 px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/40"
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
                <TableRow
                data-state={row.getIsSelected() && "selected"}
                className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
                </TableRow>
                {row.getIsExpanded() && renderSubComponent && (
                <TableRow key={`${row.id}-expanded`} className="border-b border-border">
                    <TableCell colSpan={columns.length} className="p-0">
                    {renderSubComponent({ row })}
                    </TableCell>
                </TableRow>
                )}
            </React.Fragment>
            ))}

            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}
