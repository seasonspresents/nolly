"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, User, Menu, X, LogOut, Settings, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Knowledge Base", href: "/knowledge" },
  { name: "Settings", href: "/settings" },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [themeSheetOpen, setThemeSheetOpen] = useState(false)
  const [profileSheetOpen, setProfileSheetOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-xl font-semibold tracking-tight">Nolly</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme Toggle Sheet */}
          <Sheet open={themeSheetOpen} onOpenChange={setThemeSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                {mounted && theme === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>Theme</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 p-4">
                <Button
                  variant={mounted && theme === "light" ? "default" : "outline"}
                  className="justify-start gap-3"
                  onClick={() => {
                    setTheme("light")
                    setThemeSheetOpen(false)
                  }}
                >
                  <Sun className="h-4 w-4" />
                  Light
                  {mounted && theme === "light" && <Check className="h-4 w-4 ml-auto" />}
                </Button>
                <Button
                  variant={mounted && theme === "dark" ? "default" : "outline"}
                  className="justify-start gap-3"
                  onClick={() => {
                    setTheme("dark")
                    setThemeSheetOpen(false)
                  }}
                >
                  <Moon className="h-4 w-4" />
                  Dark
                  {mounted && theme === "dark" && <Check className="h-4 w-4 ml-auto" />}
                </Button>
                <Button
                  variant={mounted && theme === "system" ? "default" : "outline"}
                  className="justify-start gap-3"
                  onClick={() => {
                    setTheme("system")
                    setThemeSheetOpen(false)
                  }}
                >
                  System
                  {mounted && theme === "system" && <Check className="h-4 w-4 ml-auto" />}
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Profile Sheet */}
          <Sheet open={profileSheetOpen} onOpenChange={setProfileSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/professional-headshot.png" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto">
              <SheetHeader>
                <SheetTitle>Account</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 p-4">
                <Button
                  variant="outline"
                  className="justify-start gap-3"
                  asChild
                  onClick={() => setProfileSheetOpen(false)}
                >
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-3 text-destructive hover:text-destructive"
                  onClick={() => setProfileSheetOpen(false)}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container px-4 py-4 flex flex-col gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
