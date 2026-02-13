# Table of contents

- [General Information](#general-information)
- [Steps](#steps)
- [Packages](#packages)
- [Room of Improvement](#room-of-improvement)
- [More Detail](#more-detail)
- [Try the app](#try-the-app)


# General Information
Instagram allow users to upload multiple media at once for each post, however, the photos are automatically cropped if the aspect ratio of them are not consistent. To advoid cropping on Instagram, users have to make sure that all the media that they upload are in the union aspect ratio, or they may resize the photo by using some thrid-party app which take some times to do it. The main purpose of this project is to facilitate the resizing and uploading process. After login, user can choose the photos/video that they need to upload for the same post, this application will automatically resize the photos and video and post them without any cropping.

# Steps
- Find your previous login record and login automatically
- If no login session history record, you can login manually
- Input Captins, Hashtags, and Media for the post
- Tag Other Users on specific position of the photo (Only the 1st one)
- When Press 'Preview', the photos will be resized and shown in the preview area with the caption and hashtags
- You can re-arrage the order of the photos by drag and drop
- Once ready, press 'Post' to post the photos and video to Instagram


# Packages
- fastapi
- uvicorn
- Pillow
- moviepy
- python-multipart
  
# Room of improvement
- Limited file types, e.g. svg is not supported
- UI design
- Only Support Posting but not Story
- Tagged Users are not shown in Preview
- If one Vertical orientation photo exists, all the photos will be resized to Vertical orientation

# More Detail
https://adalaupy.github.io/my-profile/project-detail/5

# Try the app
https://adalaupy.github.io/IG_multi_Media_v2/

