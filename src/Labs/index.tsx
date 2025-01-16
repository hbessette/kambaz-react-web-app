import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router-dom";
import TOC from "./TOC/index.tsx";
import Lab2 from "./Lab2/index.tsx";
import Lab3 from "./Lab3/index.tsx";
export default function Labs() {
  return (
    <div>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
