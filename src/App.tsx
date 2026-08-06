import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Today from './pages/Today';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout.. />}>
        <Route index element={<Today />} />
      </Route>
    </Routes>
  );
}
