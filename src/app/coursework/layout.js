import Sidebar from "@/components/Sidebar";

export default function CourseworkLayout({ children }) {
  return (
    <div className="flex size-full xl:space-x-2">
      <Sidebar />
      {children}
      {/* left sidebar */}
    </div>
  );
}
