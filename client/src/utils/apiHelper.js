export const api = (path, method='GET', body=null, credentials=null) => {
    const url = 'http://localhost:5000/api' + path


    const options = {
        method, 
        headers: {}
    }

    // if there is a body, add it to options
    if (body) {
        options.body = JSON.stringify(body)
        options.headers["Content-Type"] = "application/json; charset=utf-8"
    }

    //if there are credentials, add them to options
    if (credentials){
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
        options.headers.Authorization = `Basic ${encodedCredentials}`
    }

    return fetch(url, options)
}

