import React from "react";
import { Routes, Route } from "react-router-dom";
import BaseLayout from "./Layout/BaseLayout.jsx";
import {
  BundlePage,
  ConsumptionPage,
  HeatPage,
  Err404,
  StandsPage,
  DelaysPage,
  BundlePage2,
} from "./Pages";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Err404 />} />

      <Route element={<BaseLayout />}>
        <Route path="/bundles" element={<BundlePage />} />
        <Route path="/consumption" element={<ConsumptionPage />} />
        <Route path="/heats" element={<HeatPage />} />
        <Route path="/stands" element={<StandsPage />} />
        <Route path="/delays" element={<DelaysPage />} />
        <Route path="/test" element={<BundlePage2 />} />
      </Route>
    </Routes>
  );
}

export default App;
