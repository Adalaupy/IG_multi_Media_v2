from instagrapi import Client




def checkLoginSession(SessionJson):

    cl = Client()
    isLogin_Session = 0


    try:


        
        cl.set_settings(SessionJson)
        cl.get_timeline_feed()

        isLogin_Session = 1


    except:

        isLogin_Session = 0


    
    return isLogin_Session,cl




def Login(User, Password):

    cl = Client()
    Login_Status = 0


    try:

        cl.login(User, Password)
        GetSessionJson = cl.get_settings()        

        Login_Status = 1

    except Exception as e:

        print(e)
        GetSessionJson = None
        Login_Status = 0
    

    print(GetSessionJson)


    return Login_Status,GetSessionJson,cl



"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
# If save to local file storage

session = cl.load_settings(Session_Path)

cl.dump_settings(Session_Path)

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
