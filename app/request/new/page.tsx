"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, ArrowRight, Check, CalendarIcon, Search, UserPlus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"

const steps = [
  { id: 1, name: "Select Person" },
  { id: 2, name: "Knowledge Topics" },
  { id: 3, name: "Incentive" },
  { id: 4, name: "Timeline" },
]

const employees = [
  {
    id: "1",
    name: "Marcus Chen",
    role: "Senior Engineer",
    department: "Engineering",
    avatar: "/asian-professional-man.png",
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Product Manager",
    department: "Product",
    avatar: "/professional-woman-headshot.png",
  },
  {
    id: "3",
    name: "David Park",
    role: "DevOps Contractor",
    department: "Infrastructure",
    avatar: "/korean-professional-man.png",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Data Analyst",
    department: "Analytics",
    avatar: "/latina-professional-woman.png",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "UX Designer",
    department: "Design",
    avatar: "/blonde-professional-woman.png",
  },
]

const suggestedPrompts = [
  "Development process",
  "Key contacts",
  "Common issues",
  "Maintenance procedures",
  "Access & credentials",
  "Documentation locations",
  "System architecture",
  "Deployment steps",
]

export default function NewRequestPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPerson, setSelectedPerson] = useState<(typeof employees)[0] | null>(null)
  const [isExternalPerson, setIsExternalPerson] = useState(false)
  const [externalEmail, setExternalEmail] = useState("")
  const [externalName, setExternalName] = useState("")
  const [topicName, setTopicName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([])
  const [includeStandardQuestions, setIncludeStandardQuestions] = useState(true)
  const [offerBonus, setOfferBonus] = useState(false)
  const [bonusAmount, setBonusAmount] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>()
  const [reminderFrequency, setReminderFrequency] = useState("weekly")

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const togglePrompt = (prompt: string) => {
    setSelectedPrompts((prev) => (prev.includes(prompt) ? prev.filter((p) => p !== prompt) : [...prev, prompt]))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPerson || (isExternalPerson && externalEmail && externalName)
      case 2:
        return topicName.trim().length > 0
      case 3:
        return true
      case 4:
        return dueDate !== undefined
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < 4 && canProceed()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl px-4 py-8 md:px-6">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 gap-2 text-muted-foreground" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight">Create Knowledge Request</h1>
          <p className="text-muted-foreground">Request knowledge documentation from an employee or contractor</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[320px]">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-medium transition-colors",
                      currentStep > step.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep === step.id
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {currentStep > step.id ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : step.id}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-[10px] sm:text-xs font-medium text-center max-w-[60px] sm:max-w-none",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("mx-2 sm:mx-4 h-0.5 w-6 sm:w-16 lg:w-24", currentStep > step.id ? "bg-primary" : "bg-border")} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-border">
          <CardContent className="p-6">
            {/* Step 1: Select Person */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Select Person</h2>
                  <p className="text-sm text-muted-foreground">
                    Choose the employee or contractor who will document their knowledge
                  </p>
                </div>

                {!isExternalPerson ? (
                  <>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, role, or department..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredEmployees.map((person) => (
                        <button
                          key={person.id}
                          onClick={() => setSelectedPerson(person)}
                          className={cn(
                            "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                            selectedPerson?.id === person.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50 hover:bg-muted/50",
                          )}
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {person.role} · {person.department}
                            </p>
                          </div>
                          {selectedPerson?.id === person.id && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                              <Check className="h-4 w-4 text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full gap-2 bg-transparent"
                      onClick={() => {
                        setIsExternalPerson(true)
                        setSelectedPerson(null)
                      }}
                    >
                      <UserPlus className="h-4 w-4" />
                      Add external person
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">External Person</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsExternalPerson(false)
                          setExternalEmail("")
                          setExternalName("")
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="external-name">Full Name</Label>
                        <Input
                          id="external-name"
                          placeholder="John Doe"
                          value={externalName}
                          onChange={(e) => setExternalName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="external-email">Email Address</Label>
                        <Input
                          id="external-email"
                          type="email"
                          placeholder="contractor@example.com"
                          value={externalEmail}
                          onChange={(e) => setExternalEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Knowledge Topics */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">What Knowledge?</h2>
                  <p className="text-sm text-muted-foreground">Specify what knowledge you need documented</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic-name">Topic / Project Name</Label>
                  <Input
                    id="topic-name"
                    placeholder="e.g., Payment Gateway Integration"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">What do you need documented?</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the specific knowledge you need captured..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Suggested Topics</Label>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <Badge
                        key={prompt}
                        variant={selectedPrompts.includes(prompt) ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer transition-colors",
                          selectedPrompts.includes(prompt)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-muted",
                        )}
                        onClick={() => togglePrompt(prompt)}
                      >
                        {prompt}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="standard-questions">Include standard knowledge questions</Label>
                    <p className="text-sm text-muted-foreground">
                      AI-curated questions based on the person&apos;s role
                    </p>
                  </div>
                  <Switch
                    id="standard-questions"
                    checked={includeStandardQuestions}
                    onCheckedChange={setIncludeStandardQuestions}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Incentive */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Completion Incentive</h2>
                  <p className="text-sm text-muted-foreground">Optionally offer a bonus for thorough documentation</p>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="offer-bonus">Offer completion bonus</Label>
                    <p className="text-sm text-muted-foreground">Released upon approval of submitted knowledge</p>
                  </div>
                  <Switch id="offer-bonus" checked={offerBonus} onCheckedChange={setOfferBonus} />
                </div>

                {offerBonus && (
                  <div className="space-y-2">
                    <Label htmlFor="bonus-amount">Bonus Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="bonus-amount"
                        type="number"
                        placeholder="500"
                        value={bonusAmount}
                        onChange={(e) => setBonusAmount(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The bonus will be released once the knowledge submission is approved
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Timeline */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Timeline & Reminders</h2>
                  <p className="text-sm text-muted-foreground">Set the deadline and reminder preferences</p>
                </div>

                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dueDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
                  <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="every-other-day">Every Other Day</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="none">No Reminders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Review Summary */}
                <div className="rounded-xl border border-border p-4 space-y-4">
                  <h3 className="font-medium">Review Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Person</span>
                      <span>{selectedPerson?.name || externalName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Topic</span>
                      <span>{topicName}</span>
                    </div>
                    {offerBonus && bonusAmount && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Incentive</span>
                        <span className="text-primary">${bonusAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due Date</span>
                      <span>{dueDate ? format(dueDate, "PPP") : "Not set"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {currentStep < 4 ? (
            <Button onClick={nextStep} disabled={!canProceed()} className="gap-2">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button disabled={!canProceed()} className="gap-2" asChild>
              <Link href="/">
                Send Request
                <Check className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
