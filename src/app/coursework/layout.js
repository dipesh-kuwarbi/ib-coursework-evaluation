import Sidebar from "@/components/Sidebar";

export default function CourseworkLayout({ children }) {
  return (
    <div className="flex size-full xl:space-x-2">
      <Sidebar />
      <div className="relative flex-1 rounded-t-3xl md:rounded-tr-none">
        <main className="flex min-h-[calc(100lvh-60px)] flex-1 flex-col items-start justify-center gap-10 bg-gray-background px-2 py-[80px] font-mont sm:min-h-lvh sm:px-0 md:py-[100px]">
          {children}
        </main>
      </div>
      {/* left sidebar */}
    </div>
  );
}
