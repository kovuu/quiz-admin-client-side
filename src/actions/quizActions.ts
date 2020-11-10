import { ActionCreator, Dispatch } from 'redux'
import {IQuizInfo, IQuizState} from "../reducers/quizReducer";
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'




export enum QuizActionTypes {
    GET_ALL_QUIZES = 'GET_ALL_QUIZES',
    SET_TEST_DATA = 'SET_TEST_DATA'
}

export interface IQuizGetAllQuizesAction {
    type: QuizActionTypes.GET_ALL_QUIZES
    quizes: IQuizInfo[],
}

export interface IQuizSetTestDataAction {
    type: QuizActionTypes.SET_TEST_DATA,
    data: any
}


export type QuizActions = IQuizSetTestDataAction | IQuizGetAllQuizesAction

export const getAllQuizes: ActionCreator<
    ThunkAction<Promise<any>, IQuizState, null, IQuizGetAllQuizesAction>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/tests`)
            dispatch({
                quizes: response.data,
                type: QuizActionTypes.GET_ALL_QUIZES
            })
        } catch (err) {
            console.error(err)
        }
    }
}


export const setTestData: ActionCreator<
    ThunkAction<Promise<any>, IQuizState, null, IQuizSetTestDataAction>> = (id: number) => {

    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${id}/data`)
            dispatch({
                type: QuizActionTypes.SET_TEST_DATA,
                data: response.data
            })
            return new Promise((resolve, reject ) => {
                setTimeout(() => {
                    resolve('123')
                }, 1000)
            })
        } catch (err) {
            console.log(err)
        }
    }
}
