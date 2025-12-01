import Image from "next/image"
import SocialConnections from "../components/social-connections"
import ParticleBackground from "../components/particle-background"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="z-10 px-6 py-10 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm max-w-2xl w-full">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/profile-picture.jpg"
            alt="Nickje2000's profile picture"
            width={120}
            height={120}
            className="rounded-full border-4 border-glow-orange mb-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 float-animation"
          />
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
          Check out my GitHub for projects and Qobuz for my favorite music!
        </p>
        <SocialConnections />
      </div>
    </main>
  )
}
