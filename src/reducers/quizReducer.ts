import {Reducer} from 'redux'
import {QuizActions, QuizActionTypes} from "../actions/quizActions";


export interface IQuizInfo {
    id: number
    name: string
}

export interface IQuizState {
    testData: any
    quizes: IQuizInfo[]

}


const initialQuizState: IQuizState ={
    testData: [],
    quizes: []
}

export const quizReducer = (
    state = initialQuizState,
    action: { type: any; quizes: any; data: any; }) =>
    {
        switch (action.type) {
            case QuizActionTypes.GET_ALL_QUIZES: {
                return {
                    ...state,
                    quizes: action.quizes
                }
            }
            case QuizActionTypes.SET_TEST_DATA: {
                return {
                    ...state,
                    testData: action.data
                }
            }
            default:
                return state
        }
    }