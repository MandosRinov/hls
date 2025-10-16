import {useParams} from 'react-router-dom'

function Account() {

    const params = useParams()
    console.log(params)

    return (
        <div>
            Hello, {params.accountId}, from Account page
        </div>
    )
}

export default Account;