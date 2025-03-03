"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import "./globals.css";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import { ToasterProvider } from "./provider/ToastProvider";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <ToasterProvider /> <Provider store={store}>{children}</Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
