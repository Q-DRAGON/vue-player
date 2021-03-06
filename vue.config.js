const path = require('path')
const axios = require('axios')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('stylus',resolve('src/assets/stylus'))
            .set('image',resolve('src/assets/image'))
            .set('api',resolve('src/api'))
            .set('base',resolve('src/base'))
    },
    devServer: {
        before(app) {
          app.get('/api/getDiscList', (req, res) => {
              var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
              axios.get(url, {
                headers: {
                  referer: 'https://c.y.qq.com/',
                  host: 'c.y.qq.com'
                },
                params: req.query
              }).then((response) => {
                res.json(response.data)
              }).catch((e) => {
                console.log(e)
              })
          })
        }
    }
}
