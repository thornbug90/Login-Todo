import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <TodoList />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
