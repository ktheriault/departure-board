import { connect } from "react-redux";
import * as actions from '../actions/actions';
import App from "../components/App";

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        selectedStation: state.selectedStation,
        schedule: state.schedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoading: (isLoading) => {
            dispatch(actions.setIsLoading(isLoading));
        },
        setSchedule: (schedule) => {
            dispatch(actions.setSchedule(schedule));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
