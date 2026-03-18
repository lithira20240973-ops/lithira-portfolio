import { Linkedin, Github, Instagram } from "lucide-react";

export function SocialRail() {
  const linkClass = "opacity-70 hover:opacity-100 hover:-translate-y-[2px] transition-all duration-200 ease-out text-black";

  return (
    <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 flex flex-col gap-5 z-20">
      <a href="https://linkedin.com/in/lithira-kalubowila" className={linkClass} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <Linkedin size={18} strokeWidth={2} />
      </a>
      <a href="https://github.com/lithira20240973-ops" className={linkClass} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
        <Github size={18} strokeWidth={2} />
      </a>
      <a href="https://www.instagram.com/lithira.kalubowila?igsh=c2NlcjRobnZwYzNr&utm_source=qr" className={linkClass} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <Instagram size={18} strokeWidth={2} />
      </a>
    </div>
  );
}
