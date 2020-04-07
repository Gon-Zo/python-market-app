import React from "react";
import axios from 'axios'
import {onUser, isOpen, clickPage, setUser, onLogout, onLogin, isUse} from '../reducer/user'
// import { useHistory } from "react-router-dom";

export const $httpLogout = (dispatch , history) =>{
    axios.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('Token');
    history.push("/")
    dispatch(onLogout())
};

export const $httpLogin = (dispatch, payload , history) => {
    axios.post(`/login`, payload)
        .then((res) => {
            let token = res.data;
            localStorage.setItem("Token", token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // context.router.history.push("/home")
            dispatch(onLogin())
            history.push('/home')
        })
        .catch(error => console.log(error))
};

export const $fetchUsers = (dispatch, payload) => {

    axios.get(`/admin/user`, {
        params: {
            type: 'U',
            page: payload.page
        }
    }).then(res => dispatch(onUser(res.data))
    ).catch((err) => console.log(err))
};

export const $updateUser = (dispatch, payload) => {

    let seq = payload.seq
    let user = buildUser(user)

    axios.put(`/admin/user/${seq}`, user)
        .then((res) => {
            // $isOpen(dispatch);
            // $fetchUsers(dispatch, payload)
            // todo : update dev
        })
        .catch((err) => console.log(err))
};

export const $deleteUser = (dispatch, payload) => {
    let idx = payload.idx
    let data = payload.data
    axios.delete(`/admin/user/${idx}`)
        .then(res => {
          $fetchUsers(dispatch , data)
        })
        .catch(err => console.log(err))
}

export const $onPage = (dispatch, data) => {
    dispatch(clickPage(data))
}

export const $setUser = (dispatch, data) => {
    dispatch(setUser(data))
}

export const $isUserModalOpen = (dispatch) => {
    dispatch(isOpen())
}

export const $isUse = (dispatch, idx, payload, flag) => {
    dispatch(isUse(idx))
    $updateUser(dispatch, payload)
}

let buildUser = (payload) => {
    let user = payload
    delete user.seq;
    delete user.create_at;
    return user
}
