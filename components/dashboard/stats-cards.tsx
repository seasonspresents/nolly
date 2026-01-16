import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle2, Database, AlertCircle } from "lucide-react"

const stats = [
  {
    label: "Active Requests",
    value: "8",
    icon: Clock,
    trend: "+2 this week",
  },
  {
    label: "Completed",
    value: "24",
    icon: CheckCircle2,
    trend: "+5 this month",
  },
  {
    label: "Knowledge Entries",
    value: "156",
    icon: Database,
    trend: "12 new this week",
  },
  {
    label: "Pending Review",
    value: "3",
    icon: AlertCircle,
    trend: "Needs attention",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.trend}</span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
