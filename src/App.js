import React from 'react';
import AddData from "./components/addData"
import Datalist from "./components/Datalist"
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
function App() {
  return (
    <div className="container">
      <Router>
        <div style={{textAlign:"center", paddingTop:"20px", fontSize:"20px" }}>
          <nav className="nav-bar">
            <NavLink to="/" exact={true}
              className="Nav_link"
              activeClassName="activeRoute"
              activeStyle={{ color: 'red', padding:"20px"}}
            >Home</NavLink>
            <NavLink to="/datalist" exact={true}
              className="Nav_link"
              activeClassName="activeRoute"
              activeStyle={{ color: 'red', padding:"20px" }}
            >User List</NavLink>
          </nav>
        </div>
        <div className="parent-wrapper">
          <Route path="/" exact component={AddData} />
          <Route path="/datalist" exact component={Datalist} />
        </div>
      </Router>
    </div>
  );
}

export default App;

