import Image from "next/image"
import { CardTitle, CardDescription } from "@/components/ui/card"

interface HeaderProps {
  label: string
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-5 items-center">
      <Image
        src="/logo-up-cropin.svg"
        alt="up-cropin"
        width={200}
        height={200}
        className="h-50 md:h40"
      />
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}
