import { post, get } from '@/helpers/request'

export const list = () => {
  return get('/log/list', {

  });
};

export const remove = (id) => {
  return post('/log/delete', {
    id,
  });
};
