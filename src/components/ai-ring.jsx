import React from "react"

export default function AIRing({ isSpeaking }) {
  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-16 h-16">
        <div
          className={`absolute inset-0 rounded-full border-4 border-blue-500 ${isSpeaking ? "animate-pulse" : ""}`}
        ></div>
        <div
          className={`absolute inset-1 rounded-full border-4 border-blue-400 ${isSpeaking ? "animate-ping" : ""}`}
        ></div>
        <div
          className={`absolute inset-2 rounded-full border-4 border-blue-300 ${isSpeaking ? "animate-pulse" : ""}`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-8 h-8 bg-blue-500 rounded-full ${isSpeaking ? "animate-bounce" : ""}`}></div>
        </div>
      </div>
    </div>
  )
}

