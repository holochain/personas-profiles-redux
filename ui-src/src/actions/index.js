export const CREATEPROFILEMAPPING = 'createProfileMapping'
export const CREATEPERSONA = 'createPersona'


export function createProfileMapping(profileMapping, then) {
  return {
    type: CREATEPROFILEMAPPING,
    meta: {
      isHc: true,
      namespace: 'profiles',
      data: profileMapping,
      then
    }
  }
}

export function createProfileMapping(persona, then) {
  return {
    type: CREATEPERSONA,
    meta: {
      isHc: true,
      namespace: 'profiles',
      data: persona,
      then
    }
  }
}
