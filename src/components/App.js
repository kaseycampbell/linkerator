import React, { useState, useEffect } from "react";
import { Header, SideNav, LinkCard } from "./index";
import { getSomething } from "../api";
import '../css/style.css'

const App = () => {
  const [message, setMessage] = useState("");
  const [links, setLinks] = useState([]);

  // useEffect( async () => {
  //   const response = await fetch();
  //   const links = response.json();
  //   console.log({links});
  // })

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <Header />
      <SideNav />
      <div className="cards">
        <LinkCard />
      </div>
    </div>
  );
};

export default App;
