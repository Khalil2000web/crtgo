// app/page.js
// app/page.js
import { Noto_Sans_Arabic, Zain } from "next/font/google";

const notoArabic = Noto_Sans_Arabic({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["arabic"],
  display: "swap",
});

const zain = Zain({
  weight: ["200","300","400","700","800","900"],
  style: ["normal", "italic"],
  subsets: ["arabic"],
  display: "swap",
});

export default function Page() {
  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-50 ${notoArabic.className}`}
    >
      <h1 className="text-5xl text-center">
        مرحبًا   
      </h1>
    </div>
  );
}