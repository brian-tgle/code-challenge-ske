import Repository from './repository'

const url = 'search/users'

const UserRepository = {
  /**
   * /GET. Get all users
   * @param {number} limit the total records in response
   * @param {number} page the current page
   * @param {skip} skip the number of skip items
   * @return {Array} the list of user
   */
  getAll: (searchString: string, perPage: number, page: number): any =>
    Repository.get(`${url}?q=${searchString}&per_page=${perPage}&page=${page}`)
}

export default UserRepository
