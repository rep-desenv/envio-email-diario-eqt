// // const server = require('./server.js')
// import run from './server.js'

// await run.run()



import notasLimbo from './notas-limbo/notas-limbo.js'
import falhaRotinaSobra from './falha-rotina-sobra/falha-rotina-sobra.js'

await falhaRotinaSobra.run()
await notasLimbo.run()
