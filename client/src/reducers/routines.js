export const getAllUserRoutinesReducer =  (state = [], action) => {
    const { type, payload } = action;

    switch(type){
        case 'GET_USER_ROUTINES':
            console.log(payload);
            return payload;
        default:
            return state;
    }
}