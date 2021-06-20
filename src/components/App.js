import React, { useState, useEffect } from "react";
import { Header, SideNav, LinkCard } from "./index";
import { getSomething } from "../api";
import '../css/style.css'

const App = () => {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState('')
  const [sortOption, setSortOption] = useState('');

  // useEffect( async () => {
  //   const response = await fetch();
  //   const links = response.json();
  //   console.log({links});
  // })

  useEffect(async () => {
    fetchAPI('/routes/links')
      .then((resp) => {
        console.log("Here are the links:", resp)
        let sortedList = resp.sort((a, b) => (a.clickcount > b.clickcount)? -1: 1);
        setLinks(sortedList);
      })
      .catch(console.error);
  }, []);
  
  useEffect(async () => {
  fetchAPI('/routes/tags')
    .then((data) => {
      console.log(data)
      setTagList(data)
    })
    .catch(console.error)
}, [])



  function filteredLinks() {
    if (searchOption === 'Tags') {
      return links.filter((_link) => {
        let tags = _link.tags.map((tag) => {
          return tag.tag;
        })
        if (tags.join(', ').includes(search)) {
          return _link;
        }
      })
    }
    return links.filter((_link) => {
      return _link.link.includes(search.toLowerCase());
    });
  }

  return (
  <Route path='/'>
  <SearchBar 
    search={search}
    setSearch={setSearch}
    setSearchOption={setSearchOption}
    searchOption={searchOption}
    sortOption={sortOption}
    setSortOption={setSortOption}
    links={links}
    setLinks={setLinks}/>
  <LinkTable
    links={filteredLinks()}
    setSearch={setSearch}
    setLinks={setLinks}/>
</Route>
)
};

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
