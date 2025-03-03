"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./globals.css";
import ReactQueryProvider from "./provider/ReactQueryProvider";
import { ToasterProvider } from "./provider/ToastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ToasterProvider /> <Provider store={store}>{children}</Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
