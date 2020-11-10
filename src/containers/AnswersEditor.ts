import {connect} from 'react-redux'
import AnswersEditor from "../components/AnswersEditor/AnswersEditor";
import {IAppState} from "../store/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {setTestData} from "../actions/quizActions";
import axios from 'axios'


const mapStateToProps = (store: IAppState) => {

    return {
        questions: store.quizState.testData!.questions,
        results: store.quizState.testData!.results
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, AnyAction>
) => {
    return {
        setTestData: (testId: number) => dispatch(setTestData(testId)),
        addQuestionToTest: async (questionData: any, testId: number) => {
            await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${testId}/add`, questionData).then(async r => {
                setTestData(testId)
                return
            })

        },
        deleteQuestionFromTest: (questionId: number, testId: number) => {
            axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${testId}/question/${questionId}/remove`)
                .then(r => {
                    setTestData(testId)
                })
        },
        addAnswerToQuestion: (answer: object, testId: number, questionId: number) => {
            axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${testId}/question/${questionId}/add`, answer)
                .then(r => {
                    setTestData(testId)
                })
        },
        deleteAnswerFromQuestion: (testId: number, answerId: number, questionId: number) => {
            axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${testId}/question/${questionId}/answer/${answerId}/remove`)
                .then(r => {
                    setTestData(testId)
                })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AnswersEditor)
