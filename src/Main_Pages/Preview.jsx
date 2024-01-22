import React, { useState } from 'react'
import './Preview.css'
import { useVariableListContext } from '../contexts/VariableListProvider'
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Main_API_Functions } from '../utils/API'
import { Main_Handle_Event } from '../utils/Handle_Event'


const Preview = () => {

    const { SubmitData } = Main_API_Functions()
    const { Fn_Paging_slice_data } = Main_Handle_Event()

    const { ReturnMediaList, setisPreview, Captions, MediaHeight, HashTag } = useVariableListContext()
    const [CurrentPage, setCurrentPage] = useState(1)
    const CntPerPage = 1
    const TotalPageCnt = Math.ceil(ReturnMediaList.length / CntPerPage)
    const CurrentDisplayImg = Fn_Paging_slice_data(CurrentPage, CntPerPage, ReturnMediaList)[0]



    return (

        <div className='preview-container'>





            {CurrentDisplayImg && (


                <div className="preview-main" onClick={(e) => e.target === e.currentTarget && setisPreview(false)}>

                    <div className="phone-img-box">

                        <div className="phone-content">

                            <div className="photo-display">

                                <div className="photo-box" style={{ height: MediaHeight.toString() + 'px' }}>
                                    {CurrentDisplayImg.type == 1
                                        ? (<img src={CurrentDisplayImg.src} alt={CurrentDisplayImg.filename} />)
                                        : (<video src={CurrentDisplayImg.src} alt={CurrentDisplayImg.filename} controls autoPlay />)
                                    }
                                </div>



                                <div className="arrow">

                                    <div className="arrow-item"
                                        onClick={() => setCurrentPage(prev => prev == 1 ? prev : prev - 1)}
                                        style={{ color: CurrentPage == 1 ? 'rgba(175, 175, 175, 0.432)' : 'black' }}
                                    >
                                        <FaArrowLeft />
                                    </div>


                                    <div className="arrow-item"
                                        onClick={() => setCurrentPage(prev => prev == TotalPageCnt ? prev : prev + 1)}
                                        style={{ color: CurrentPage == TotalPageCnt ? 'rgba(175, 175, 175, 0.432)' : 'black' }}
                                    >
                                        <FaArrowRight />
                                    </div>

                                </div>

                            </div>


                            <div className="post-text" style={{ height: (684 - 50 - MediaHeight).toString() + 'px' }}>

                                <div className="Acct">
                                    Your Account
                                </div>



                                <div className="caption" style={{ whiteSpace: "pre-wrap" }}>
                                    {Captions}

                                </div>

                                <div className="hashtag">
                                    {HashTag.map(item => " #" + item)}

                                </div>



                            </div>
                        </div>



                    </div>


                    <button onClick={() => SubmitData()} className="submit-box">
                        Submit
                    </button>

                </div >


            )}






        </div>
    )
}

export default Preview