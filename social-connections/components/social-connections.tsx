import { Github, MessageSquare, GamepadIcon, Music } from "lucide-react"
import Link from "next/link"

const SocialConnections = () => {
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com" },
    { name: "Discord", icon: MessageSquare, url: "#" }, // Replace with your Discord invite link or username
    { name: "Steam", icon: GamepadIcon, url: "https://steamcommunity.com" }, // Replace with your Steam profile URL
    { name: "Spotify", icon: Music, url: "https://open.spotify.com" }, // Replace with your Spotify profile URL
  ]

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 group"
        >
          <link.icon className="w-8 h-8 mb-2 text-white group-hover:text-glow-orange transition-colors duration-300" />
          <span className="text-sm font-medium text-white group-hover:text-glow-orange transition-colors duration-300">
            {link.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default SocialConnections

