import app from './app.js'
import config from './config/index.js'

const port = config.port || 3000;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})

