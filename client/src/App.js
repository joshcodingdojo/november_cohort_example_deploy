import logo from "./logo.svg";
import "./App.css";
import { Router } from "@reach/router";
import Form from "./components/Form";
import DisplayAll from "./components/DisplayAll";
import DisplayOne from "./components/DisplayOne";
import Edit from "./components/Edit";

function App() {
  return (
    <div>
      <Router>
        <Form path="/new" />
        <DisplayAll path="/" />
        <DisplayOne path="/restaurant/:id" />
        <Edit path="/restaurant/:id/edit" />
        {/* /restaurant/:id */}
      </Router>
    </div>
  );
}

export default App;
