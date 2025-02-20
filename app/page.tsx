"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import SocialConnections, { createSocialButton } from "../components/social-connections"
import ParticleBackground from "../components/particle-background"
import FireEffect from "../components/fire-effect"
import { ExternalLink, X, Flame } from "lucide-react"

export default function Home() {
  const [isArsonMode, setIsArsonMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
    setTimeout(() => setIsModalVisible(true), 50)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    setTimeout(() => setIsModalOpen(false), 300)
  }, [])

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const toggleArsonMode = useCallback(() => {
    setIsArsonMode((prev) => !prev)
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      {isArsonMode && <FireEffect />}
      <div className="z-10 px-6 py-10 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm max-w-2xl w-full">
        <div className="flex flex-col items-center mb-6">
          <div
            className="relative cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-125"
            onClick={openModal}
          >
            <Image
              src="/profile-picture.jpg"
              alt="Nickje2000's profile picture"
              width={120}
              height={120}
              className="rounded-full border-4 border-glow-orange mb-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 float-animation"
            />
          </div>
          <h1 className="text-4xl font-bold text-center">
            <span className="text-glow-orange pulse inline-block">Nickje2000</span>
          </h1>
        </div>
        <p className="welcome-text text-center text-white mb-8 leading-relaxed">
          Hello, and welcome to my landing page!
          <br />
          My name is Nick, and I am an enthusiastic coder :D
          <br />I mainly code LUA, Python and C++, but sometimes I use something new like HTML!
          <br />
          If you need to contact me, do so on Discord.
          <br />
          Check out my GitHub for projects and Spotify for my favorite music!
        </p>
        <SocialConnections />
      </div>

      {isModalOpen && (
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out flex items-center justify-center z-50 ${
            isModalVisible ? "bg-opacity-50" : "bg-opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-black bg-opacity-90 p-6 rounded-lg max-w-lg w-full relative transition-all duration-300 ease-in-out ${
              isModalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={handleModalClick}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white hover:text-glow-orange transition-colors duration-300"
            >
              <X size={24} />
            </button>
            <Image
              src="/profile-picture.jpg"
              alt="Nickje2000's profile picture"
              width={300}
              height={300}
              className="rounded-full border-4 border-glow-orange mb-4 mx-auto"
            />
            <p className="text-white text-center mb-4">
              My amazing profile picture is Ai Hoshino from the manga/anime Oshi no ko. If you wanna know more about it press the little button down there. Also the arson button is broken, pressing it does not do shit right now ;)
            </p>
            <div className="flex justify-center gap-4 mb-4">
              {createSocialButton(
                "More about Oshi no Ko",
                ExternalLink,
                "https://oshinoko.fandom.com/wiki/Oshi_no_Ko_Wiki",
              )}
              <button
                onClick={toggleArsonMode}
                className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                  isArsonMode ? "bg-glow-orange" : "bg-white bg-opacity-10"
                } hover:bg-opacity-20 transition-all duration-300 group`}
              >
                <Flame
                  className={`w-8 h-8 mb-2 ${isArsonMode ? "text-white" : "text-white group-hover:text-glow-orange"} transition-colors duration-300`}
                />
                <span
                  className={`text-sm font-medium ${isArsonMode ? "text-white" : "text-white group-hover:text-glow-orange"} transition-colors duration-300`}
                >
                  {isArsonMode ? "Arson Active" : "Toggle Arson"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

