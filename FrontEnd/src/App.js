import "./App.css";
import * as Env from "./enviroments";
import Components from "./Components/Components.js";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

const App = () => {
  return <Components />;
};

export default App;
