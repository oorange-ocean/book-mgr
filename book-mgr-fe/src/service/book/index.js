import axios from 'axios'

export const add = (form) => {
  return axios.post('http://localhost:3000/book/add', {
    form,
  }

  )
};

export const list = ({ keyword }) => {
  return axios.get('http://localhost:3000/book/list', {
    params: {
      keyword: keyword
    }
  }
  )
};

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/book${id}`,
  )
};

export const updateCount = (data = {}) => {
  return axios.post(`http://localhost:3000/book/update/count`, data)

};

export const update = (data = {}) => {
  console.log(data);
  return axios.post(`http://localhost:3000/book/update`, data)

};

