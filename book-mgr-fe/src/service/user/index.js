import axios from 'axios'
export const list = () => {
  return axios.get(
    'http://localhost:3000/user/list'
  );
};

// export const remove = (id) => {
//   return del(`/user/${id}`);
// };

// export const add = (account, password, character) => {
//   return post('/user/add', {
//     account,
//     password,
//     character,
//   });
// };

// export const resetPassword = (id) => {
//   return post('/user/reset/password', {
//     id,
//   });
// };

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
