import Axios from 'axios'
import qs from 'qs'

export let insertTag =  function(data){
    return Axios({
        method: 'post',
        url: `http://127.0.0.1:80/tag/insert`,
        data: qs.stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}


export let deleteTag =  function(data){
    return Axios({
        method: 'delete',
        url: `http://127.0.0.1:80/tag/delete`,
        data: qs.stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}


export let modifyTag =  function(data){
    return Axios({
        method: 'post',
        url: `http://127.0.0.1:80/tag/modify`,
        data: qs.stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}


export let findTag =  function(data){
    return Axios({
        method: 'get',
        url: `http://127.0.0.1:80/tag/find`,
        params: qs.stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}

export let getTag =  function(data){
    return Axios({
        method: 'get',
        url: `http://127.0.0.1:80/tag/get`,
        params: qs.stringify(data),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}