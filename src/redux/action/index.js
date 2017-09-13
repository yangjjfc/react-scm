import $ from '@/services/Http'

export const USERINFO = 'USERINFO' //用户信息

//存储当前用户信息
const setCurrentUser = msg => {
    console.log(1)

    return {
        type: USERINFO,
        msg
    }
}

//获取初始的token和clientId
export const getUser = () => {
    return dispatch => {
        $.post('currentUser', {}).then(result => {
            dispatch(setCurrentUser(result.data));
        }, err => {

        })
    }
}


//异步action暂时无法解决
export const login = (data = {}) => {
    return dispatch => {
       return $.post('login', data).then(result => {
             dispatch(setCurrentUser(result.data));
        }, err => {
        })
    }
}