import SocialConnections from "../components/social-connections"
import ParticleBackground from "../components/particle-background"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="z-10 px-6 py-10 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">
          <span className="text-glow-orange pulse inline-block">Nickje2000</span>
        </h1>
        <p className="welcome-text text-center text-white mb-8 leading-relaxed">
          Hello, and welcome to my landing page!
          <br />
          My name is Nick, and I am an enthusiastic coder :D
          <br />I mainly code LUA, Python and C++, but sometimes I use something new like HTML!
          <br />
          If you need to contact me, do so on Discord. Check out my GitHub for projects and Spotify for my favorite
          tunes!
        </p>
        <SocialConnections />
      </div>
    </main>
  )
}

