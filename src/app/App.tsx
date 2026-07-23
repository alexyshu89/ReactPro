import { Outlet } from "react-router-dom";

import { Header } from "widgets/header/ui/Header";

export function App() {
  return (
    <div>
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
