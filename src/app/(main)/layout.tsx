import Navbar from "@/app/_components/Navbar";
import Sidebar from "@/app/_components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 shrink-0 border-r border-border bg-sidebar">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto bg-muted/20 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
