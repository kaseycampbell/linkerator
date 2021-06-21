import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Header, SideNav, LinkCard, Auth, AddLink, EditLink } from "./index";
import "../css/style.css";

const App = () => {
  const [links, setLinks] = useState([]);

  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState('')
  const [sortOption, setSortOption] = useState('');
  const [user, setUser] = useState("");
  const [linkToUpdate, setLinkToUpdate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const token = localStorage.getItem("token") || null;


  const history = useHistory();
  useEffect(() => {
    return () => {
      if (history && history.action === "POP") {
        window.location.reload();
      }
    };
  });

//   useEffect(async () => {
//     fetchAPI('/routes/links')
//       .then((resp) => {
//         console.log("Here are the links:", resp)
//         let sortedList = resp.sort((a, b) => (a.clickcount > b.clickcount)? -1: 1);
//         setLinks(sortedList);
//       })
//       .catch(console.error);
//   }, []);
  
//   useEffect(async () => {
//   fetchAPI('/routes/tags')
//     .then((data) => {
//       console.log(data)
//       setTagList(data)
//     })
//     .catch(console.error)
// }, [])



//   function filteredLinks() {
//     if (searchOption === 'Tags') {
//       return links.filter((_link) => {
//         let tags = _link.tags.map((tag) => {
//           return tag.tag;
//         })
//         if (tags.join(', ').includes(search)) {
//           return _link;
//         }
//       })
//     }
//     return links.filter((_link) => {
//       return _link.link.includes(search.toLowerCase());
//     });
//   }

//   return (
//   <Route path='/'>
//   <SearchBar 
//     search={search}
//     setSearch={setSearch}
//     setSearchOption={setSearchOption}
//     searchOption={searchOption}
//     sortOption={sortOption}
//     setSortOption={setSortOption}
//     links={links}
//     setLinks={setLinks}/>
//   <LinkTable
//     links={filteredLinks()}
//     setSearch={setSearch}
//     setLinks={setLinks}/>
// </Route>
// )
// };


  useEffect(() => {
    //use token to hit /me route and setUser
    try {
      async function fetchUser() {
        const response = await fetch("/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const user = await response.json();
        //check for error message
        if (user.error) return setUser(null);
        //if no error message set user info
        setUser(user);
      }
      fetchUser();
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const fetchLinks = async (id) => {
    try {
      const response = await fetch(`/api/links/${id}`);
      const links = await response.json();
      if (links.error) return setLinks(null);
      setLinks(links);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchLinks(user.id);
  }, [user]);

  return (
    <>
      <div className="App">
        {user ? (
          <>
            <Header user={user} setUser={setUser} />
            <SideNav setShowAddModal={setShowAddModal} />
            <div className="cards">
              {links &&
                links.map((link) => {
                  return (
                    <LinkCard
                      key={link.id}
                      link={link}
                      setLinks={setLinks}
                      setShowEditModal={setShowEditModal}
                      setLinkToUpdate={setLinkToUpdate}
                    />
                  );
                })}
            </div>
          </>
        ) : (
          <Auth setUser={setUser} />
        )}
      </div>
      {showAddModal && (
        <div className="modal">
          <AddLink
            links={links}
            setLinks={setLinks}
            setShowAddModal={setShowAddModal}
          />
        </div>
      )}
      {showEditModal && (
        <div className="modal">
          <EditLink
            link={linkToUpdate}
            setShowEditModal={setShowEditModal}
            setLinks={setLinks}
          />
        </div>
      )}
    </>
  );
};

export default App;
