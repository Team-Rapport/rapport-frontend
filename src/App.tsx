import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DesignSystem from './pages/DesignSystem'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="p-8 font-sans text-neutral-800">rapport</div>} />
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </BrowserRouter>
  )
}
