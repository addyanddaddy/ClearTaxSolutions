"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/ui/MobileStickyBar";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <MobileStickyBar />
      <ExitIntentPopup />
    </>
  );
}
