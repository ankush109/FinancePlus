"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AuthProvider from "./AuthProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { ToasterProvider } from "./ToastProvider";

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
      </Provider>
    </ReactQueryProvider>
  );
}
