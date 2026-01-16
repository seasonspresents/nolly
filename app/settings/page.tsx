"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Check, Upload, FileText, Loader2, CheckCircle2, FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface Integration {
  id: string
  name: string
  icon: string
  connected: boolean
  documents?: { id: string; name: string; type: string }[]
}

const integrations: Integration[] = [
  {
    id: "google-docs",
    name: "Google Docs",
    icon: "/google-docs-logo.png",
    connected: false,
  },
  {
    id: "notion",
    name: "Notion",
    icon: "/notion-logo.png",
    connected: true,
    documents: [
      { id: "1", name: "Engineering Wiki", type: "page" },
      { id: "2", name: "Onboarding Guide", type: "page" },
      { id: "3", name: "API Documentation", type: "database" },
      { id: "4", name: "Team Directory", type: "database" },
      { id: "5", name: "Project Roadmap", type: "page" },
    ],
  },
  {
    id: "confluence",
    name: "Confluence",
    icon: "/confluence-logo.png",
    connected: false,
  },
]

type ImportStatus = "idle" | "importing" | "complete"

export default function SettingsPage() {
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(["notion"])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [importStatus, setImportStatus] = useState<ImportStatus>("idle")
  const [importProgress, setImportProgress] = useState(0)

  const handleConnect = (integrationId: string) => {
    setConnectedIntegrations([...connectedIntegrations, integrationId])
  }

  const handleDisconnect = (integrationId: string) => {
    setConnectedIntegrations(connectedIntegrations.filter((id) => id !== integrationId))
  }

  const toggleDocument = (docId: string) => {
    setSelectedDocuments((prev) => (prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId]))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)])
    }
  }

  const handleImport = () => {
    setImportStatus("importing")
    setImportProgress(0)

    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setImportStatus("complete")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const totalToImport = selectedDocuments.length + uploadedFiles.length

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8 md:px-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage integrations and import existing documentation</p>
        </div>

        {/* Import Documentation Section */}
        <Card className="border-border mb-8">
          <CardHeader>
            <CardTitle>Import Documentation</CardTitle>
            <CardDescription>Bring in existing knowledge from other tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Integration Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {integrations.map((integration) => {
                const isConnected = connectedIntegrations.includes(integration.id)
                return (
                  <div
                    key={integration.id}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-xl border transition-all",
                      isConnected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                    )}
                  >
                    <img
                      src={integration.icon || "/placeholder.svg"}
                      alt={integration.name}
                      className="h-10 w-10 rounded-lg"
                    />
                    <span className="text-sm font-medium">{integration.name}</span>
                    {isConnected ? (
                      <Button variant="outline" size="sm" onClick={() => handleDisconnect(integration.id)}>
                        <Check className="h-4 w-4 mr-1" />
                        Connected
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleConnect(integration.id)}>
                        Connect
                      </Button>
                    )}
                  </div>
                )
              })}

              {/* Upload Files Card */}
              <label
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-xl border border-dashed cursor-pointer transition-all",
                  "border-border hover:border-primary/50 hover:bg-muted/50",
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">Upload Files</span>
                <span className="text-xs text-muted-foreground">.md, .docx, .pdf</span>
                <input type="file" multiple className="hidden" accept=".md,.docx,.pdf" onChange={handleFileUpload} />
              </label>
            </div>

            {/* Connected Integration Documents */}
            {connectedIntegrations.includes("notion") && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Select documents from Notion</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {integrations
                    .find((i) => i.id === "notion")
                    ?.documents?.map((doc) => (
                      <label
                        key={doc.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                          selectedDocuments.includes(doc.id)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        <Checkbox
                          checked={selectedDocuments.includes(doc.id)}
                          onCheckedChange={() => toggleDocument(doc.id)}
                        />
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                          {doc.type === "database" ? (
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <span className="text-sm">{doc.name}</span>
                      </label>
                    ))}
                </div>
              </div>
            )}

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Uploaded files</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-background">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Import Button */}
            {totalToImport > 0 && importStatus === "idle" && (
              <Button onClick={handleImport} className="w-full">
                Import {totalToImport} {totalToImport === 1 ? "document" : "documents"}
              </Button>
            )}

            {/* Import Progress */}
            {importStatus === "importing" && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-sm">Organizing and indexing your documentation...</span>
                </div>
                <Progress value={importProgress} className="h-2" />
              </div>
            )}

            {/* Import Complete */}
            {importStatus === "complete" && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-chart-2/10 text-chart-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {totalToImport} documents imported and added to Knowledge Base
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-sm font-medium">Email notifications</p>
                <p className="text-xs text-muted-foreground">Receive updates about knowledge requests</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="text-sm font-medium">Team members</p>
                <p className="text-xs text-muted-foreground">Manage who can access Nolly</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">API access</p>
                <p className="text-xs text-muted-foreground">Generate API keys for integrations</p>
              </div>
              <Button variant="outline" size="sm">
                Generate Key
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
