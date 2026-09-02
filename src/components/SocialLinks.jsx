import { FaLinkedinIn, FaFacebookF, FaGithub, FaTiktok } from "react-icons/fa6"
import { SOCIAL_LINKS } from "../data/content"

const ICONS = {
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  github: FaGithub,
  tiktok: FaTiktok,
}

export default function SocialLinks({ orientation = "vertical", className = "" }) {
  const isVertical = orientation === "vertical"

  return (
    <ul
      className={`pointer-events-auto flex ${isVertical ? "flex-col items-center gap-5" : "flex-row items-center gap-4"} ${className}`}
    >
      {SOCIAL_LINKS.map(({ name, href, icon }) => {
        const Icon = ICONS[icon]
        return (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={name}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-indigo-400/40 hover:text-white hover:shadow-[0_0_18px_rgba(129,140,248,0.45)] focus-visible:-translate-y-0.5 focus-visible:scale-110 focus-visible:text-white"
            >
              <Icon className="h-4 w-4 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
