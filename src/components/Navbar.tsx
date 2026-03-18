

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full px-6 pt-6 md:px-10 md:pt-7 flex justify-between items-start z-20 text-black/80 text-[14px] md:text-[15px] font-medium tracking-widest uppercase">
      <div className="hidden md:block w-1/3">
        <span>&copy; Lithira Design & Media</span>
      </div>
      <div className="w-full md:w-1/3 flex justify-between md:justify-center gap-10 md:gap-20">
        <div className="md:hidden">
          <span>&copy; Lithira D&M</span>
        </div>
        <div className="flex gap-8 md:gap-20">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
        </div>
      </div>
      <div className="hidden md:flex w-1/3 justify-end">
        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
      </div>
    </nav>
  );
}
