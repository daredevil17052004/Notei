"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send } from "lucide-react"
import AIRing from "./ai-ring"

export default function AIInterface() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const recognitionRef = useRef(null)
  const synthRef = useRef(null)

  const startRecording = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = '';

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      console.log('finalTranscript', finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };

    recognition.onend = () => {
      console.log('Recording ended');
      setInput(finalTranscript);
      postrequest(finalTranscript);
    };

    recognition.start();
    console.log('Recording started');
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log('Recording stopped');
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.role === "assistant") {
      setIsSpeaking(true)
      console.log("here")   
      if (synthRef.current) {
        const utterance = new SpeechSynthesisUtterance(lastMessage.content)
        utterance.onend = () => setIsSpeaking(false)
        synthRef.current.speak(utterance)
      }
    }
  }, [messages])

  useEffect(() => {
    synthRef.current = window.speechSynthesis
  }, [])

  const toggleListening = () => {
      if (isListening == false) {
        try {
          setIsListening(true)
          startRecording()
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error("Error starting speech recognition:", error)
          }
        }
      } else {
        setIsListening(false)
        stopRecording()
        recognitionRef.current?.stop()
      }
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const postrequest = async (input) => {
    try {
      console.log('input request', JSON.stringify({ prompt: input }));
      const response = await fetch("https://main-ui-8dzc.onrender.com/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from server")
      }

      const data = await response.json()
      setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
      setInput("")
    }
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setMessages((prevMessages) => [...prevMessages, { role: "user", content: input }])
    postrequest(input)
  }

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-[600px] bg-transparent rounded-lg overflow-hidden relative">
      <div className="flex-grow overflow-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-sm p-4 rounded-lg ${
                message.role === "user" ? " text-white" : "bg-transparent text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-transparent">
        <AIRing isSpeaking={isSpeaking} />
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type or speak your message..."
            className="flex-grow text-black"
          />
          <Button
            type="button"
            onClick={toggleListening}
            variant="outline"
            className={isListening ? "bg-red-500" : "text-black"}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}