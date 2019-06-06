use hdk::AGENT_ADDRESS;
use hdk::error::{ZomeApiResult, ZomeApiError};
use crate::persona::{
    PersonaSpec,
    Persona,
    PersonaField
};
use hdk::holochain_core_types::{
    json::{RawString},
    cas::content::Address,
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
};

use hdk::utils::{
    GetLinksLoadResult,
    get_links_and_load_type
};

/*==========================================
=            public fn handlers            =
==========================================*/

pub fn handle_create_persona(spec: PersonaSpec) -> ZomeApiResult<Address> {

    let persona_entry = Entry::App("persona".into(), spec.into());
    let anchor_entry = Entry::App("persona_anchor".into(), RawString::from(AGENT_ADDRESS.to_string()).into());
    let persona_address = hdk::commit_entry(&persona_entry)?;
    let anchor_address = hdk::commit_entry(&anchor_entry)?;
    hdk::link_entries(&anchor_address, &persona_address, "personas", "")?;

    Ok(persona_address.to_string().into())
}




pub fn handle_get_personas() -> ZomeApiResult<Vec<GetLinksLoadResult<Persona>>> {
    let anchor_address = hdk::commit_entry(
        &Entry::App(
            AppEntryType::from("persona_anchor"),
            AppEntryValue::from(RawString::from(AGENT_ADDRESS.to_string())),
        )
    )?;

    let persona_specs: Vec<GetLinksLoadResult<PersonaSpec>> = get_links_and_load_type(&anchor_address, Some("personas".into()), None)?;

    if persona_specs.len() == 0  {
        hdk::debug("create Default persona")?;
        let persona_address = handle_create_persona(PersonaSpec { name : "Default".to_string() })?;
        let default_result = GetLinksLoadResult{
            entry: Persona{
                name: "Default".to_string(),
                fields: Vec::new()
            },
            address: persona_address
        };
        Ok(vec![default_result])
    } else {
        let result = persona_specs.iter().map(|elem| {
            GetLinksLoadResult{
                entry: Persona{
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
        AppEntryType::from("personaField"),
        AppEntryValue::from(field),
    );

    let field_address = hdk::commit_entry(&persona_field_entry)?;
    hdk::link_entries(&persona_address, &field_address, "fields", "")?;
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
    get_links_and_load_type(persona_address, Some("fields".into()), None).map(|result: Vec<GetLinksLoadResult<PersonaField>>| {
        result.iter().map(|elem| {
            elem.entry.clone()
        }).collect()
    })
}
