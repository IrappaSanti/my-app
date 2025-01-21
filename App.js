import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import Home from './components/Home'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import NotFound from './components/NotFound'
import ThemeContext from './context/ThemeContext'

import './App.css'

class App extends Component {
  state = {
    isDark: true,
  }

  changeTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  render() {
    const {isDark} = this.state
    return (
      <ThemeContext.Provider value={{isDark, changeTheme: this.changeTheme}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={UserDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
