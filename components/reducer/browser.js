export default (state = {alreadySent:false}, action) => {
    switch (action.type) {
        case 'NOT_CHROME':
            return {alreadySent:true}
        default:
            return state
    }
};
