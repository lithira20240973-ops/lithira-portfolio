import Link from "next/link";

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full px-6 pt-6 md:px-10 md:pt-7 flex justify-between items-start z-20 text-black/80 text-xs md:text-sm font-medium tracking-wide">
      <div className="hidden md:block w-1/3">
        <span>&copy; Lithira Design & Strategy</span>
      </div>
      <div className="w-full md:w-1/3 flex justify-between md:justify-center gap-10 md:gap-20">
        <div className="md:hidden">
          <span>&copy; Lithira</span>
        </div>
        <div className="flex gap-8 md:gap-20">
          <Link href="#about" className="hover:text-black transition-colors">About</Link>
          <Link href="#projects" className="hover:text-black transition-colors">Projects</Link>
        </div>
      </div>
      <div className="hidden md:flex w-1/3 justify-end">
        <Link href="#contact" className="hover:text-black transition-colors">Contact</Link>
      </div>
    </nav>
  );
}
