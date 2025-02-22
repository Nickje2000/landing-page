"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Music2, Gamepad, Users } from "lucide-react"

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
  activities: Array<{
    type: number
    state?: string
    name: string
    id: string
    details?: string
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
  }>
  spotify?: {
    song: string
    artist: string
    album_art_url: string
    timestamps: {
      start: number
      end: number
    }
  }
  kv: {
    [key: string]: string
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

  // Get the non-spotify activity if it exists
  const currentActivity = status.activities?.find((activity) => activity.type !== 2) // Type 2 is Spotify

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

      {status.kv?.guild_tag && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>Guild Tag: {status.kv.guild_tag}</span>
          </div>
        </div>
      )}

      {currentActivity && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-3">
            {currentActivity.assets?.large_image ? (
              <Image
                src={`https://cdn.discordapp.com/app-assets/${currentActivity.id}/${currentActivity.assets.large_image}.png`}
                alt={currentActivity.name}
                width={48}
                height={48}
                className="rounded"
              />
            ) : (
              <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center">
                <Gamepad className="w-6 h-6 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center text-sm text-gray-400">
                <Gamepad className="w-4 h-4 mr-1" /> Playing
              </div>
              <div className="font-medium truncate">{currentActivity.name}</div>
              {currentActivity.details && (
                <div className="text-sm text-gray-400 truncate">{currentActivity.details}</div>
              )}
              {currentActivity.state && <div className="text-sm text-gray-400 truncate">{currentActivity.state}</div>}
            </div>
          </div>
        </div>
      )}

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

