import axios from 'axios'
export const list = (keyword = '') => {
  return axios.get(
    'http://localhost:3000/user/list',
    {
      params: {
        keyword
      }
    }
  );
};

export const remove = (id) => {
  return axios.delete(`http://localhost:3000/user/${id}`);
};

export const add = (account, password,) => {

  return axios.post('http://localhost:3000/user/add', {
    account,
    password,
    // character,
  });
};

export const resetPassword = (id) => {
  return axios.post('http://localhost:3000/user/reset/password', {
    id,
  });
};

// export const editCharacter = (characterId, userId) => {
//   return post('/user/update/character', {
//     character: characterId,
//     userId: userId,
//   });
// };

// export const info = () => {
//   return get('/user/info');
// };

// export const addMany = (key) => {
//   return post('/user/addMany', {
//     key,
//   });
// };
