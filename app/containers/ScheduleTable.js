import { connect } from "react-redux";
import * as actions from '../actions/actions';
import ScheduleTable from "../components/ScheduleTable";

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading,
        selectedStation: state.selectedStation,
        schedule: state.schedule,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsLoading: (isLoading) => {
            dispatch(actions.setIsLoading(isLoading));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTable);
