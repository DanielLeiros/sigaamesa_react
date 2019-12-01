export const isAuthenticated = () => {
    if (sessionStorage.getItem('token')) {
        console.log("ok")
        return true;
    }else{
        return false;
    }
};

export const getToken = () => {
    return sessionStorage.getItem('token');
}