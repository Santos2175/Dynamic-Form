import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { formSchema } from './schema/Schema.ts';
import DynamicForm from './components/Form/DynamicForm.tsx';
import SubmittedData from './components/Form/SubmittedData.tsx';

function App() {
  return (
    <div className='container mx-auto p-8 bg-slate-300 min-h-screen'>
      <Router>
        <Routes>
          <Route path='/' element={<DynamicForm schema={formSchema} />} />
          <Route path='/submitted-data' element={<SubmittedData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
