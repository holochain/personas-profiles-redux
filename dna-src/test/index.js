const path = require('path')
const tape = require('tape')

const { Orchestrator, tapeExecutor, backwardCompatibilityMiddleware } = require('@holochain/try-o-rama')

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('got unhandledRejection:', error);
});

const dnaPath = path.join(__dirname, "../dist/dna-src.dna.json")
const dna = Orchestrator.dna(dnaPath, 'personas')

const commonConductorConfig = {
  instances: {
    app: dna,
  },
}

const orchestratorSimple = new Orchestrator({
  conductors: {
    alice: commonConductorConfig
  },
  debugLog: false,
  executor: tapeExecutor(require('tape')),
  middleware: backwardCompatibilityMiddleware,
})

require('./agent/personas')(orchestratorSimple.registerScenario)
// require('./agent/profiles')(orchestratorSimple.registerScenario)

const run = async () => {
  const alice = await spawnConductor('alice', 3000)
  await orchestratorSimple.registerConductor({name: 'alice', url: 'http://0.0.0.0:3000'})

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  console.log("Waiting for conductors to settle...")
  await delay(5000)
  console.log("Ok, starting tests!")

  await orchestratorSimple.run()
  alice.kill()

  process.exit()
}

run()
