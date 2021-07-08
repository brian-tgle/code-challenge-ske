import { useEffect, useState, ChangeEvent } from 'react'
import useApplicationStore from 'store/application'
import LazyImage from 'components/lazyImage'
import TableLoading from 'components/loading/tableLoading'
import useDebounce from 'hooks/useDebounce'
import UserRepository from 'services/userRepository'
import { AnyObject, UserItem, UserListResponse } from 'intefaces'
import {
  ALERT_TYPES,
  API_DEFAULT_PARAMS,
  DEBOUNCE_TIME,
  IMAGE_PLACEHOLDER,
  MINIMUN_SEARCH_KEY
} from '../constants'

const ChallengeOne = () => {
  const { PER_PAGE, PAGE } = API_DEFAULT_PARAMS
  const [, applicationActions] = useApplicationStore()
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Array<UserItem>>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [searchString, setSearchString] = useState('')
  const debouncedSearchString: string = useDebounce(searchString, DEBOUNCE_TIME)

  /**
   * Fetch user via UserRepository
   */
  const fetchUser = (): void => {
    setLoading(true)
    UserRepository.getAll(debouncedSearchString, PER_PAGE, PAGE).then((data: UserListResponse) => {
      setUsers(data?.items)
      setTotalCount(data?.total_count)
      applicationActions.onChangeShowAlert({
        showAlert: true,
        alertType: ALERT_TYPES.SUCCESS,
        alertMessage: 'Get data successfully!'
      })
    }).catch((error: AnyObject) => {
      console.error('ERROR: ', error)
      applicationActions.onChangeShowAlert({
        showAlert: true,
        alertType: ALERT_TYPES.ERROR,
        alertMessage: 'Opps! An error occour while trying to get data!'
      })
    }).finally(() => {
      setLoading(false)
    })
  }

  /**
   * Hanlde input search changed
   * @param event
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event?.target?.value)
  }

  useEffect(() => {
    if (debouncedSearchString.length >= MINIMUN_SEARCH_KEY) {
      // fetch new data whenever search key changed
      fetchUser()
    } else if (!debouncedSearchString.length) {
      // Remove user list when search key is empty
      setUsers([])
      setTotalCount(0)
    }
  }, [debouncedSearchString])

  return (
    <div className="container">
      <div className="card">
        <span className="card__header">
          Search by name (Input at least 3 characters):
          <input
            className="input"
            type="text"
            name="search"
            placeholder="Input value here..."
            onChange={handleChange}
          />
          {totalCount ? <b> Total count: {totalCount} users</b> : <></>}
        </span>
        <div className="card__body card__body--scroll">
          <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Login</th>
                  <th>Type</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
              {loading
                ? <TableLoading colSpan={4} />
                : <>
                  {users.length
                    ? users.map((user) => (
                    <tr key={user?.id}>
                      <td>
                        <LazyImage
                          alt={user.login}
                          src={user.avatar_url}
                          placeHolder={IMAGE_PLACEHOLDER}
                          width={150}
                          height="150"
                          keepRatio
                        />
                      </td>
                      <td>{user.login}</td>
                      <td>{user.type}</td>
                      <td>{user.score}</td>
                    </tr>
                    ))
                    : <tr>
                        <td colSpan={4} className="text-center">
                          <i>Empty list</i>
                        </td>
                      </tr>
                    }
                </>
                }
              </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default ChallengeOne
