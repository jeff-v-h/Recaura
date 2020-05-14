import { Reducer } from "redux";
import * as T from "./casefileTypes";

const { C } = T

const unloadedState: T.CasefileState = {
    isFetching: false,
    id: '',
    name:'',
    createdAt: '',
    patientId: '',
    consultations: [],
    patient: null
}

const reducer: Reducer<T.CasefileState> = (
    state: T.CasefileState | undefined,
    incomingAction: T.KnownAction
): T.CasefileState => {
    if (state === undefined)
        return unloadedState;
  
    const action = incomingAction as T.KnownAction;
    let obj;
    switch (action.type) {
        case C.GET_CASEFILE_REQUEST:
            return { ...unloadedState, isFetching: true };
        case C.GET_CASEFILE_SUCCESS:
            obj = action as T.GetCasefileSuccessAction;
            return { isFetching: false, ...obj.payload };
        case C.GET_CASEFILE_FAILURE:
            obj = action as T.GetCasefileFailureAction;
            return unloadedState;
        default:
            return state;
    }
};

export default reducer  