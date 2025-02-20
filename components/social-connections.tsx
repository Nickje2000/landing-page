import React from "react"
import { Github, MessageSquare, GamepadIcon, Music } from "lucide-react"
import Link from "next/link"

export const createSocialButton = (name: string, icon: React.ElementType, url: string) => (
  <Link
    key={name}
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center justify-center p-4 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 group"
  >
    {icon &&
      React.createElement(icon, {
        className: "w-8 h-8 mb-2 text-white group-hover:text-glow-orange transition-colors duration-300",
      })}
    <span className="text-sm font-medium text-white group-hover:text-glow-orange transition-colors duration-300">
      {name}
    </span>
  </Link>
)

const SocialConnections = () => {
  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/nickje2000" },
    { name: "Discord", icon: MessageSquare, url: "https://discord.com/users/1251998059269980271" },
    { name: "Steam", icon: GamepadIcon, url: "https://steamcommunity.com/id/nickje2000" },
    {
      name: "Spotify",
      icon: Music,
      url: "https://open.spotify.com/user/qj0rf5vl802ceh63bdua71xxb?si=01d2eceeec794b7e",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {socialLinks.map((link) => createSocialButton(link.name, link.icon, link.url))}
    </div>
  )
}

export default SocialConnections

