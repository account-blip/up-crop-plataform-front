"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import type { EstimacionDeCosecha } from "@/types/estimacion-de-cosecha.type"
import type { UnidadProductiva } from "@/types/unidad-productiva.type"
import type { Cuartel } from "@/types/cuartel.type"
import type { Variedad } from "@/types/variedad.type"
import type { Portainjerto } from "@/types/portainjerto.type"
import { format } from "date-fns";


export const datosReservadoColumns = (
  unidadesProductivas: UnidadProductiva[],
  cuarteles: Cuartel[],
  variedades: Variedad[],
  portainjertos: Portainjerto[],
): ColumnDef<EstimacionDeCosecha>[] => [

  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Fecha de Creación" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as string)
      return (
        <div className="min-w-[100px] text-sm">
          {isNaN(date.getTime()) ? "—" : format(date, "dd/MM/yyyy")}
        </div>
      )
    },
  },  
  {
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Analista" />
    ),
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="min-w-[100px] text-sm">
          { user.firstName ?? ""} {user.lastName ?? ""}
        </div>
      )
    },
  },
  {
    accessorKey: "hilera",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hilera" />,
    cell: ({ row }) => <div className="min-w-[80px] text-sm">{row.getValue("hilera")}</div>,
  },
  {
    accessorKey: "arbol",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Árbol" />,
    cell: ({ row }) => <div className="min-w-[80px] text-sm">{row.getValue("arbol")}</div>,
  },
  {
    accessorKey: "dardo",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Dardo" />,
    cell: ({ row }) => <div className="min-w-[80px] text-sm">{row.getValue("dardo")}</div>,
  },
  {
    accessorKey: "ramilla",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Ramilla" />,
    cell: ({ row }) => <div className="min-w-[80px] text-sm">{row.getValue("ramilla")}</div>,
  },
  {
    accessorKey: "estado",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => <div className="min-w-[100px] text-sm capitalize">{row.getValue("estado")}</div>,
  },
  {
    accessorKey: "foto",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Foto" />,
    cell: ({ row }) => {
      const foto = row.getValue("foto") as string | null
      return foto ? (
        <a href={foto} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
          Ver foto
        </a>
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      )
    },
  },
  {
    accessorFn: (row) => row.unidadProductiva?.nombre ?? "",
    id: "campoEspecifico",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Campo Especifico" />,
    cell: ({ row }) => {
      const unidadProductiva = row.original.unidadProductiva
      return <div className="min-w-[120px] text-sm">{unidadProductiva ? unidadProductiva.nombre : "—"}</div>
    },
  },  
  {
    accessorKey: "unidadProductiva.empresa",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Campo" />,
    cell: ({ row }) => {
      const empresa = row.original.unidadProductiva?.empresa
      return <div className="min-w-[120px] text-sm">{empresa ? empresa.nombre : "—"}</div>
    },
  },
  {
    accessorKey: "cuartel",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cuartel" />,
    cell: ({ row }) => {
      const cuartel = row.original.cuartel
      return <div className="min-w-[120px] text-sm">{cuartel ? cuartel.nombre : "—"}</div>
    },
  },
  {
    accessorFn: (row) => row.variedad?.nombre ?? "",
    id: "variedad",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Variedad" />,
    cell: ({ row }) => {
      const variedad = row.original.variedad
      return <div className="min-w-[120px] text-sm">{variedad ? variedad.nombre : "—"}</div>
    },
  },  
  {
    accessorKey: "portainjerto",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Portainjerto" />,
    cell: ({ row }) => {
      const portainjerto = row.original.portainjerto
      return <div className="min-w-[120px] text-sm">{portainjerto ? portainjerto.nombre : "—"}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const datoReservado = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel className="text-sm">Acciones</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
