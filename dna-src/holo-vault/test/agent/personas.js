const test = require('tape');
module.exports = (scenario) => {

const testPersonaSpec = {
  spec: {
    name: "something"
  }
}

const testField = (persona_address) => {
  return {
    persona_address,
    field: {
      name: "test_field",
      data: "string data"
    }
  }
}

  scenario.runTape('Can create a persona', async (t, {alice}) => {
    const result_ = alice.call("personas", "create_persona", testPersonaSpec)
    console.log(result_)
    t.equal(result.Ok.length, 46)
  })

  // scenario.runTape('Can retrieve a list of personas', async (t, {alice}) => {
  //   const result_ = alice.call("personas", "create_persona", testPersonaSpec)
  //   console.log(result_)
  //   t.equal(result.Ok.length, 46)
  //   const listOfPersonas = alice.call("personas", "get_personas", {})
  //   console.log(listOfPersonas)
  //   t.equal(listOfPersonas.Ok.length, 1)
  // })
  //
  //
  // scenario.runTape('Can add a field to a persona', async (t, {alice}) => {
  //   const result_ = alice.call("personas", "create_persona", testPersonaSpec)
  //   console.log(result_)
  //   t.equal(result.Ok.length, 46)
  //   const add_result = alice.call("personas", "add_field", testField(persona_address))
  //   t.notEqual(add_result.Ok, undefined)
  //
  //   // can get the field
  //   const get_result = alice.call("personas", "get_personas", {})
  //   console.log(get_result)
  //   t.equal(get_result.Ok.filter(p => p.entry.name === "something")[0].entry.fields.length, 1)
  // })
}
