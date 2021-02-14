import {ADDUSER,EDITUSER, EDITACTIVE } from './index';
// export const addUser = (data) =>dispatch=>{
//     return dispatch({
//         type: ADDUSER,
//         payload: data
//       });
// } 
// export const editUserA = (data) =>dispatch=>{
//     return dispatch({
//         type: EDITUSER,
//         payload: data
//       });
// } 
export const editActive = (data) =>dispatch=>{
    return dispatch({
        type: EDITACTIVE,
        payload: data
      });
} 