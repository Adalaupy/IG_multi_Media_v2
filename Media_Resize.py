from tempfile import TemporaryDirectory
from PIL import Image,ImageOps
from moviepy.editor import VideoFileClip,CompositeVideoClip,ImageClip
import base64




# File Content Bytes to Image/Video + Find Size and Orientation
def Convert_Bytes_To_Media(Img_List):

    Update_Img_List = []   
    Orientation = 0 # 1 = portrait and 0 = landscape
    
    
    for img_item in Img_List:

        FileName = img_item[0].split('.')[0]
        FileExt = img_item[0].split('.')[1]
        Img_Content = img_item[2]
        this_file_path = f'{Temp_Path}\\{FileName}.{FileExt}'




        with open(this_file_path, 'wb') as f:
            
            f.write(Img_Content)




        # Image but not gif
        if img_item[1].startswith('image') and not img_item[1].endswith('gif'):           
    
            media_type = 1           
            this_img = Image.open(this_file_path)

            if img_item[1].endswith('png'):

                white_background = Image.new('RGB', this_img.size, (255, 255, 255))
                white_background.paste(this_img, (0, 0), this_img)
                this_img = white_background

            this_img = ImageOps.exif_transpose(this_img).convert('RGB')
        


        # Video + gif
        else:
  
            media_type = 2
            this_img = VideoFileClip(this_file_path)
        
        
        
        # Size
        item_size = this_img.size
        
        if item_size[1] > item_size[0]:
            
            Orientation = 1

            

        this_item = (FileName,FileExt,this_img,media_type,item_size)        
        
        Update_Img_List.append(this_item)
    



    List_Ratio = set([ '%.4f' % float(item[4][0]/item[4][1]) for item in Update_Img_List])


    return Update_Img_List,Orientation,List_Ratio








def Video_Resize(thisVideo,background_img,box):

    background_img.save(f'{Temp_Path}\\background_img.jpg')

    background_img = ImageClip(f'{Temp_Path}\\background_img.jpg')
    background_img = background_img.set_duration(thisVideo.duration)
    Compo_clip = CompositeVideoClip([background_img,thisVideo.set_position(box)])

    return Compo_clip






def Image_Resize(thisImage,background_img,box):


    background_img.paste(thisImage, box)


    return background_img






def Background_Img(size,ratio):


    def to_even(num):
        
        if num % 2 !=0:
            num += 1
        
        return num

    
    
    x,y = size
    filled_color = (255,255,255)


    if x/y > float(ratio):

        back_x = x
        back_y = int(x/float(ratio))
    
    else:

        back_y = y
        back_x = int(y*float(ratio))


    back_x = to_even(back_x)
    back_y = to_even(back_y)



    back_img = Image.new('RGB', (back_x,back_y), filled_color)
    box = (int((back_x - x)/ 2), int((back_y - y)/2))


    return back_img,box





def Resize_Media(Update_Img_List,Orientation,List_Ratio):    


    
    Updated_Media_List = []
    

    if Orientation == 1:
   
        ratio = min(List_Ratio,key=lambda x: float(x) if float(x)  > 1  else 0)

        if float(ratio) < 4/5:
            ratio = 4/5

    else:

        ratio = max(List_Ratio)



    for item in Update_Img_List:

        media = item[2]
        media_name = item[0]
        media_type = item[3]
        media_size = item[4]

        background_img,box = Background_Img(media_size,ratio)

        New_FileName = f'Updated_{media_name}'

        
        
        
        
        
        if media_type == 1:
            
            
            
            if len(List_Ratio) == 1 and float(list(List_Ratio)[0]) > 4/5:

                Return_Media = media
            
            else:
            
                Return_Media = Image_Resize(media,background_img,box)                
            
            
            
            Return_Media.save(f'{Temp_Path}\\{New_FileName}.jpg')



            

            with open(f'{Temp_Path}\\{New_FileName}.jpg', 'rb') as f:
                

                Return_Media = 'data:image/jpeg;base64,' + base64.b64encode(f.read()).decode("utf-8")

            

        
        else:
            

            if len(List_Ratio) == 1 and float(list(List_Ratio)[0]) > 4/5:

                Return_Media = media
            
            else:
                
                Return_Media = Video_Resize(media,background_img,box)           
         
            
            Return_Media.write_videofile(f'{Temp_Path}\\{New_FileName}.mp4')


            
            
            with open(f'{Temp_Path}\\{New_FileName}.mp4', 'rb') as f:

                Return_Media = 'data:video/mp4;base64,' + base64.b64encode(f.read()).decode("utf-8")


        
        
        
        
        
        Return_Media = {'src':Return_Media,'type': media_type,'filename':media_name}

        Updated_Media_List.append(Return_Media)  





    return Updated_Media_List,ratio





def Main_Process(Img_List):

    global Temp_File
    global Temp_Path


    try:

        Temp_File = TemporaryDirectory()
        Temp_Path = Temp_File.name



        Update_Img_List,Orientation,List_Ratio = Convert_Bytes_To_Media(Img_List)
        Updated_Media_List,ratio = Resize_Media(Update_Img_List,Orientation,List_Ratio)


    finally:
            
        
        
        Temp_File.cleanup()




    return Updated_Media_List,ratio,Orientation