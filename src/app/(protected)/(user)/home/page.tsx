
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-8 min-h-[calc(100vh-64px)]">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col items-center space-y-3 sm:space-y-8 mb-6 sm:mb-14">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-2xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 leading-normal py-1 sm:py-2">
              Home
            </h1>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              Bienvenido a tu panel de control
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
