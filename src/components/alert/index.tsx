import { FC, useEffect } from 'react'
import { AlertProps } from 'intefaces'
import useApplicationStore, { initialState } from 'store/application'
import { ALERT_TIME, DEFAULT_ALERT_POSITION } from '../../constants'
import './style.scss'

const Alert: FC<AlertProps> = ({ type, message, position = DEFAULT_ALERT_POSITION }) => {
  const [, applicationActions] = useApplicationStore()
  useEffect(() => {
    const timer = setTimeout(() => {
      // Hide alert
      applicationActions.onChangeShowAlert(initialState)
    }, ALERT_TIME)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <div className={`alert alert--${type} alert--${position}`}>{message}</div>
  )
}

export default Alert
