// Changed: Using named imports instead of namespace imports
import { app } from './app'
import { PORT } from './utils/config'
import { info } from './utils/logger'

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})
