"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AuthProvider from "./AuthProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { ToasterProvider } from "./ToastProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ToasterProvider />{" "}
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </ReactQueryProvider>
  );
}
