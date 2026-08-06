import { AppRoutes } from "app/AppRoutes";

import { Header } from "widgets/header/ui/Header";

import { AuthProvider } from "features/authRouting/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
