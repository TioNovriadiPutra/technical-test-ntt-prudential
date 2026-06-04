import { BrowserRouter } from "react-router";
import { Flex } from "./components/shared";
import { useAuth } from "./stores/auth.store";
import AppRouter from "./routers/AppRouter";
import AuthRouter from "./routers/AuthRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/config/reactQuery";
import { Toast } from "./components/custom";
import { useEffect } from "react";

const App = () => {
  const { access, checkIsLoggedIn } = useAuth();

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  return (
    <Flex className="w-dvw h-dvh overflow-hidden">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{access ? <AppRouter /> : <AuthRouter />}</BrowserRouter>
      </QueryClientProvider>

      <Toast />
    </Flex>
  );
};

export default App;
