import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Eye } from "lucide-react"
import Link from "next/link"

const recentKnowledge = [
  {
    id: "1",
    title: "Payment Gateway Integration",
    contributor: {
      name: "Marcus Chen",
      avatar: "/asian-professional-man.png",
    },
    date: "Jan 14, 2026",
  },
  {
    id: "2",
    title: "CI/CD Pipeline Setup",
    contributor: {
      name: "David Park",
      avatar: "/korean-professional-man.png",
    },
    date: "Jan 12, 2026",
  },
  {
    id: "3",
    title: "User Authentication Flow",
    contributor: {
      name: "Lisa Thompson",
      avatar: "/blonde-professional-woman.png",
    },
    date: "Jan 10, 2026",
  },
  {
    id: "4",
    title: "Database Optimization Guide",
    contributor: {
      name: "Alex Kumar",
      avatar: "/indian-professional-man.png",
    },
    date: "Jan 8, 2026",
  },
]

export function RecentKnowledge() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Recent Knowledge</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
          <Link href="/knowledge">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {recentKnowledge.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
            >
              <h3 className="font-medium leading-tight">{item.title}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={item.contributor.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {item.contributor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{item.contributor.name}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Button variant="outline" size="sm" className="h-8 gap-1.5 bg-transparent" asChild>
                  <Link href={`/knowledge/${item.id}`}>
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1.5 bg-transparent" asChild>
                  <Link href={`/knowledge?ask=${item.id}`}>
                    <Sparkles className="h-3.5 w-3.5" />
                    Ask AI
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
