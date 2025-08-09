import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-row h-[90svh] w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 min-h-0">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}