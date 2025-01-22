import http from 'http'
import app  from './app/server'

function init(){
    try {
        const PORT = process.env.PORT || 8000
        const server = http.createServer(app)
        server.listen(PORT,()=>{
            console.log(`Http server is listening on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(`Error Starting Server`, error)
    }
}

init();
