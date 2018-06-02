var Fly = require("flyio/dist/npm/wx")
import cfg from '../../config'

var fly = new Fly
const host = cfg.publicPath;

export default {
    get: (url, option, error) => {
        var URL = ""
        if (url) { URL = host + url } else {
            URL = host;
        }
        return fly.get(URL, option).then(response => response.data)
            .catch(err => {
                if (error) {
                    error(err)
                } else {
                    console.log(err)
                }
            })
    },
    post: (url, data, option, error) => {
        return fly.post(host + url, data, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            })
            .then(response => response.data)
            .catch(err => {
                if (error) {
                    error(err)
                } else {
                    console.log(err)
                }
            })
    },
    delete: (url, option, error) => {
        fly.delete(host + url, option)
            .then(response => {
                response.data
            })
            .catch(err => {
                if (error) {
                    error(err)
                } else {
                    console.log(err)
                }
            })
    }
}