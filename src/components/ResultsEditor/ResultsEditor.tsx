import React, {useEffect, useRef, useState} from 'react'
import './ResultEditor.css'
import axios from 'axios'
import FormData from 'form-data'



interface IProps {
    results: Result[],
    setTestData: (testId: number) => void,
    match: any
}

interface Result {
    id: number
    images: Image[],
    description: string
}

interface Image {
    id: number
    imageLink: string
}

interface ImageInfo {
    id: number
    previewImage: string
    image: File
}

const ResultsEditor: React.FC<IProps> = ({results, setTestData, match}) => {
    const [image, setImage] = useState<ImageInfo>()
    const [reload, setReload] = useState(false)
    const [isShowForm, setIsShowForm] = useState<boolean>(false)

    useEffect(() => {
        if (reload) {
            setTestData(match.params.id)
            setReload(false)
        }
    }, [reload, setTestData, match.params.id], )

    const inputRef = useRef<HTMLInputElement>(null)



    const inputImageHandle = async (e: any, result_id: number) => {
        setImage({
            image: e.target.files[0],
            previewImage: URL.createObjectURL(e.target.files[0]),
            id: result_id
        })
    }

    const uploadHandle = async (event: any, result_id: number) => {
        const fd = new FormData()
        fd.append('image', image?.image)
        const config = {
            headers: {
                'Content--Type': 'multipart/form-data'
            }
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/upload_image/container/${result_id}`, fd, config)
            setImage(undefined)
            setReload(true)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteImageHandler = async (e: any, result_id: number, image_id: number) => {
        await axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/result/${result_id}/image/${image_id}/remove`)
        setReload(true)
    }

    const deleteResultHandle = (e: any, result_id: number) => {
        axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${match.params.id}/result/${result_id}/remove`)
        setReload(true)
    }

    const addNewResultHandle = async () => {
        if (inputRef.current) {
            await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/test/${match.params.id}/result/add`, {label: inputRef.current.value})
            setReload(true)
            inputRef.current.value = ''
            setIsShowForm(false)
        }
    }

    return (
       <div>
           {results.length > 0 &&
               results.map((result, index) => (
                <div key={result.id} className='container-block'>
                    <span title='delete result' className='delete-button' onClick={(e) => deleteResultHandle(e, result.id)}>
                        <i className='material-icons'>clear</i>
                    </span>

                    <p>{result.description}</p>
                    {result.images.map((image, index) => (
                        <div className='image-block' key={index}>
                          <img src={image.imageLink} width='200px'/>
                          <button className='btn red lighten-1 delete-btn' onClick={(e) => deleteImageHandler(e, result.id, image.id)}>
                              <i className='material-icons left'>delete</i>
                              Delete image
                          </button>
                        </div>
                    ))}
                    <div className='image-upload-block'>
                    {image && image.id === result.id && <img src={image?.previewImage} width='200px'/>}
                        <span className="btn btn-file  green lighten-1">
                        <i className="material-icons left">cloud_upload</i>
                        Browse
                            <input type="file" onChange={(e) => inputImageHandle(e, result.id)}/>
                    </span>
                    {image && image.id === result.id && <button onClick={(e) => uploadHandle(e, result.id)}>Upload</button>}
                    </div>

                </div>
           ))}
           <button onClick={() => setIsShowForm(!isShowForm)}>Add Result</button>
           {isShowForm &&
                <div className='result-form'>
                    <label>Result label</label>
                    <input  ref={inputRef} type='text'/>
                    <button onClick={addNewResultHandle}>Add result</button>
                </div>

           }
           <div>

           </div>
       </div>
    )

}

export default ResultsEditor
