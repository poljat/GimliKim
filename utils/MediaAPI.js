const url = 'http://media.mw.metropolia.fi/wbma/';

const getAllQueries = () => {
    return fetch(url + 'tags/GimliKim').then(res => {
        return res.json()
    }).then((result) => {
        return Promise.all(result.map(item => {
            return fetch(url + 'media/' + item.file_id).then(response => {
                return response.json();
            });
        })).then(items => {
            return items;
            // save items to state
        });

    });

};

const getProfilePic = (profId) => {
    return fetch('http://media.mw.metropolia.fi/wbma/tags/profile').then(response => {
        return response.json();
    }).then(profPic => {

        for (let i = 0; i < profPic.length; i++) {
            if (profPic[i].user_id === profId) {
                return profPic[i]
            }
        }
    });
};

const getSingleQuery = (id) => {
    return fetch(url + 'media/' + id).then(response => {
        return response.json();
    }).then(items => {
        return items;
// save items to state
    });
};

const login = (username, password) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    };
    return fetch(url + 'login', settings).then(response => {
        return response.json();
    });
};

const register = (user) => {
    const userInfo = {
        username: user.username,
        password: user.password,
        email: user.email,
        full_name: user.full_name,
    }


    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
    };
    return fetch(url + 'users', settings).then(response => {
        return response.json();
    });
};

const newComment = (com, id, token) => {
    const settings = {
        method: 'POST',
        body: JSON.stringify({file_id: id, comment: com}),
        headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
        },
    };

    fetch(url + 'comments', settings).then(response => {
        console.log(response);
        return response.json();

    }).catch(function (error) {
        console.log(error)
    })
};

const getComments = (id) => {
    console.log("com api");

    return fetch(url + 'comments/file/' + id).then(response => {
        return response.json();
    })

};

const getUser = (token) => {
    const settings = {
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(url + 'users/user', settings).then(response => {
        return response.json();
    })

};

const getUserId = (userId, token) => {
    console.log(userId)
    const settings = {
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(url + 'users/' + userId, settings).then(response => {
        return response.json();
    });
}
const checkUser = (name) => {
    console.log(name)
    return fetch(url + 'users/username/' + name).then(response => {

        return response.json();
    });
}

const getFilters = (text) => {
    const pattern = '\\[f\\](.*?)\\[\\/f\\]';
    const re = new RegExp(pattern);
    try {
        return JSON.parse(re.exec(text)[1]);
    } catch (e) {
        // console.log(e);
        return ''
    }
};
const getDescription = (text) => {
    console.log(text)
    const pattern = '\\[d\\](.*?)\\[\\/d\\]';
    const re = new RegExp(pattern);
    try {
        console.log((re.exec(text)[1]))
        return re.exec(text)[1];
    } catch (e) {
        console.log(e);
        return text
    }
};

const getUserMedia = (token) => {
    const settings = {
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(url + 'media/user', settings).then(res => {
        return res.json()
    }).then((result) => {
        console.log(result);
        return Promise.all(result.map(item => {
            return fetch(url + 'media/' + item.file_id).then(response => {
                return response.json();
            });
        })).then(items => {
            console.log(items);
            return items;
            // save items to state
        });
    })
}

const deleteImg = (id) => {
    console.log(id)
    const token = localStorage.getItem('token');
    const settings = {
        method: 'DELETE',
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(url + 'media/' + id, settings).then(response => {
        return response.json();
    });
};

const commentFile = (id) => {
    console.log(id)
    const token = localStorage.getItem('token');
    const settings = {
        method: 'COMMENT',
        headers: {
            'x-access-token': token,
        }
    };
    return fetch(url + 'media/' + id, settings).then(response => {
        return response.json();
    });
};


export {getAllQueries}
export {getSingleQuery}
export {getUserMedia}
export {login}
export {register}
export {getUser}
export {getUserId}
export {getProfilePic}
export {checkUser}
export {getFilters}
export {getDescription}
export {deleteImg}
export {newComment}
export {getComments}
