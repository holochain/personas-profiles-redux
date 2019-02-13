const test = require('tape');
const { Config, Container, Scenario } = require('../../../../Holochain/holochain-rust/nodejs_container')
Scenario.setTape(require('tape'))
const dnaPath = "dist/bundle.json"
const dna = Config.dna(dnaPath, 'hylo-messenger')
const agentAlice = Config.agent("alice")
const instanceAlice = Config.instance(agentAlice, dna)
const scenario = new Scenario([instanceAlice])

require('./agent/personas')(scenario);
require('./agent/profiles')(scenario);
