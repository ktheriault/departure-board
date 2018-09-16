import { connect } from "react-redux";
import * as actions from '../actions/actions';
import StationSelector from "../components/StationSelector";

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        selectedStation: state.selectedStation,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoading: (isLoading) => {
            dispatch(actions.setIsLoading(isLoading));
        },
        setSelectedStation: (selectedStation) => {
            dispatch(actions.setSelectedStation(selectedStation));
        },
        setSchedule: (schedule) => {
            dispatch(actions.setSchedule(schedule));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StationSelector);
