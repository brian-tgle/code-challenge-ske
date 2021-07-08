import { Suspense } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Loading from 'components/loading'
import NotFound from 'pages/notFound'
import routeList from 'routes'
import 'styles/common.scss'

const App = () => {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <nav className="nav">
            <ul className="inline-list">
              <li className="item">
                <Link to="/">Challenge One</Link>
              </li>
              <li className="item">
                <Link to="/challenge-two">Challenge Two</Link>
              </li>
            </ul>
            <span className="float-right">Le Cong Thang</span>
          </nav>
        </header>
        <main>
          <Suspense fallback={<Loading />}>
            <Switch>
              {routeList.map((route) => (
                <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />))
              }
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
      </Router>
    </div>
  )
}

export default App
