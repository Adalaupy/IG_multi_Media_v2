
import { useVariableListContext } from '../contexts/VariableListProvider';
import { Main_API_Functions } from '../utils/API';

export const Main_Handle_Event = () => {

    const {

        UserName, setUserName,
        Password, setPassword,

        setMediaList,
        TagPeople_Position, setTagPeople_Position,
        current_TagPeople, setcurrent_TagPeople,
        setReturnMediaList,
        setisPreview,
        setLastUploadTime,
        setLastProcessMediaTime,


    } = useVariableListContext()

    const { Login_API, API_Media } = Main_API_Functions()

    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Get Login Info 
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------



    const Handle_Login = (e) => {

        e.preventDefault()


        if (UserName == '' | Password == '') {

            alert('Please enter your username and password')
        }


        else {

            Login_API()
            setUserName('')
            setPassword('')
        }

    }




    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Click to Preview Data
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    const PreviewData = () => {

        setisPreview(true)
        API_Media()
        setLastProcessMediaTime(new Date())

    }




    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Convert input file to array
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    const HandleUploadFile = (file) => {

        var thisArray = []


        for (let i = 0; i < file.length; i++) {
            thisArray = [...thisArray, file[i]]
        }

        setMediaList(thisArray)
        setReturnMediaList([])
        setTagPeople_Position([])
        setcurrent_TagPeople('')
        setLastUploadTime(new Date())
    }



    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Pagination
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    const Fn_Paging_slice_data = (currentPage, CntPerPage, data) => {

        const lastItemIndex = currentPage * CntPerPage
        const firstItemIndex = lastItemIndex - CntPerPage

        const slicedData = data.slice(firstItemIndex, lastItemIndex)

        return slicedData

    }



    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Get coordinates of click
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------


    const click_xy = (e, index) => {

        setcurrent_TagPeople('')


        // Get Current Coordinates of img element
        const imgElement = e.target;
        const rect = imgElement.getBoundingClientRect();



        // calculate X and Y coordinates of the click in the img
        const ig_x = e.clientX - rect.left
        const ig_y = e.clientY - rect.top


        // Change to percentage which Instagram required
        const ig_x_percentage = (e.clientX - rect.left) / imgElement.width
        const ig_y_percentage = (e.clientY - rect.top) / imgElement.height



        // Active Tag User Input Element
        const input_people_element = document.getElementById('input-tag-people-box')
        document.getElementById('input-tag-people').focus()


        input_people_element.style.position = 'absolute'
        input_people_element.style.opacity = 100



        // X and Y coordinates of the Input element
        input_people_element.style.top = e.clientY + window.scrollY + 'px'
        input_people_element.style.left = e.clientX + window.scrollX + 'px'




        // New Label Item
        let newArray = [...TagPeople_Position]

        // Remove the last item if it is empty
        if (newArray.slice(-1)['TagUser'] == '') {

            newArray.pop()

            setTagPeople_Position(newArray)

        }


        // Get Index of the new added Label
        let Max_Index = 1
        if (newArray.length > 0) {

            Max_Index = newArray.reduce((pre, curr) => {
                return pre.label_index > curr.label_index ? pre : curr
            }).label_index + 1
        }


        // Add new Label Item to Array
        const xy_array = [...newArray, {
            label_index: Max_Index,
            img_index: index,
            x: e.clientX,
            y: e.clientY + window.scrollY,
            TagUser: '',
            ig_x: ig_x,
            ig_y: ig_y,
            ig_x_percentage: ig_x_percentage,
            ig_y_percentage: ig_y_percentage
        }]

        setTagPeople_Position(xy_array)



    }



    // -----------------------------------------------------------------------------------------------------------------------------------------------------------
    // Update TagPeople Data after press Enter or Escape
    // -----------------------------------------------------------------------------------------------------------------------------------------------------------

    const Handle_TagPeople = (e) => {

        const input_people_element = document.getElementById('input-tag-people-box')

        if (e.key == 'Enter') {


            input_people_element.style.opacity = 0


            if (current_TagPeople != '') {

                const Last_Tag_Item = TagPeople_Position[TagPeople_Position.length - 1]
                Last_Tag_Item.TagUser = current_TagPeople


            }


            setcurrent_TagPeople('')
        }


        else if (e.key == 'Escape') {


            input_people_element.style.opacity = 0
            setcurrent_TagPeople('')

        }
    }



    return {
        Handle_Login,
        PreviewData,
        HandleUploadFile,
        Fn_Paging_slice_data,
        click_xy,
        Handle_TagPeople
    }
}


