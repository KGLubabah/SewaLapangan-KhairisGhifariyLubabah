import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// Load Navbar
import Navbar from "./component/Navbar";
// Load halaman
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import Member from "./page/Member";
import Lapangan from "./page/Lapangan";
import Profil from "./page/Profil";
import Sewa from "./page/Sewa";


class Utama extends Component {
  render = () => {
    return (
      <Switch>
        {/* Load component tiap halaman */}
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>

        <Route path="/home">
          <Navbar />
          <Home />
        </Route>

        <Route path="/member">
          <Navbar />
          <Member />
        </Route>

        <Route path="/lapangan">
          <Navbar />
          <Lapangan />
        </Route>

        <Route path="/myprofil">
          <Navbar />
          <Profil />
        </Route>

        <Route path="/sewa">
          <Navbar />
          <Sewa />
        </Route>

      </Switch>
    );
  }
}

export default Utama;
