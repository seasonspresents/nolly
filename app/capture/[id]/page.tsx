"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  DollarSign,
  Sparkles,
  Video,
  Upload,
  X,
  Menu,
  Circle,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type QuestionType = "text" | "video" | "multiselect" | "file" | "ai-followup"

interface Question {
  id: string
  type: QuestionType
  question: string
  helper?: string
  options?: string[]
  isAiFollowup?: boolean
  section: string
}

const sections = [
  { id: "admin", name: "Admin Questions" },
  { id: "overview", name: "Project Overview" },
  { id: "contacts", name: "Key Contacts" },
  { id: "systems", name: "Systems & Access" },
  { id: "issues", name: "Common Issues" },
  { id: "videos", name: "Video Walkthroughs" },
  { id: "review", name: "Final Review" },
]

const questions: Question[] = [
  {
    id: "1",
    type: "text",
    question: "What is the most critical thing someone needs to know about this project?",
    helper: "Think about what would cause the biggest problem if someone didn't know it",
    section: "admin",
  },
  {
    id: "2",
    type: "text",
    question: "Describe the Payment Gateway Integration project in your own words.",
    helper: "Include its purpose, scope, and how it fits into the larger system",
    section: "overview",
  },
  {
    id: "3",
    type: "ai-followup",
    question: "You mentioned Stripe as the payment processor. Can you explain how the webhook handling works?",
    isAiFollowup: true,
    section: "overview",
  },
  {
    id: "4",
    type: "text",
    question: "Who should someone contact when the Payment Gateway system has issues?",
    helper: "Include names, roles, and preferred contact methods",
    section: "contacts",
  },
  {
    id: "5",
    type: "multiselect",
    question: "Which systems do you use for this project?",
    options: ["Stripe Dashboard", "PagerDuty", "AWS Console", "Datadog", "Slack", "GitHub", "Jira", "Confluence"],
    section: "systems",
  },
  {
    id: "6",
    type: "text",
    question: "How do you access the production payment systems?",
    helper: "Include any VPN requirements, credentials locations, or special access procedures",
    section: "systems",
  },
  {
    id: "7",
    type: "text",
    question: "What are the most common issues that occur with the payment system?",
    helper: "Include symptoms, root causes, and typical resolution steps",
    section: "issues",
  },
  {
    id: "8",
    type: "ai-followup",
    question:
      "You mentioned PagerDuty for incident management. Can you explain the escalation process for critical payment failures?",
    isAiFollowup: true,
    section: "issues",
  },
  {
    id: "9",
    type: "video",
    question: "Walk us through how you debug a failed payment transaction.",
    helper: "Videos are automatically transcribed and searchable",
    section: "videos",
  },
  {
    id: "10",
    type: "file",
    question: "Upload any relevant documentation, diagrams, or screenshots.",
    helper: "This could include architecture diagrams, runbooks, or reference documents",
    section: "videos",
  },
]

export default function CapturePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [customOption, setCustomOption] = useState("")

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  const incentiveTotal = 500
  const incentiveUnlocked = Math.floor((currentQuestionIndex / totalQuestions) * incentiveTotal)

  const currentSection = sections.find((s) => s.id === currentQuestion.section)
  const completedSections = sections.filter((section) => {
    const sectionQuestions = questions.filter((q) => q.section === section.id)
    const firstQuestionIndex = questions.findIndex((q) => q.section === section.id)
    return currentQuestionIndex > firstQuestionIndex + sectionQuestions.length - 1
  })

  const currentSectionIndex = sections.findIndex((s) => s.id === currentQuestion.section)

  const handleTextChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleOptionToggle = (option: string) => {
    const current = selectedOptions[currentQuestion.id] || []
    const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option]
    setSelectedOptions({ ...selectedOptions, [currentQuestion.id]: updated })
  }

  const handleAddCustomOption = () => {
    if (customOption.trim()) {
      handleOptionToggle(customOption.trim())
      setCustomOption("")
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const startRecording = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setHasRecording(true)
    }, 3000)
  }

  const reRecord = () => {
    setHasRecording(false)
    setIsRecording(false)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const goToSection = (sectionId: string) => {
    const index = questions.findIndex((q) => q.section === sectionId)
    if (index !== -1) {
      setCurrentQuestionIndex(index)
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-200 lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-xl font-semibold tracking-tight">Nolly</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sections.map((section, index) => {
              const isCompleted = completedSections.includes(section)
              const isCurrent = index === currentSectionIndex

              return (
                <button
                  key={section.id}
                  onClick={() => goToSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors",
                    isCurrent
                      ? "bg-primary/10 text-primary font-medium"
                      : isCompleted
                        ? "text-muted-foreground hover:bg-muted/50"
                        : "text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : isCurrent ? (
                    <div className="h-4 w-4 rounded-full border-2 border-primary" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                  {section.name}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-4 h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Step {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <Progress value={progress} className="w-32 h-2" />
              </div>
            </div>
            <Badge variant="secondary" className="gap-1.5 bg-chart-4/10 text-chart-4 border-chart-4/20">
              <DollarSign className="h-3.5 w-3.5" />
              <span>${incentiveUnlocked} unlocked</span>
              <span className="text-chart-4/60">/ ${incentiveTotal}</span>
            </Badge>
          </div>
        </header>

        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <Card className="w-full max-w-2xl border-border">
            <CardContent className="p-6 md:p-8">
              {/* AI Follow-up indicator */}
              {currentQuestion.isAiFollowup && (
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Based on your previous answer...</span>
                </div>
              )}

              {/* Section label */}
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">
                  {currentSection?.name}
                </Badge>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-balance">{currentQuestion.question}</h2>
              {currentQuestion.helper && <p className="text-sm text-muted-foreground mb-6">{currentQuestion.helper}</p>}

              {/* Answer Input based on type */}
              {currentQuestion.type === "text" || currentQuestion.type === "ai-followup" ? (
                <Textarea
                  placeholder="Type your answer here..."
                  value={(answers[currentQuestion.id] as string) || ""}
                  onChange={(e) => handleTextChange(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              ) : currentQuestion.type === "video" ? (
                <div className="space-y-4">
                  {!hasRecording ? (
                    <div className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed border-border">
                      <button
                        onClick={startRecording}
                        disabled={isRecording}
                        className={cn(
                          "flex h-20 w-20 items-center justify-center rounded-full transition-all",
                          isRecording
                            ? "bg-destructive animate-pulse"
                            : "bg-primary hover:bg-primary/90 hover:scale-105",
                        )}
                      >
                        <Video className="h-8 w-8 text-primary-foreground" />
                      </button>
                      <p className="mt-4 text-sm text-muted-foreground">
                        {isRecording ? "Recording..." : "Click to start recording"}
                      </p>
                      <Button variant="link" className="mt-2 text-muted-foreground">
                        Or upload a video
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
                        <div className="text-center">
                          <Video className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Video recorded (1:23)</p>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" onClick={reRecord}>
                          Re-record
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : currentQuestion.type === "multiselect" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {currentQuestion.options?.map((option) => (
                      <label
                        key={option}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer",
                          selectedOptions[currentQuestion.id]?.includes(option)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        <Checkbox
                          checked={selectedOptions[currentQuestion.id]?.includes(option) || false}
                          onCheckedChange={() => handleOptionToggle(option)}
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                    {/* Show custom added options */}
                    {selectedOptions[currentQuestion.id]
                      ?.filter((opt) => !currentQuestion.options?.includes(opt))
                      .map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-3 p-3 rounded-lg border border-primary bg-primary/5 cursor-pointer"
                        >
                          <Checkbox checked={true} onCheckedChange={() => handleOptionToggle(option)} />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add other..."
                      value={customOption}
                      onChange={(e) => setCustomOption(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddCustomOption()}
                    />
                    <Button variant="outline" onClick={handleAddCustomOption} disabled={!customOption.trim()}>
                      Add
                    </Button>
                  </div>
                </div>
              ) : currentQuestion.type === "file" ? (
                <div className="space-y-4">
                  <Label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center py-12 rounded-xl border-2 border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm font-medium">Drop files here or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">.pdf, .docx, .png, .jpg</p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.docx,.png,.jpg,.jpeg"
                    />
                  </Label>
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <span className="text-sm truncate">{file.name}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation */}
        <footer className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-4 h-16 max-w-2xl mx-auto w-full">
            <Button variant="ghost" onClick={prevQuestion} disabled={currentQuestionIndex === 0} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button variant="ghost" onClick={nextQuestion} className="text-muted-foreground">
              Skip
            </Button>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button onClick={nextQuestion} className="gap-2">
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="gap-2" asChild>
                <Link href="/">
                  Submit
                  <Check className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </footer>
      </main>
    </div>
  )
}
