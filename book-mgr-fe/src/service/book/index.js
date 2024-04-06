import { del, post, get } from '@/helpers/request'
export const add = (form) => {
  return post('/book/add', {
    form,
  }

  )
};

export const list = ({ keyword }) => {
  return get('/book/list', {

    keyword: keyword

  }
  )
};

export const remove = (id) => {
  return del(`/book${id}`,
  )
};

export const updateCount = (data = {}) => {
  return post(`/book/update/count`, data)

};

export const update = (data = {}) => {
  console.log(data);
  return post(`/book/update`, data)

};

export const detail = (id) => {
  return get(
    `/book/detail/${id}`,
  );
};

