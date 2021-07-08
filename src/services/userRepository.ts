import Repository from './repository'

const url = 'user'

const UserRepository = {
  /**
   * /GET. Get all users
   * @param {number} limit the total records in response
   * @param {number} page the current page
   * @param {skip} skip the number of skip items
   * @return {Array} the list of user
   */
  getAll: (limit: number, page: number, skip: number): any =>
    Repository.get(`${url}?limmit=${limit}&page=${page}&skip=${skip}`)
}

export default UserRepository
