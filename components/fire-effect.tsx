import type React from "react"

const FireEffect: React.FC = () => {
  return (
    <div className="fire-effect fixed inset-0 pointer-events-none z-40">
      <div className="flame-wrapper">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="flame"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
              animationDuration: `${1 + Math.random() * 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default FireEffect

