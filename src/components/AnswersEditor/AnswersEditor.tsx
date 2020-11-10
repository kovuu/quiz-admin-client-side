import React, {useEffect, useState} from 'react'
import './AnswersEditor.css'
import {Formik, Form, Field, FieldArray, ErrorMessage} from 'formik'

interface IProps {
    questions: Questions[] | null,
    results: Results[],
    addQuestionToTest: (questionData: any, testId: number) => void,
    addAnswerToQuestion: (answerData: object, testId: number, questionId: number) => void,
    deleteAnswerFromQuestion: (testId: number, answerId: number, questionId: number) => void,
    deleteQuestionFromTest: (questionId: number, testId: number) => void,
    setTestData: (testId: number) => void
    match: any
}

interface Questions {
    answers: any[]
    text: string,
    id: number
}

interface Results {
    id: number
    description: string
}



const AnswersEditor: React.FC<IProps> = ({questions, results, addQuestionToTest, match, addAnswerToQuestion, deleteAnswerFromQuestion, deleteQuestionFromTest, setTestData}) => {
    const [testQuestions, setTestQuestions] = useState<any>()

    useEffect(() => {
        const arr = []
        if (questions !== null) {
            for (let question of questions) {
                arr.push({
                    id: question.id,
                    question: question.text,
                    answers: question.answers
                })
            }
            setTestQuestions({questions: arr})
        } else {
            setTestQuestions({questions: null})
        }
    }, [questions])








    return (
        <div>


            {testQuestions && <div className='form-block'>
                <Formik
                    initialValues={testQuestions}
                    onSubmit={(values => {
                    })}>
                    {({ values, resetForm }) => {


                        return (


                            <Form>

                                <div className="row">
                                    <div className='col'>
                                        <FieldArray name='questions'>
                                            {(arrayHelpers) => (
                                                <div>
                                                    {values.questions.length > 0 &&
                                                    values.questions.map((question: any, index: any) => {
                                                        const questionId = question.id
                                                        return (
                                                            <div key={index}>
                                                                <div className='row question-block'>
                                                                    <label>Question</label>
                                                                    <Field
                                                                        name={`questions.${index}.question`}
                                                                        value={question.question}

                                                                    />
                                                                    <ErrorMessage name={`answers.${index}.text`}
                                                                                  component="div"
                                                                                  className="field-error"
                                                                    />
                                                                    <p>Answers</p>
                                                                    <Field name={`${arrayHelpers.name}.${index}`} >
                                                                        {(fieldProps: any) => {
                                                                            return (
                                                                                <FieldArray name={`${fieldProps.field.name}.answers`}>
                                                                                    {(arrayHelpers) => (
                                                                                        <div>
                                                                                            {fieldProps.field.value.answers.length > 0 &&
                                                                                            fieldProps.field.value.answers.map((answer: any, idx: any) => {
                                                                                                return (
                                                                                                    <div key={idx}>
                                                                                                        <Field type='text'
                                                                                                               value={answer.text}
                                                                                                               name={`questions.${index}.answers.${idx}.text`}

                                                                                                        />
                                                                                                        <div className='col'>
                                                                                                            <label>Which result corresponds to the answer</label>
                                                                                                            <Field as="select" name={`questions.${index}.answers.${idx}.results`} multiple >
                                                                                                                {results.map((result, index) => {
                                                                                                                    return (
                                                                                                                        <option value={result.id} key={index}>
                                                                                                                            {result.description}
                                                                                                                        </option>
                                                                                                                    )
                                                                                                                })}
                                                                                                            </Field>
                                                                                                        </div>

                                                                                                        {answer.isNew && <button
                                                                                                            type="button"
                                                                                                            onClick={() => {
                                                                                                                if (answer.results) {
                                                                                                                    answer = {
                                                                                                                        text: answer.text,
                                                                                                                        results: answer.results
                                                                                                                    }
                                                                                                                    addAnswerToQuestion(answer, match.params.id, questionId)
                                                                                                                } else {
                                                                                                                    alert('Вы забыли указать привязку к результату')
                                                                                                                }
                                                                                                            }}
                                                                                                        >Save</button>}

                                                                                                        <div className="col">
                                                                                                            <button
                                                                                                                type="button"
                                                                                                                className="secondary"
                                                                                                                onClick={() => {

                                                                                                                    deleteAnswerFromQuestion(match.params.id, answer.id, questionId)
                                                                                                                }}
                                                                                                            >
                                                                                                                Delete
                                                                                                            </button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                            <br/>
                                                                                            <br/>
                                                                                            <br/>
                                                                                            <br/>
                                                                                            <br/>
                                                                                            <div className='row'>
                                                                                                <button
                                                                                                    type="button"
                                                                                                    className="secondary"
                                                                                                    onClick={() => arrayHelpers.push({question: '', answers: [{text: ''}], isNew: true})}
                                                                                                >
                                                                                                    Add Answer
                                                                                                </button>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </FieldArray>
                                                                            )}
                                                                        }
                                                                    </Field>

                                                                    <button
                                                                        onClick={() => {
                                                                            deleteQuestionFromTest(questionId, match.params.id)
                                                                            arrayHelpers.remove(index)
                                                                        }}
                                                                    >
                                                                        Delete question
                                                                    </button>
                                                                    {question.isNew && <button
                                                                        onClick={() => {
                                                                            const questionData = {
                                                                                question: question.question,
                                                                                answers: question.answers
                                                                            }
                                                                            addQuestionToTest(questionData, match.params.id)



                                                                            // resetForm()
                                                                        }}>
                                                                        Save Question
                                                                    </button>}

                                                                </div>
                                                            </div>

                                                        )})}
                                                    <button
                                                        type="button"
                                                        className="secondary"
                                                        onClick={() => arrayHelpers.push({question: '', answers: [{text: ''}], isNew: true})}
                                                    >
                                                        Add Question
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>
                                        {/* <button type='submit'>Submit</button> */}
                                    </div>
                                </div>
                            </Form>
                        )}}
                </Formik>
            </div>}
        </div>
    )
}

export default AnswersEditor