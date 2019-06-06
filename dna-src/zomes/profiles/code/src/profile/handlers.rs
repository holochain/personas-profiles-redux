use hdk::AGENT_ADDRESS;

use hdk::holochain_core_types::{
    cas::content::Address,
	error::HolochainError,
    json::{JsonString, RawString},
    entry::{entry_type::AppEntryType, AppEntryValue, Entry},
};

use hdk::utils::{
	GetLinksLoadResult,
	get_links_and_load_type,
};

use crate::profile::{
	Profile,
	ProfileSpec,
	ProfileField,
	MapFieldsResult,
};

use std::convert::TryInto;

use hdk::error::{ZomeApiResult, ZomeApiError};
use crate::profile;
extern crate serde_json;

/*=============================================
=            Public zome functions            =
=============================================*/


pub fn handle_register_app(spec: ProfileSpec) -> ZomeApiResult<()> {
    hdk::debug("bridge register profile spec")?;
	let persona_entry = Entry::App(
        AppEntryType::from("profile"),
        AppEntryValue::from(spec),
    );
    let anchor_entry = Entry::App(
        AppEntryType::from("profile_anchor"),
        AppEntryValue::from(RawString::from(AGENT_ADDRESS.to_string())),
    );

	let profile_address = hdk::commit_entry(&persona_entry)?;
	let anchor_address = hdk::commit_entry(&anchor_entry)?;

	hdk::link_entries(&anchor_address, &profile_address, "profiles", "")?;
    hdk::debug("finish bridge register profile spec")?;
	Ok(())
}


pub fn handle_get_profiles() -> ZomeApiResult<Vec<Profile>> {
	let anchor_entry = Entry::App(
        AppEntryType::from("profile_anchor"),
        AppEntryValue::from(RawString::from(AGENT_ADDRESS.to_string())),
    );
	let anchor_address = hdk::commit_entry(&anchor_entry)?;

	let result: Vec<GetLinksLoadResult<ProfileSpec>> = get_links_and_load_type(&anchor_address, Some("profiles".into()), None)?;

	Ok(result.iter().map(|elem| {
		let spec = elem.entry.clone();
		let mapped_fields = get_mapped_profile_fields(&elem.address).unwrap_or(Vec::new());

		let fields: Vec<profile::ProfileField> = spec.fields.iter().map(|field_spec| {

			for matching_map in mapped_fields.iter().filter(|mapped_field| { mapped_field.entry.name == field_spec.name }) {
				return matching_map.entry.clone() // return the first if there are multiple mappings for the same fieldSpec
			}

			profile::ProfileField::from_spec(field_spec.clone(), None)

		}).collect();

		profile::Profile::from_spec(
			spec,
			elem.address.to_owned(),
			fields,
		)

	}).collect())
}


pub fn handle_create_mapping(mapping: profile::ProfileMapping) -> ZomeApiResult<MapFieldsResult> {
	let profiles: Vec<profile::Profile> = handle_get_profiles()?;
	let mut mappings_created = 0;

	for profile in profiles.iter().filter(|profile| profile.source_dna == mapping.retriever_dna)  {
		for field in profile.fields.iter().filter(|field| field.name == mapping.profile_field_name) {
			mappings_created += 1;

			let new_field = field.new_with_mapping(Some(profile::FieldMapping {
				persona_address: mapping.persona_address.to_owned(),
				persona_field_name: mapping.persona_field_name.to_owned()
			}));

			let field_entry = Entry::App(
		        AppEntryType::from("field_mapping"),
		        AppEntryValue::from(new_field),
		    );
			let field_hash = hdk::commit_entry(&field_entry)?;
			hdk::link_entries(&profile.hash, &field_hash, "field_mappings", "")?;
		}
	}
	Ok(MapFieldsResult{mappings_created})
}


#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
struct GetFieldCallStruct {
	persona_address: Address,
	field_name: String
}

pub fn handle_retrieve(retriever_dna: Address, profile_field: String) -> ZomeApiResult<RawString> {

	let profiles: Vec<profile::Profile> = handle_get_profiles()?;
	let profile = profiles.iter().find(|profile| profile.source_dna == retriever_dna)
		.ok_or(ZomeApiError::Internal("Nothing in the vault".to_string()))?;

	let fields = get_mapped_profile_fields(&profile.hash)?;
	let field = fields.iter().find(|elem| elem.entry.name == profile_field)
		.ok_or(ZomeApiError::Internal("No matching mapped field found in profile".to_string()))?;
		
	let mapping = field.entry.mapping.clone()
		.ok_or(ZomeApiError::Internal("Field is not mapped".to_string()))?;

	let call_result = hdk::call(
		hdk::THIS_INSTANCE,
		"personas",
		Address::from(hdk::PUBLIC_TOKEN.to_string()),
		"get_field",
		GetFieldCallStruct{
			persona_address: mapping.persona_address.clone(),
			field_name: mapping.persona_field_name.clone()
		}.into()
	)?;
	hdk::debug(format!("Result of calling persona get_field from profiles: {:?}", call_result))?;
	return call_result.try_into()?
}


/*=====  End of Public zome functions  ======*/

fn get_mapped_profile_fields(profile_address: &Address) -> ZomeApiResult<Vec<GetLinksLoadResult<ProfileField>>> {
	get_links_and_load_type(profile_address, Some("field_mappings".into()), None)
}
