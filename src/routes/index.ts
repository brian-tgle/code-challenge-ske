import { lazy } from 'react'

const routeList = [
  {
    path: '/',
    component: lazy(() => import('../pages/challengeOne')),
    exact: true
  },
  {
    path: '/challenge-two',
    component: lazy(() => import('../pages/challengeTwo')),
    exact: false
  }
]

export default routeList
