export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_SELECTED_STATION = "SET_SELECTED_STATION";
export const SET_SCHEDULE = "SET_SCHEDULE";

export const setIsLoading = (isLoading) => {
    return {
        type: SET_IS_LOADING,
        isLoading,
    }
}

export const setSelectedStation = (selectedStation) => {
    return {
        type: SET_SELECTED_STATION,
        selectedStation,
    }
}

export const setSchedule = (schedule) => {
    return {
        type: SET_SCHEDULE,
        schedule,
    }
}