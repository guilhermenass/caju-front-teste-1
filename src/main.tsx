import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <App />
  </QueryClientProvider>
);
