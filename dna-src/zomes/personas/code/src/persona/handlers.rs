use hdk::AGENT_ADDRESS;
use hdk::error::{ZomeApiResult, ZomeApiError};
use crate::{
    persona::{
        PersonaSpec,
        Persona,
        PersonaField,
    },
    PERSONA_ENTRY,
    PERSONA_FIELD_ENTRY,
    PERSONA_ANCHOR_ENTRY,
    PERSONA_FIELDS_LINK_TYPE,
    PERSONA_ANCHOR_LINK_TYPE,
};
use hdk::holochain_core_types::{
    json::{RawString},
    cas::content::Address,
    entry::{Entry},
};

use hdk::utils::{
    GetLinksLoadResult,
    get_links_and_load_type
};

/*==========================================
=            public fn handlers            =
==========================================*/

pub fn handle_create_persona(spec: PersonaSpec) -> ZomeApiResult<Address> {

    let persona_entry = Entry::App(PERSONA_ENTRY.into(), spec.into());
    let anchor_entry = Entry::App(PERSONA_ANCHOR_ENTRY.into(), RawString::from(AGENT_ADDRESS.to_string()).into());
    let persona_address = hdk::commit_entry(&persona_entry)?;
    let anchor_address = hdk::commit_entry(&anchor_entry)?;
    hdk::link_entries(&anchor_address, &persona_address, PERSONA_ANCHOR_LINK_TYPE, "")?;

    Ok(persona_address.to_string().into())
}


pub fn handle_get_personas() -> ZomeApiResult<Vec<GetLinksLoadResult<Persona>>> {
    let anchor_address = hdk::commit_entry(
        &Entry::App(
            PERSONA_ANCHOR_ENTRY.into(),
            RawString::from(AGENT_ADDRESS.to_string()).into(),
        )
    )?;

    let persona_specs: Vec<GetLinksLoadResult<PersonaSpec>> = get_links_and_load_type(&anchor_address, Some(PERSONA_ANCHOR_LINK_TYPE.into()), None)?;

    if persona_specs.len() == 0  {
        hdk::debug("create Default persona")?;
        let persona_address = create_default_persona()?;
        let default_result = GetLinksLoadResult{
            entry: Persona::default(),
            address: persona_address
        };
        Ok(vec![default_result])
    } else {
        let result = persona_specs.iter().map(|elem| {
            GetLinksLoadResult {
                entry: Persona {
                    name: elem.entry.name.to_owned(),
                    fields: get_fields(&elem.address).unwrap_or(Vec::new())
                },
                address: elem.address.clone()
            }
        }).collect();
        Ok(result)
    }

}


pub fn handle_add_field(persona_address: Address, field: PersonaField) -> ZomeApiResult<()> {

    let persona_field_entry = Entry::App(
        PERSONA_FIELD_ENTRY.into(),
        field.into(),
    );

    let field_address = hdk::commit_entry(&persona_field_entry)?;
    hdk::link_entries(&persona_address, &field_address, PERSONA_FIELDS_LINK_TYPE, "")?;
    Ok(())
}

pub fn handle_get_field(persona_address: Address, field_name: String) -> ZomeApiResult<RawString> {
    let fields = get_fields(&persona_address)?;
    match fields.iter().filter(|field| {field.name == field_name}).next() {
        Some(field) => Ok(RawString::from(field.data.to_owned())),
        None => Err(ZomeApiError::Internal("No matching field names".into()))
    }
}


/*=====  End of public fn handlers  ======*/


fn get_fields(persona_address: &Address) -> ZomeApiResult<Vec<PersonaField>> {
    get_links_and_load_type(persona_address, Some(PERSONA_FIELDS_LINK_TYPE.into()), None).map(|result: Vec<GetLinksLoadResult<PersonaField>>| {
        result.iter().map(|elem| {
            elem.entry.clone()
        }).collect()
    })
}

fn create_default_persona() -> ZomeApiResult<Address> {
    handle_create_persona(PersonaSpec::default())
}
