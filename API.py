from fastapi import FastAPI,UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import List
import os
from dotenv import load_dotenv
import json

import Media_Resize
import IG_Post
import IG_Login



app = FastAPI()



load_dotenv()

FrontEnd_URL = os.environ.get('FE_URL')
FrontEnd_URL2 = os.environ.get('FE_URL2')
FrontEnd_Deploy_URL = os.environ.get('FE_DEPLOY_URL')



origins = [
    f"http://{FrontEnd_URL}",
    FrontEnd_URL,
    FrontEnd_Deploy_URL,
    f"https://{FrontEnd_Deploy_URL}"
]


print(origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



Return_Media = []



@app.get("/")
async def root():
    return {"message": "Hello World"}



@app.post("/login-session")
async def Login_Session(SessionJson:dict) -> dict:  
    
    global cl
        
    
    try:

        SessionJson = json.loads(SessionJson['session'])    
        isSesstion,cl = IG_Login.checkLoginSession(SessionJson)

    except:
        
        isSesstion = 0

    
    

    return {'isSession': isSesstion}





@app.post('/login')
async def Login_data(Login_info:dict) -> dict:


    global cl

    user = Login_info['UserName']
    password = Login_info['Password']



    Login_Status,GetSessionJson,cl = IG_Login.Login(user,password)




    return {'login_status':Login_Status,"sessionJson":GetSessionJson}





# Get Raw Media and process them
@app.post("/img")
async def post_api(image: List[UploadFile] = UploadFile(...)):
    
    ImgList = []

    for Img in image:

        
        ImgItem = await Img.read()
        FileName = Img.filename
        Content_Type = Img.content_type
        ImgItem = ImgItem

        
        ImgList.append((FileName,Content_Type,ImgItem))




    Return_Media = Media_Resize.Main_Process(ImgList)


    
    return Return_Media








# Final Submit
@app.post("/updated-img")
async def final_post(PostMedia:dict) -> dict:

  
    Caption =  PostMedia['Caption']
    Hashtag =  PostMedia['HashTag']
    TagUserData = PostMedia['TagUser']
    MediaData =  PostMedia['MediaList']
    


    # Post to IG
    IG_Post.IG_Post(Caption,Hashtag,TagUserData,MediaData,cl)  
        

    return {"message": 'Submitted'}






# if __name__ == "__main__":


#     # "API" = file name
#     uvicorn.run("API:app", host="127.0.0.1", port=8000, reload=True)
