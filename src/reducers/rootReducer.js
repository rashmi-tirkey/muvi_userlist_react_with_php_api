
import {ADDUSER, EDITUSER,EDITACTIVE } from './../action/index';

const initState = {
    //userData:[],
    isEdit:false,
    editData:""
}
const rootReducer = (state=initState, action) =>{
    
   switch (action.type) {
    //    case ADDUSER:
    //     state.userData.push(action.payload)
    //        return state;
    //     case EDITUSER:
    //         let updated={...state};
    //         let updateIndex = action.payload.index
    //         updated.userData[updateIndex].name = action.payload.name;
    //         updated.userData[updateIndex].email = action.payload.email;
    //         updated.userData[updateIndex].country = action.payload.country;
    //         updated.userData[updateIndex].src =  action.payload.src;
    //         updated.userData[updateIndex].mobile = action.payload.mobile;
    //         updated.isEdit=false;
    //         return updated;
        case EDITACTIVE:
            return {...state,isEdit:action.payload.isEdit,editData:action.payload}
       default:
           return state;
   }
}

export default rootReducer;