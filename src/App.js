import { RouterProvider } from "react-router";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/authContext";
import { router } from "./routes";
import { ToastContextProvider } from "./context/ToastContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnmount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextProvider>
        <Navbar />
        <RouterProvider router={router} />
      </ToastContextProvider>
    </QueryClientProvider>
  );
}

export default App;
