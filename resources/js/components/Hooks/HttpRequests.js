import React, {useState, useEffect} from 'react'
import axios from 'axios'


export const useAxiosGet = (url, headers) => {

    const [info, setInfo] = useState({
        data: {}
    })

    useEffect(() => {
        const fetchRequest = () => {
            axios.get(url, headers)
            .then(res => {
                setInfo({...info, data: res.data.data})
            })
            .catch(err => console.log(err))
        }

        fetchRequest();
    }, [url]);

    const result = info.data

    return result
}
