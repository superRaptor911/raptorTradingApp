import {useStore} from '../store';
import {getRequest, postRequest} from './request';

const url = 'https://raptor-trading.herokuapp.com/';
// const url = 'http://localhost:8080/';

// export async function addUser(username, email, avatar) {
//   const password = useStore.getState().password;
//   const response = await postRequest(url + 'users/add', {
//     name: username,
//     email: email,
//     avatar: avatar,
//     password: password,
//   });
//   return response;
// }
//
//

export async function wazirxGetTransactions() {
  const userCred = useStore.getState().userCred;
  if (userCred) {
    const response = await getRequest(url + 'users/list', {
      email: userCred.email,
      password: userCred.password,
    });
    return response;
  }
  return null;
}
