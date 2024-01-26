import Content from './Main_Pages/Content'
import Login from './Main_Pages/Login'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import { useVariableListContext } from './contexts/VariableListProvider'
import { Main_API_Functions } from './utils/API'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import Loading from './Main_Pages/Loading'


function App() {


  const { isPreview, isSessions, isLoading, isLoginSuccess, isPosting, isGetSession, BASE } = useVariableListContext()
  const Base_Login = BASE + 'Login'
  const Base_Content = BASE + 'content'

  const { CheckLoginSession_API } = Main_API_Functions()



  const navigate = useNavigate()


  useEffect(() => {

    CheckLoginSession_API()


  }, [])



  useEffect(() => {

    if (isSessions === 0) {

      navigate(BASE)

    }

    else if (isSessions === 1) {

      navigate(Base_Content)
    }


  }, [isSessions])





  // -----------------------------------------------------------------------------------------------------------------------------------------------------------
  // UseEffect 
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {


    const forInput = document.getElementsByClassName('forInput')[0]
    const forPreview = document.getElementsByClassName('forPreview')[0]

    if (forInput) {

      if (isLoading) {

        forInput.style.opacity = '0.3'
        forPreview.style.opacity = '0.3'
      }

      else {

        forInput.style.opacity = '1'
        forPreview.style.opacity = '1'
      }
    }



  }, [isLoading])



  // -----------------------------------------------------------------------------------------------------------------------------------------------------------
  // Click to Preview Data
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------


  useEffect(() => {

    const Labels = document.getElementsByClassName('tag-people-label')

    for (let i = 0; i < Labels.length; i++) {

      if (isPreview) {
        Labels[i].style.zIndex = -1
      }

      else {
        Labels[i].style.zIndex = 1
      }
    }

  }, [isPreview])




  return (


    <div className='main'>

      {isLoading || isPosting || isLoginSuccess == 3 || isGetSession ? <Loading /> : ""}

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path={`${BASE}`} element={<Login />} />
        <Route path={Base_Login} element={<Login />} />
        <Route path={Base_Content} element={<Content />} />
      </Routes>

    </div>
  )
}

export default App
