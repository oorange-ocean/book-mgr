import axios from 'axios'

export const list = (type = 'IN_COUNT',) => {
  return axios.get(
    'http://localhost:3000/inventory-log/list', {
    params: {
      type,
    }
  }
  )
}