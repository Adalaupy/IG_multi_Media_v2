import { useVariableListContext } from '../contexts/VariableListProvider'


export const Main_API_Functions = () => {

    const {
        API_URL,
        UserName, Password,
        Captions, setCaptions,
        HashTag, setHashTag,
        MediaList, setMediaList,
        TagPeople_Position, setTagPeople_Position,
        setcurrent_TagPeople,
        ReturnMediaList, setReturnMediaList,
        setMedia_Ratio,
        setMediaHeight,
        setisLoading,
        setisPreview,
        setisLoginSuccess,
        setisPosting,
        setisGetSession,
        LastUploadTime, LastProcessMediaTime,
        setisSessions,
        ref
    } = useVariableListContext()





    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Check Login Session API
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    const CheckLoginSession_API = () => {

        setisGetSession(true)

        // Check LocalStorage To Find if any Session Json
        let GetSessionJson = localStorage.getItem('Ins_SessionJson')


        if (GetSessionJson == null) {

            GetSessionJson = JSON.stringify(
                {
                    session: null
                }
            )


        } else {

            GetSessionJson = JSON.stringify(
                {
                    session: GetSessionJson
                }
            )

        }





        // Send Login Message to API and get back Login Session Response
        fetch(`${API_URL}/login-session`, {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: GetSessionJson

        })
            .then(res => res.json())
            .then(data => {

                setisSessions(data['isSession'])
                setisGetSession(false)
            })
            .catch(() => {

                setisSessions(0)
            })

    }




    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Login API
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    const Login_API = () => {

        setisLoginSuccess(3)

        const login_json = JSON.stringify(
            {
                UserName: UserName,
                Password: Password
            }
        )

        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: login_json
        })

            .then(res => res.json())
            .then(data => {

                if(data['sessionJson'] != null){   
                    
                    setisLoginSuccess(data['login_status'])
                    localStorage.setItem('Ins_SessionJson', JSON.stringify(data['sessionJson']))
                
                } else {
                    alert('Login Fail')
                    setisLoginSuccess(2)
                }
            })
            .catch(() => {
                alert('Login Fail')
                setisLoginSuccess(2)
            })
    }


    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Send Media to API
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------


    const API_Media = () => {



        if (LastUploadTime > LastProcessMediaTime) {

            setisLoading(true)

            var formdata = new FormData();



            for (let i = 0; i < MediaList.length; i++) {

                formdata.append('image', (MediaList[i]))
            }





            fetch(`${API_URL}/img`, {
                method: 'POST',
                body: formdata
            })

                .then(res => res.json())
                .then(data => {
                    setReturnMediaList(data[0])
                    setMedia_Ratio([data[1], data[2]])
                    setMediaHeight(data[2] == 1 ? 461 : (461 / data[1]))

                })
                .then(() => setisLoading(false))
                .catch(error => console.error('Error:', error))
        }

    }



    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Click to Submit Data
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    const SubmitData = () => {


        setisPosting(true)

        const json_str = JSON.stringify(
            {
                Caption: Captions,
                HashTag: HashTag.map(item => "#" + item),
                TagUser: TagPeople_Position,
                MediaList: ReturnMediaList
            }
        )

        fetch(`${API_URL}/updated-img`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_str
        })
            .then(res => res.json())
            .then(() => {
                setisPreview(false)
                setCaptions('')
                setHashTag([])
                setMediaList([])
                setTagPeople_Position([])
                setcurrent_TagPeople('')
                setReturnMediaList([])
                setMedia_Ratio(null)
                setMediaHeight(null)
                setisPosting(false)
                ref.current.value = ''
            })
            .catch(error => console.error('Error:', error))

    }


    return {
        CheckLoginSession_API,
        Login_API,
        API_Media,
        SubmitData
    }

}
