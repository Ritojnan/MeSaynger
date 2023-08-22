import { Outlet, ScrollRestoration } from "react-router-dom"
import Breadcrumbs from "../components/Breadcrumbs.jsx"
import Navbar from "../components/Navbar.jsx"
import Header from "../components/Header.jsx"
export default function RootLayout() {
  return (
    <div className="root-layout">
      <ScrollRestoration />
      <header>
        <Navbar/>
        <Header/>
        <Breadcrumbs />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}