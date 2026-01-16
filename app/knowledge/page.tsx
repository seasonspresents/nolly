"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Sparkles, FileText, Video, FolderOpen, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: { title: string; author: string; id: string }[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "How do I contact the on-call engineer for payment issues?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "For critical payment issues, page the on-call engineer via PagerDuty. The rotation includes Marcus Chen, Sarah Williams, and David Park. There's a 15-minute response SLA for critical issues.\n\nFor non-critical issues, post in #payments-support on Slack. The team monitors this channel during business hours and typically responds within 2 hours.",
    sources: [
      { title: "Payment Gateway Integration", author: "Marcus Chen", id: "1" },
      { title: "Infrastructure Documentation", author: "David Park", id: "2" },
    ],
  },
]

const knowledgeEntries = [
  {
    id: "1",
    title: "Payment Gateway Integration",
    contributor: {
      name: "Marcus Chen",
      avatar: "/asian-professional-man.png",
    },
    type: "mixed",
    date: "Jan 14, 2026",
  },
  {
    id: "2",
    title: "CI/CD Pipeline Setup",
    contributor: {
      name: "David Park",
      avatar: "/korean-professional-man.png",
    },
    type: "document",
    date: "Jan 12, 2026",
  },
  {
    id: "3",
    title: "User Authentication Flow",
    contributor: {
      name: "Lisa Thompson",
      avatar: "/blonde-professional-woman.png",
    },
    type: "video",
    date: "Jan 10, 2026",
  },
  {
    id: "4",
    title: "Database Optimization Guide",
    contributor: {
      name: "Alex Kumar",
      avatar: "/indian-professional-man.png",
    },
    type: "document",
    date: "Jan 8, 2026",
  },
  {
    id: "5",
    title: "Customer Onboarding Flow",
    contributor: {
      name: "Sarah Williams",
      avatar: "/professional-woman-headshot.png",
    },
    type: "mixed",
    date: "Jan 5, 2026",
  },
  {
    id: "6",
    title: "Analytics Pipeline Overview",
    contributor: {
      name: "Emily Rodriguez",
      avatar: "/latina-professional-woman.png",
    },
    type: "document",
    date: "Jan 3, 2026",
  },
]

const filters = [
  { id: "all", label: "All" },
  { id: "person", label: "By Person" },
  { id: "project", label: "By Project" },
  { id: "type", label: "By Type" },
]

const typeIcons = {
  document: FileText,
  video: Video,
  mixed: FolderOpen,
}

export default function KnowledgeBasePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTyping, setIsTyping] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    }

    setMessages([...messages, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Based on the documentation from Marcus Chen and David Park, the payment retry logic works as follows:\n\n1. When a payment fails, the system checks the error type\n2. For transient errors (network issues, rate limits), it retries with exponential backoff\n3. Maximum of 3 retry attempts over 24 hours\n4. Failed payments are logged to Datadog and an alert is sent if the failure rate exceeds 5%\n\nYou can find the retry configuration in the `payment-config.yaml` file in the infrastructure repo.",
        sources: [
          { title: "Payment Gateway Integration", author: "Marcus Chen", id: "1" },
          { title: "Infrastructure Documentation", author: "David Park", id: "2" },
        ],
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">Search documentation or ask AI anything</p>
        </div>

        {/* AI Chat Interface */}
        <Card className="border-border mb-8">
          <CardContent className="p-0">
            {/* Messages */}
            <div className="max-h-[400px] overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex gap-4", message.role === "user" ? "justify-end" : "")}>
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={cn("max-w-[80%] space-y-3", message.role === "user" ? "order-first" : "")}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.sources && (
                      <div className="space-y-1.5">
                        <span className="text-xs text-muted-foreground">Sources:</span>
                        <div className="flex flex-wrap gap-2">
                          {message.sources.map((source) => (
                            <Link
                              key={source.id}
                              href={`/knowledge/${source.id}`}
                              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" />
                              {source.author} · {source.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                  </div>
                  <div className="rounded-2xl bg-muted px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                      <span
                        className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <span
                        className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  placeholder="Ask anything... 'How does the payment retry logic work?'"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Browse Knowledge */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold">Browse Knowledge</h2>
            <div className="flex gap-2">
              {filters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    activeFilter === filter.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {knowledgeEntries.map((entry) => {
              const TypeIcon = typeIcons[entry.type as keyof typeof typeIcons]
              return (
                <Link key={entry.id} href={`/knowledge/${entry.id}`}>
                  <Card className="h-full border-border transition-all hover:border-primary/50 hover:shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-medium leading-tight">{entry.title}</h3>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={entry.contributor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {entry.contributor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{entry.contributor.name}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
