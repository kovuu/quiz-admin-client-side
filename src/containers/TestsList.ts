import {connect} from 'react-redux'
import TestsList from '../components/TestsList/TestsList'
import {IAppState} from '../store/store'
import {ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux'
import {getAllQuizes} from "../actions/quizActions";



const mapStateToProps = (store: IAppState) => {
    return {
        quizes: store.quizState.quizes
    }
}



const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AnyAction>
) => {
    return {
        getAllQuizes: () => dispatch(getAllQuizes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsList)
