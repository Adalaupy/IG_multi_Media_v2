import { useState, useContext, createContext, useRef } from "react";


const VariableContext = createContext();

export const VariableListProvider = ({ children }) => {


    const API_URL = import.meta.env.VITE_API_URL
    const BASE = import.meta.env.VITE_BASE


    // Login Password
    const [UserName, setUserName] = useState('')
    const [Password, setPassword] = useState('')


    // IG Post Data
    const [Captions, setCaptions] = useState('')
    const [HashTag, setHashTag] = useState([])
    const [MediaList, setMediaList] = useState([])
    const [TagPeople_Position, setTagPeople_Position] = useState([])

    // Temporily save TagPeople
    const [current_TagPeople, setcurrent_TagPeople] = useState('')

    // Media Data
    const [ReturnMediaList, setReturnMediaList] = useState([])
    const [Media_Ratio, setMedia_Ratio] = useState(null)
    const [MediaHeight, setMediaHeight] = useState(null)


    // Save Loading Status of each Component
    const [isLoading, setisLoading] = useState(false)
    const [isPreview, setisPreview] = useState(false)
    const [isLoginSuccess, setisLoginSuccess] = useState(0) // 0 = not login, 1 = login success, 2 = login fail , 3 =loading
    const [isPosting, setisPosting] = useState(false)
    const [isGetSession, setisGetSession] = useState(false)


    // Save Last Media Process Time and decide whether to send to API and re-process Media
    const [LastUploadTime, setLastUploadTime] = useState(new Date())
    const [LastProcessMediaTime, setLastProcessMediaTime] = useState(new Date())

    // is isSessions = 1, login by session, otherwise login by username and password
    const [isSessions, setisSessions] = useState(0)

    // set Ref of Input Media Element to clear the value after submit
    const ref = useRef()




    return (

        <VariableContext.Provider value={{
            API_URL, BASE,
            UserName, setUserName,
            Password, setPassword,
            Captions, setCaptions,
            HashTag, setHashTag,
            MediaList, setMediaList,
            TagPeople_Position, setTagPeople_Position,
            current_TagPeople, setcurrent_TagPeople,
            ReturnMediaList, setReturnMediaList,
            Media_Ratio, setMedia_Ratio,
            MediaHeight, setMediaHeight,
            isLoading, setisLoading,
            isPreview, setisPreview,
            isLoginSuccess, setisLoginSuccess,
            isPosting, setisPosting,
            isGetSession, setisGetSession,
            LastUploadTime, setLastUploadTime,
            LastProcessMediaTime, setLastProcessMediaTime,
            isSessions, setisSessions,
            ref
        }} >
            {children}
        </VariableContext.Provider>




    )
}


export const useVariableListContext = () => useContext(VariableContext);