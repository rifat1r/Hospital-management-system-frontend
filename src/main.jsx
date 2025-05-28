import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./Routers/Index";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <div className="max-w-7xl mx-auto  h-screen">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
