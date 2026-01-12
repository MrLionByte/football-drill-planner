import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DrillProvider } from '@/context/DrillContext'
import DrillCategoriesPage from '@/pages/DrillCategoriesPage'
import CreateDrillPage from '@/pages/CreateDrillPage'
import DrillStepsListPage from '@/pages/DrillStepsListPage'
import CreateStepPage from '@/pages/CreateStepPage'
import DrillDesignerPage from '@/pages/DrillDesignerPage'

function App() {
  return (
    <DrillProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DrillCategoriesPage />} />
          <Route path="/create-drill" element={<CreateDrillPage />} />
          <Route path="/drill-steps" element={<DrillStepsListPage />} />
          <Route path="/create-step" element={<CreateStepPage />} />
          <Route path="/drill-designer/:stepId" element={<DrillDesignerPage />} />
        </Routes>
      </BrowserRouter>
    </DrillProvider>
  )
}

export default App;
