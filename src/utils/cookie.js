export const writeCookie = (name, value, options={}) => {
    if (options.days) { 
        options['max-age'] = options.days * 60 * 60 * 24; 
        delete options.days 
    }
    
    options = Object.entries(options).reduce((str, [k, v]) => `${str}; ${k}=${v}`, '')
    console.log(name, name + '=' + encodeURIComponent(value) + options )
    document.cookie = name + '=' + encodeURIComponent(value) + options
}

export const readCookie = (name) => {
    const cookie = document.cookie.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)[1]
    
    if (cookie){
        return decodeURIComponent(cookie)
    } 
}

export const removeCookie = (name, options) => {
    writeCookie(name, '', {'max-age': -1, ...options})
}