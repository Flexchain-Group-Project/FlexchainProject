import react from 'react'
import Popout from 'react-popout'

const PopupPage = ()=>{

    return(<Popout title='Window title'>
            <div>Popped out content!</div>

        </Popout>
    );
}
export default PopupPage;