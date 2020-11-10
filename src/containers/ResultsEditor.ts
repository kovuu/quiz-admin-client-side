import {connect} from 'react-redux'
import ResultsEditor from "../components/ResultsEditor/ResultsEditor";
import {IAppState} from "../store/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {setTestData} from "../actions/quizActions";


const mapStateToProps = (state: IAppState) => {
    return {
        results: state.quizState.testData!.results
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AnyAction>
) => {
    return {
        setTestData: (testId: number) => dispatch(setTestData(testId))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ResultsEditor)