import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {BsSearch, BsFilterLeft} from 'react-icons/bs'

import UserItem from '../UserItem'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Users extends Component {
  state = {
    usersList: [],
    isLoading: true,
    search: '',
    orderState: 'A - Z',
  }

  componentDidMount() {
    this.getUsersData()
  }

  selectedState = event => {
    const filterBasedonState = event.target.value
    this.setState(
      {
        orderState: filterBasedonState,
      },
      this.getUsersData,
    )
  }

  searchInput = event => {
    const storeIn = event.target.value
    this.setState({
      search: storeIn,
    })
  }

  searchbtn = () => {
    this.getUsersData()
  }

  getUsersData = async () => {
    const {orderState} = this.state
    let sortedItems

    const apiUrl = `https://jsonplaceholder.typicode.com/users`

    const Resp = await fetch(apiUrl)

    const data = await Resp.json()

    if (orderState === 'A - Z') {
      sortedItems = [...data].sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    } else {
      sortedItems = [...data]
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
        .reverse()
    }

    this.setState({
      usersList: sortedItems,
      isLoading: false,
    })
  }

  render() {
    const {usersList, isLoading, search} = this.state
    const filterList = usersList.filter(each =>
      each.name.toLowerCase().includes(search.toLowerCase()),
    )
    const l = filterList.length === 0

    return (
      <div>
        <Header />
        <ThemeContext.Consumer>
          {value => {
            const {isDark} = value
            const bgThem = isDark ? 'jobMain1' : 'jobMain2'
            const srcTheme = isDark ? 'searchEle1' : 'searchEle2'
            const srcDiv = isDark ? 'serhDiv1' : 'serhDiv2'
            return (
              <div className={bgThem}>
                <div className="rSide">
                  <div className="searchAndDrop">
                    <div className={srcDiv}>
                      <input
                        placeholder="Search Name"
                        onChange={this.searchInput}
                        className={srcTheme}
                        onKeyDown={this.keyDownFunc}
                        type="search"
                      />
                      <button
                        className="searchbtn"
                        onClick={this.searchbtn}
                        type="button"
                        data-testid="searchButton"
                      >
                        <BsSearch
                          className={isDark ? 'search-icon1' : 'search-icon2'}
                        />
                      </button>
                    </div>
                    <div className="lSide">
                      <div className="sortDiv">
                        <BsFilterLeft className="sortIcon" />
                        <h1 className="paraP">Sort</h1>
                      </div>
                      <select
                        onChange={this.selectedState}
                        className="dropDown"
                      >
                        <option>A - Z</option>
                        <option>Z - A</option>
                      </select>
                    </div>
                  </div>
                  {isLoading ? (
                    <div className="rSideLoader">
                      <div className="loader-container" data-testid="loader">
                        <Loader
                          type="ThreeDots"
                          color="#ffffff"
                          height="50"
                          width="50"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="rSide">
                      {l ? (
                        <div className="rSideLoader">
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                            alt="no jobs"
                          />
                          <h1 className="headL">No User Found</h1>
                          <p className="paraP">We could not find any user.</p>
                        </div>
                      ) : (
                        <div>
                          <ul className="rJobDiv">
                            {filterList.map(each => (
                              <UserItem each={each} key={each.id} />
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          }}
        </ThemeContext.Consumer>
      </div>
    )
  }
}

export default Users
