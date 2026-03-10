import { Twitter, Linkedin, Instagram } from "lucide-react";

export function SocialRail() {
  return (
    <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 flex flex-col gap-5 z-20 text-black/80">
      <a href="#" className="hover:text-black hover:scale-110 transition-all" aria-label="Twitter">
        <Twitter size={18} strokeWidth={2} />
      </a>
      <a href="https://www.linkedin.com/in/lithira-kalubowila-78b169354/" className="hover:text-black hover:scale-110 transition-all" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <Linkedin size={18} strokeWidth={2} />
      </a>
      <a href="https://www.instagram.com/lithira.kalubowila" className="hover:text-black hover:scale-110 transition-all" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <Instagram size={18} strokeWidth={2} />
      </a>
    </div>
  );
}
