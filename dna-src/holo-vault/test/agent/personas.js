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
    const result = await alice.callSync("personas", "create_persona", testPersonaSpec)
    console.log(result)
    t.equal(result.Ok.length, 46)
    console.log('blah')
  })

  scenario.runTape('Can retrieve a list of personas', async (t, {alice}) => {
    const result = await alice.callSync("personas", "create_persona", testPersonaSpec)
    console.log(result)
    t.equal(result.Ok.length, 46)
    const listOfPersonas = await alice.callSync("personas", "get_personas", {})
    console.log(listOfPersonas)
    t.equal(listOfPersonas.Ok.length, 1)
  })


  scenario.runTape('Can add a field to a persona', async (t, {alice}) => {
    const persona_address = await alice.callSync("personas", "create_persona", testPersonaSpec)
    console.log(persona_address.Ok)
    t.equal(persona_address.Ok.length, 46)
    const add_result = await alice.callSync("personas", "add_field", testField(persona_address.Ok))
    console.log(add_result)
    t.notEqual(add_result.Ok, undefined)

    // can get the field
    const get_result = await alice.callSync("personas", "get_personas", {})
    console.log(get_result)
    t.equal(get_result.Ok.filter(p => p.entry.name === "something")[0].entry.fields.length, 1)
  })
}
