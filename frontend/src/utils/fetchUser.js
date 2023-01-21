export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefinded' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    return userInfo
}

