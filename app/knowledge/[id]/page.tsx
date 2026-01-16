"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Sparkles,
  Download,
  MessageSquare,
  Check,
  Edit,
  Play,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const sections = [
  { id: "summary", name: "AI Summary", icon: Sparkles },
  { id: "admin", name: "Admin Questions" },
  { id: "overview", name: "Project Overview" },
  { id: "contacts", name: "Key Contacts" },
  { id: "systems", name: "Systems & Access" },
  { id: "videos", name: "Video Walkthroughs" },
  { id: "attachments", name: "Attachments" },
]

const keyTakeaways = [
  "Primary payment processor is Stripe with a fallback to PayPal for certain regions",
  "On-call rotation includes Marcus, Sarah, and David with a 15-minute SLA for critical issues",
  "Payment retries use exponential backoff with a maximum of 3 attempts over 24 hours",
  "All payment events are logged to Datadog and monitored for anomalies",
  "Access to production systems requires VPN and 2FA through Okta",
]

const systemTags = ["Stripe Dashboard", "PagerDuty", "AWS Console", "Datadog", "Slack", "GitHub"]

const attachments = [
  { name: "payment-architecture.pdf", size: "2.4 MB" },
  { name: "runbook-payment-failures.md", size: "45 KB" },
  { name: "stripe-webhook-config.json", size: "12 KB" },
]

export default function KnowledgeEntryPage() {
  const [activeSection, setActiveSection] = useState("summary")
  const [transcriptExpanded, setTranscriptExpanded] = useState(false)

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container px-4 py-8 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-1">
              <Button variant="ghost" className="mb-4 gap-2 text-muted-foreground w-full justify-start" asChild>
                <Link href="/knowledge">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Knowledge Base
                </Link>
              </Button>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    {section.icon && <section.icon className="h-4 w-4" />}
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">Payment Gateway Integration</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/asian-professional-man.png" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Marcus Chen</span>
                        <span className="text-xs text-muted-foreground">Senior Engineer</span>
                      </div>
                    </div>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground">Jan 14, 2026</span>
                    <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
                      Approved
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                    <Edit className="h-4 w-4" />
                    Request Revisions
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button size="sm" className="gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    Ask AI about this
                  </Button>
                </div>
              </div>
            </div>

            {/* AI Summary Section */}
            <section id="summary" className="mb-8">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Key Takeaways</h2>
                  </div>
                  <ul className="space-y-3">
                    {keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Admin Questions Section */}
            <section id="admin" className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Admin Questions</h2>
              <Card className="border-border">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      What is the most critical thing someone needs to know about this project?
                    </h3>
                    <p className="text-sm leading-relaxed">
                      The payment gateway has a hard dependency on Stripe&apos;s webhook system. If webhooks stop
                      working, payments will appear to fail even though they&apos;re successful on Stripe&apos;s side.
                      Always check the webhook dashboard first when debugging payment issues.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Project Overview Section */}
            <section id="overview" className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Project Overview</h2>
              <Card className="border-border">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Describe the Payment Gateway Integration project in your own words.
                    </h3>
                    <p className="text-sm leading-relaxed">
                      The Payment Gateway Integration handles all payment processing for our platform. It&apos;s built
                      on Stripe as the primary processor with PayPal as a fallback for regions where Stripe isn&apos;t
                      available. The system handles subscription billing, one-time payments, refunds, and payment
                      disputes.
                    </p>
                    <p className="text-sm leading-relaxed mt-3">
                      The architecture follows an event-driven pattern where Stripe webhooks trigger internal events
                      that update order status, send notifications, and sync with our analytics pipeline. All payment
                      events are logged to Datadog for monitoring and debugging.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Key Contacts Section */}
            <section id="contacts" className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Key Contacts</h2>
              <Card className="border-border">
                <CardContent className="p-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Who should someone contact when the Payment Gateway system has issues?
                    </h3>
                    <p className="text-sm leading-relaxed">
                      For critical issues, page the on-call engineer via PagerDuty. The rotation includes:
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/asian-professional-man.png" />
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Marcus Chen - Primary contact, system architect</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/professional-woman-headshot.png" />
                          <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Sarah Williams - Product owner, escalations</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/korean-professional-man.png" />
                          <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">David Park - Infrastructure, DevOps support</span>
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-3">
                      For non-critical issues, post in #payments-support on Slack.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Systems & Access Section */}
            <section id="systems" className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Systems & Access</h2>
              <Card className="border-border">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Systems used for this project</h3>
                    <div className="flex flex-wrap gap-2">
                      {systemTags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      How do you access the production payment systems?
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Access to production systems requires VPN connection (use GlobalProtect with your Okta
                      credentials). Once on VPN, you can access the Stripe Dashboard with the shared team account
                      (credentials in 1Password under &quot;Payments Team&quot;). AWS Console access is through SSO -
                      click &quot;AWS&quot; in Okta and select the payments-prod role.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Video Walkthroughs Section */}
            <section id="videos" className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Video Walkthroughs</h2>
              <Card className="border-border">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Debugging a failed payment transaction
                    </h3>
                    <div className="aspect-video rounded-xl bg-muted flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <button className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        <Play className="h-6 w-6 ml-1" />
                      </button>
                      <span className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                        8:42
                      </span>
                    </div>
                    <button
                      onClick={() => setTranscriptExpanded(!transcriptExpanded)}
                      className="mt-3 flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      {transcriptExpanded ? (
                        <>
                          Hide transcript <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show transcript <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    {transcriptExpanded && (
                      <div className="mt-3 p-4 rounded-lg bg-muted text-sm leading-relaxed">
                        <p>
                          Okay, so when you get a report of a failed payment, the first thing you want to do is check
                          the Stripe Dashboard. Go to Payments, then filter by the customer email or payment ID...
                        </p>
                        <p className="mt-2 text-muted-foreground">[Transcript continues...]</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Attachments Section */}
            <section id="attachments" className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Attachments</h2>
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {attachments.map((file) => (
                      <div key={file.name} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{file.size}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
