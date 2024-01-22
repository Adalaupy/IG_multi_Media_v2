import React, { useEffect } from 'react'
import { TagsInput } from "react-tag-input-component";

import Preview from './Preview';
import './Content.css'
import { useVariableListContext } from '../contexts/VariableListProvider';
import { MdDeleteForever } from "react-icons/md";
import { Main_Handle_Event } from '../utils/Handle_Event'

const Content = () => {




    const { PreviewData, HandleUploadFile, click_xy, Handle_TagPeople } = Main_Handle_Event()


    const { ref, MediaList, setMediaList, ReturnMediaList, setReturnMediaList, Captions, setCaptions, HashTag, setHashTag, isPreview, TagPeople_Position, setTagPeople_Position, current_TagPeople, setcurrent_TagPeople } = useVariableListContext()



    // Find the new Position of the lable if the window re-size
    useEffect(() => {


        const handleresize = () => {

            const Preview_Element_List = document.getElementsByClassName('media-item')

            for (let i = 0; i < Preview_Element_List.length; i++) {

                const Rect = Preview_Element_List[i].getBoundingClientRect()

                const Label_Element_List = document.getElementsByClassName(`lb-gp-${i}`)



                for (let j = 0; j < Label_Element_List.length; j++) {


                    const Label_Elemt = Label_Element_List[j]
                    const getKey = Label_Elemt.id



                    const Label_Item = TagPeople_Position.filter((item) => item.label_index == getKey)[0]




                    const top = Label_Item.ig_y + Rect.top + window.scrollY
                    const left = Label_Item.ig_x + Rect.left + window.scrollX


                    Label_Elemt.style.top = top + 'px'
                    Label_Elemt.style.left = left + 'px'

                }
            }

        }

        window.addEventListener('resize', handleresize)

        return () => {

            window.removeEventListener('resize', handleresize)

        }


    }, [TagPeople_Position])





    return (

        <div className="content-main">




            <div className="forInput">

                <div className="input-box">

                    <label htmlFor="Caption">Captions:</label>
                    <textarea className='input text-input' value={Captions} onChange={(e) => setCaptions(e.target.value)} cols="30" rows="10" wrap="hard" />

                </div>





                <div className="input-box">

                    <label htmlFor="hashtag">HashTag:</label>

                    <TagsInput
                        classNames='input tag-input'
                        value={HashTag}
                        onChange={setHashTag}
                        name="tags"
                        placeHolder="Press Enter to add tag"
                    />


                </div>



                <div className="input-box">
                    <label htmlFor="hashtag">Upload Image / Video:</label>
                    <input ref={ref} className='file-input' multiple name='file' accept="image/* , video/* , .cr2 " onChange={(e) => HandleUploadFile(e.target.files)} type='file' id='upload' />

                    <div className="upload-media-note-box">
                        <div className="upload-media-note">* <span style={{ fontStyle: 'italic' }}>Instagrapi</span> allow Tagging Users for the <span style={{ fontWeight: 'bold' }}>1st</span> Image/Video</div>
                        <div className="upload-media-note">* Click on the below (1st) Media to tag User and Press "Enter" to save</div>
                        <div className="upload-media-note">* Drag and Down the Media to re-arrange Order</div>
                    </div>

                </div>



            </div>





            <div className="forPreview">
                <div className="img-preview-box" >

                    {MediaList && MediaList.map((img, index) => (
                        <div key={index}>


                            <div className="img-preview-item"
                                draggable='true'
                                onDragStart={(e) => { e.dataTransfer.setData('text/plain', index) }}
                                onDragOver={(e) => { e.preventDefault() }}
                                onDrop={(e) => {

                                    e.preventDefault()

                                    // Allow Drag and Drop the image to Re-arrange the order of the image
                                    const dragIndex = e.dataTransfer.getData('text/plain')

                                    let NewMedia_List = [...MediaList]
                                    const dragImg = NewMedia_List[dragIndex]
                                    NewMedia_List.splice(dragIndex, 1)
                                    NewMedia_List.splice(index, 0, dragImg)
                                    setMediaList(NewMedia_List)


                                    if (ReturnMediaList != []) {
                                        let NewReturnMediaList = [...ReturnMediaList]
                                        const dragReturnImg = NewReturnMediaList[dragIndex]
                                        NewReturnMediaList.splice(dragIndex, 1)
                                        NewReturnMediaList.splice(index, 0, dragReturnImg)
                                        setReturnMediaList(NewReturnMediaList)

                                    }

                                }}
                            >
                                <img onClick={(e) => click_xy(e, index)} className='media-item' id={'img-preview-' + index} src={URL.createObjectURL(img)} alt={img.name} />
                                <label className='media-item-name'>{img.name}</label>
                            </div>



                            <div id="input-tag-people-box" style={{ opacity: 0 }}>
                                <input
                                    id="input-tag-people"
                                    value={current_TagPeople}
                                    onChange={(e) => setcurrent_TagPeople(e.target.value)}
                                    onKeyDown={Handle_TagPeople}
                                />
                            </div>
                        </div>



                    ))}




                    {TagPeople_Position.filter((item) => item.TagUser != '').map((item) => {


                        const People = item.TagUser
                        const ele = document.getElementById('img-preview-' + item.img_index).getBoundingClientRect()


                        const top = item.ig_y + ele.top + window.scrollY
                        const left = item.ig_x + ele.left + window.scrollX


                        return (

                            <div
                                key={item.label_index}
                                id={item.label_index}
                                className={`tag-people-label lb-gp-${item.img_index}`}
                                style={{ top: top, left: left }}
                            >
                                {People}

                                <MdDeleteForever className="delete-btn"

                                    onClick={() => {
                                        const new_Array = TagPeople_Position.filter((ThisItem) => ThisItem.label_index != item.label_index)
                                        setTagPeople_Position(new_Array)
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>




            <button className='Preview-btn' onClick={PreviewData}>Preview</button>



            {isPreview && (<Preview />)}



        </div >

    )
}

export default Content