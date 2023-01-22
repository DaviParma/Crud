import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/search' element={<SearchPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
        <Route path='/add' element={<AddPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
