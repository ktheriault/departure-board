import * as actions from '../actions/actions';

const defaultState = {
    isLoading: false,
    selectedStation: null,
    schedule: null,
};

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case actions.SET_IS_LOADING: {
            const { isLoading } = action;
            return {
                ...state,
                isLoading,
            }
        }
        case actions.SET_SELECTED_STATION: {
            const { selectedStation } = action;
            return {
                ...state,
                selectedStation,
            }
        }
        case actions.SET_SCHEDULE: {
            const { schedule } = action;
            return {
                ...state,
                schedule,
            }
        }
        default:
            return state;
    }
};

export default reducer;