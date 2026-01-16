import { Header } from "@/components/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ActiveRequestsTable } from "@/components/dashboard/active-requests-table"
import { RecentKnowledge } from "@/components/dashboard/recent-knowledge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Knowledge Transfers</h1>
            <p className="text-muted-foreground">Capture and preserve institutional knowledge</p>
          </div>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/request/new">
              <Plus className="h-4 w-4" />
              New Request
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-8">
          <StatsCards />
          <ActiveRequestsTable />
          <RecentKnowledge />
        </div>
      </main>
    </div>
  )
}
