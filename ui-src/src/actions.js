export const PROFILEMAPPINGCREATE = 'profileMappingCreate'
export const PERSONACREATE = 'personaCreate'


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
