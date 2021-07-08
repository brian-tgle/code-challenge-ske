import { Suspense } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import useApplicationStore from 'store/application'
import Loading from 'components/loading'
import NotFound from 'pages/notFound'
import Alert from 'components/alert'
import routeList from 'routes'
import 'styles/common.scss'

const App = () => {
  const [applicationState] = useApplicationStore()
  return (
    <div className="app">
      <Router>
        {applicationState.showAlert
          ? <Alert type={applicationState.alertType} message={applicationState.alertMessage} />
          : <></>}
        <header className="app-header">
          <nav className="nav">
            <ul className="inline-list">
              <li className="item">
                <Link to="/">Challenge 1</Link>
              </li>
              <li className="item">
                <Link to="/challenge-two">Challenge 2</Link>
              </li>
            </ul>
            <span className="float-right">Interviewee: Le Cong Thang</span>
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
