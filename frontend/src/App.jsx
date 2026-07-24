  import { useState } from 'react'
  import viteLogo from './assets/vite.svg'
  import heroImg from './assets/hero.png'
  import Landing from "./pages/landing/landing"
import AppRoutes from "./routes/AppRoutes";
import AppBootstrap from './AppBootstrap';

function App() {
    return(
      <>
      <AppRoutes />;
      <AppBootstrap />;
</>
    );
}

export default App;

