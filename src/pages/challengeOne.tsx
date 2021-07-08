import { useEffect, useState, ChangeEvent } from 'react'
import TableLoading from 'components/loading/tableLoading'
import useDebounce from 'hooks/useDebounce'
import UserRepository from 'services/userRepository'
import { AnyObject, UserItem, UserListResponse } from 'intefaces'
import { API_DEFAULT_PARAMS, DEBOUNCE_TIME, IMAGE_PLACEHOLDER, MINIMUN_SEARCH_KEY } from '../constants'
import LazyImage from 'components/lazyImage'

const ChallengeOne = () => {
  const { PER_PAGE, PAGE } = API_DEFAULT_PARAMS
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Array<UserItem>>([])
  const [searchString, setSearchString] = useState('')
  const debouncedSearchString: string = useDebounce(searchString, DEBOUNCE_TIME)
  const fetchUser = (action: Function): void => {
    setLoading(true)
    UserRepository.getAll(debouncedSearchString, PER_PAGE, PAGE).then((data: UserListResponse) => {
      action(data?.items)
    }).catch((error: AnyObject) => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (debouncedSearchString.length >= MINIMUN_SEARCH_KEY) {
      fetchUser(setUsers)
    } else if (!debouncedSearchString.length) {
      setUsers([])
    }
  }, [debouncedSearchString])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event?.target?.value)
  }

  return (
    <div className="container">
      <div className="card">
        <span className="card__header">
          Search by name:
          <input className="input" type="text" name="search" placeholder="Input value..." onChange={handleChange} />
        </span>
        <div className="card__body">
          <table className="table table--scroll">
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
