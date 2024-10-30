import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { SWRConfig } from "swr";
import { PokemonDetail } from "./pages/pokemonDetail.tsx";
import { SearchPage } from "./pages/search.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetail />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
]);

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  // We still use the map for write & read for performance.
  return map;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig value={{ provider: localStorageProvider as any }}>
      <RouterProvider router={router} />
    </SWRConfig>
  </React.StrictMode>
);
