import { connect} from "react-redux";
import TestEditor from "../components/TestEditor/TestEditor";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {setTestData} from "../actions/quizActions";


const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AnyAction>
) => {
    return {
        setTestData: (testId: number) => dispatch(setTestData(testId))
    }
}


export default connect(null, mapDispatchToProps)(TestEditor)
