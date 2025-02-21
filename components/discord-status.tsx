"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Music2 } from "lucide-react"

interface LanyardData {
  discord_status: string
  discord_user: {
    username: string
    discriminator: string
    global_name: string
    avatar: string
    id: string
  }
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_web: boolean
  spotify?: {
    song: string
    artist: string
    album_art_url: string
    timestamps: {
      start: number
      end: number
    }
  }
}

const DiscordStatus: React.FC = () => {
  const [status, setStatus] = useState<LanyardData | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("https://api.lanyard.rest/v1/users/1342433460811206736")
        const data = await response.json()
        setStatus(data.data)
      } catch (error) {
        console.error("Error fetching Discord status:", error)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (!status) return null

  const getStatusColor = (discordStatus: string) => {
    switch (discordStatus) {
      case "online":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (discordStatus: string) => {
    switch (discordStatus) {
      case "online":
        return "Online"
      case "idle":
        return "Idle"
      case "dnd":
        return "Do Not Disturb"
      default:
        return "Offline"
    }
  }

  const avatarUrl = `https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png?size=128`

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg p-4 w-full max-w-sm border border-white/10">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={avatarUrl || "/placeholder.svg"}
            alt={status.discord_user.username}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-black ${getStatusColor(status.discord_status)}`}
          />
        </div>
        <div className="flex-1">
          <div className="font-bold text-lg text-glow-orange">
            {status.discord_user.global_name || status.discord_user.username}
          </div>
          <div className="text-sm text-gray-400">{status.discord_user.username}</div>
          <div className="flex items-center mt-1 text-sm text-gray-400">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(status.discord_status)} mr-2`} />
            {getStatusText(status.discord_status)}
          </div>
        </div>
      </div>
      {status.spotify && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            <Image
              src={status.spotify.album_art_url || "/placeholder.svg"}
              alt={status.spotify.song}
              width={48}
              height={48}
              className="rounded"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-sm text-gray-400">
                <Music2 className="w-4 h-4 mr-1" /> Listening to Spotify
              </div>
              <div className="font-medium truncate">{status.spotify.song}</div>
              <div className="text-sm text-gray-400 truncate">by {status.spotify.artist}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscordStatus

