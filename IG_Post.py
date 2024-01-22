import base64
from instagrapi.types import Usertag,UserShort
from tempfile import TemporaryDirectory





def Caption_Update(Caption,Hashtag):
    
    
    
    if Hashtag !=[]:

        Post_Caption = Caption + '\n' + ' '.join(Hashtag)

    else:

        Post_Caption = Caption


    return Post_Caption






def ImgList_Update(ImgList,Temp_File):

    Post_Media_List = []
    

    
    for i in range(len(ImgList)):
        
        
        fileName = ImgList[i][0]
        fileType = ImgList[i][1]
        Media = ImgList[i][2]




        Temp_File_Path = Temp_File + '\\' + fileName + '.' + fileType



        with open(Temp_File_Path,'wb') as f:
            
            f.write(Media)
            f.close()


        Post_Media_List.append(Temp_File_Path)


    if len(ImgList) == 1:

        Post_Media_List = Post_Media_List[0]



    return Post_Media_List,fileType






def UserTag_Update(TagUser,cl):



    Post_TagUser_List = []

    for TagUserItem in TagUser:

        UserName = TagUserItem['TagUser']
        User = cl.user_info_by_username(UserName)



        user_short = UserShort(
            pk=User.pk,
            username = User.username,
            full_name=User.full_name,
            profile_pic_url=User.profile_pic_url,
            profile_pic_url_hd=User.profile_pic_url_hd,
            is_private=User.is_private,
        )


        x = float(TagUserItem['ig_x_percentage'])
        y = float(TagUserItem['ig_y_percentage'])


        this_UserTag = Usertag(user=user_short, x=x, y=y)

        Post_TagUser_List.append(this_UserTag)



    return Post_TagUser_List







def MediaData_Update(MediaData):

    ImgList = []



    for item in MediaData:

        fileName = item['filename']


        Media = item['src'].replace('data:image/jpeg;base64,','').replace('data:video/mp4;base64,','')
        Media = base64.b64decode( Media.encode('utf-8') )

        if item['type'] == 1:

            fileType = 'jpg'

        else:

            fileType = 'mp4'


        this_Media = (fileName,fileType,Media)

        ImgList.append(this_Media)


    return ImgList




def IG_Post(Caption,Hashtag,TagUserData,MediaData,cl):

    Temp_Direct = TemporaryDirectory()
    Temp_File = Temp_Direct.name   
    
    
    # 1st Process
    ImgList = MediaData_Update(MediaData)
    TagUser = [{key: item[key] for key in ['img_index','TagUser','ig_x_percentage','ig_y_percentage']} for item in TagUserData]
    

    # 2nd Process to Post
    Post_Media_List,fileType =ImgList_Update(ImgList,Temp_File)
    Post_TagUser_List = UserTag_Update(TagUser,cl)
    Post_Caption = Caption_Update(Caption,Hashtag)

    


    # Post to IG
    try:
        
        if len(Post_Media_List) == 1:

            
            # One Photo
            if fileType == 'jpg':

                if len(Post_TagUser_List) == 0:
                    
                    cl.photo_upload(
                        Post_Media_List[0],
                        caption = Post_Caption
                    )

                else:

                    cl.photo_upload(
                        Post_Media_List[0],
                        caption = Post_Caption,
                        usertags = Post_TagUser_List
                    )



            # One Video
            else:

                if len(Post_TagUser_List) == 0:
                    
                    cl.video_upload(
                        Post_Media_List[0],
                        caption = Post_Caption
                    )

                else:

                    cl.video_upload(
                        Post_Media_List[0],
                        caption = Post_Caption,
                        usertags = Post_TagUser_List
                    )



        # Album
        else:

            if len(Post_TagUser_List) == 0:
                
                cl.album_upload(
                    Post_Media_List,
                    caption = Post_Caption
                )

            else:

                cl.album_upload(
                    Post_Media_List,
                    caption = Post_Caption,
                    usertags = Post_TagUser_List
                )
    

    except Exception as e:

        print(e)
        






    Temp_Direct.cleanup()





















