import React, { useState, useEffect } from "react";
import { Header, SideNav, LinkCard, Auth } from "./index";
import "../css/style.css";

const App = () => {
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState("");

  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    //use token to hit /me route and setUser
    try {
      async function fetchUser() {
        const response = await fetch("api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const user = await response.json();
        console.log({ user });
        //check for error message
        if (user.error) return setUser(null);
        //if no error message set user info
        setUser(user);
        // fetchLinks(user.id);
      }
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchLinks = async (id) => {
    try {
      const response = await fetch(`/api/links/${id}`);
      const links = await response.json();
      console.log({ links });
      if (links.error) return setLinks(null);
      setLinks(links);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(!user) return;
    fetchLinks(user.id);
  }, [user])

  // check for user and use user id to fetch links
  // useEffect(() => {
  //   try {
  //     const fetchLinks = async (id) => {
  //       try {
  //         const response = await fetch(`/api/links/${id}`);
  //         const links = await response.json();
  //         console.log({ links });
  //         if (links.error) return setLinks(null);
  //         setLinks(links);
  //         console.log("links set", links);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchLinks();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <SideNav />
          <div className="cards">
            {links &&
              links.map((link) => {
                return <LinkCard key={link.id} link={link} />;
              })}
          </div>
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
};

export default App;
