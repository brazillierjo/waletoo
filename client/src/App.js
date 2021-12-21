import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UidContext } from './components/AppContext'
import { useDispatch } from 'react-redux'
import { getUser } from './actions/user.actions'
import axios from 'axios'
import Modal from 'react-modal'

// components
import Nav from './components/Navbar'
import Home from './pages/Home'
import Waletoo from './pages/Waletoo'
import Account from './pages/Account'
import Connexion from './pages/Connexion'
import ErrorPage from './pages/ErrorPage'
import Dropdown from './components/Dropdown'
import Footer from './components/Footer'
import Balance from './pages/Balance'

Modal.setAppElement('#root')

function App() {
  // mobile navbar
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  // jwt
  const [uid, setUid] = useState(null)

  //redux store
  const dispatch = useDispatch()

  // hide mobile menu
  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', hideMenu)
    return () => {
      window.removeEventListener('resize', hideMenu)
    }
  })

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `http://localhost:3001/jwtid`,
        withCredentials: true
      }).then((res) => setUid(res.data))
        .catch(() => console.log('Aucun token d\'authentification'))
    }

    fetchToken()
    if (uid) dispatch(getUser(uid))
  }, [uid, dispatch])

  return (
    <UidContext.Provider value={uid}>
      <Router>
        <Nav toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/waletoo" exact component={Waletoo} />
          <Route path="/connexion" exact component={Connexion} />
          <Route path="/mon-profile" exact component={Account} />
          <Route path="/balance" exact component={Balance} />
          <Route path="/" component={ErrorPage}></Route>
        </Switch>

        <Footer />
      </Router>
    </UidContext.Provider>
  );
}

export default App;
