export const PROFILEMAPPINGCREATE = 'profileMappingCreate'
export const PERSONACREATE = 'personaCreate'
export const PROFILESLIST = 'profilesList'
export const PERSONASLIST = 'personasList'


export function profileMappingCreate(profileMapping) {
  return {
    type: PROFILEMAPPINGCREATE,
    meta: {
      isHc: true,
      namespace: 'profiles',
      data: profileMapping
    }
  }
}

export function personaCreate(persona) {
  return {
    type: PERSONACREATE,
    meta: {
      isHc: true,
      namespace: 'personas',
      data: persona
    }
  }
}

export function personasList() {
  return {
    type: PERSONASLIST,
    meta: {
      isHc: true,
      namespace: 'personas'
    }
  }
}

export function profilesList() {
  return {
    type: PROFILESLIST,
    meta: {
      isHc: true,
      namespace: 'profiles'
    }
  }
}
