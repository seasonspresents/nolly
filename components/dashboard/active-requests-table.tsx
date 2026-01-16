"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Eye, Bell, DollarSign } from "lucide-react"
import Link from "next/link"

const requests = [
  {
    id: "1",
    person: {
      name: "Marcus Chen",
      avatar: "/asian-professional-man.png",
      role: "Senior Engineer",
    },
    topic: "Payment Gateway Integration",
    type: "Employee Exit",
    progress: 75,
    incentive: 500,
    dueDate: "Jan 20, 2026",
  },
  {
    id: "2",
    person: {
      name: "Sarah Williams",
      avatar: "/professional-woman-headshot.png",
      role: "Product Manager",
    },
    topic: "Customer Onboarding Flow",
    type: "Project Handoff",
    progress: 45,
    incentive: null,
    dueDate: "Jan 25, 2026",
  },
  {
    id: "3",
    person: {
      name: "David Park",
      avatar: "/korean-professional-man.png",
      role: "DevOps Contractor",
    },
    topic: "Infrastructure Documentation",
    type: "Contractor",
    progress: 90,
    incentive: 750,
    dueDate: "Jan 18, 2026",
  },
  {
    id: "4",
    person: {
      name: "Emily Rodriguez",
      avatar: "/latina-professional-woman.png",
      role: "Data Analyst",
    },
    topic: "Analytics Pipeline Overview",
    type: "Periodic Review",
    progress: 20,
    incentive: null,
    dueDate: "Feb 1, 2026",
  },
]

const typeColors: Record<string, string> = {
  "Employee Exit": "bg-destructive/10 text-destructive border-destructive/20",
  "Project Handoff": "bg-primary/10 text-primary border-primary/20",
  Contractor: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  "Periodic Review": "bg-muted text-muted-foreground border-border",
}

export function ActiveRequestsTable() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Active Requests</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View all
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop table view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={request.person.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {request.person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{request.person.name}</span>
                        <span className="text-xs text-muted-foreground">{request.person.role}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{request.topic}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={typeColors[request.type]}>
                      {request.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-[140px]">
                      <Progress value={request.progress} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground w-8">{request.progress}%</span>
                      {request.incentive && (
                        <Badge variant="secondary" className="gap-1 bg-chart-4/10 text-chart-4 border-chart-4/20">
                          <DollarSign className="h-3 w-3" />
                          {request.incentive}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{request.dueDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/capture/${request.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Send Reminder</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="md:hidden divide-y divide-border">
          {requests.map((request) => (
            <div key={request.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.person.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {request.person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{request.person.name}</span>
                    <span className="text-xs text-muted-foreground">{request.person.role}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/capture/${request.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">{request.topic}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-xs ${typeColors[request.type]}`}>
                    {request.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Due {request.dueDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Progress value={request.progress} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground">{request.progress}%</span>
                {request.incentive && (
                  <Badge variant="secondary" className="gap-1 text-xs bg-chart-4/10 text-chart-4 border-chart-4/20">
                    <DollarSign className="h-3 w-3" />
                    {request.incentive}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
