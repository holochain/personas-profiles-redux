#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;

use crate::persona::Persona;
use crate::utils::GetLinksLoadResult;
use hdk::{
    error::{ZomeApiError, ZomeApiResult},
    holochain_core_types::{cas::content::Address, entry::Entry, json::JsonString, json::RawString, error::HolochainError},
    holochain_wasm_utils::api_serialization::get_links::GetLinksResult,
    holochain_core_types::dna::entry_types::Sharing,
};

pub mod persona;
pub mod utils;

 define_zome! {

	entries: [
		persona::persona_definition(),
        persona::field_definition(),
		entry!(
			name: "persona_anchor",
	        description: "",
	        sharing: Sharing::Public,
	        native_type: RawString,

	        validation_package: || {
	            hdk::ValidationPackageDefinition::Entry
	        },

	        validation: |_name: RawString, _ctx: hdk::ValidationData| {
	        	Ok(())
	        },

            links: [
                to!(
                    "persona",
                    tag: "personas",

                    validation_package: || {
                        hdk::ValidationPackageDefinition::Entry
                    },

                    validation: |_base: Address, _target: Address, _ctx: hdk::ValidationData| {
                        Ok(())
                    }
                )
            ]
		)
	]

    genesis: || {
        {
            Ok(())
        }
    }

    functions: [
		create_persona: {
			inputs: |spec: persona::PersonaSpec|,
			outputs: |result: ZomeApiResult<Address>|,
			handler: persona::handlers::handle_create_persona
		}
		get_personas: {
			inputs: | |,
			outputs: |personas: ZomeApiResult<GetLinksLoadResult<Persona>>|,
			handler: persona::handlers::handle_get_personas
		}
        add_field: {
            inputs: |persona_address: Address, field: persona::PersonaField|,
            outputs: |result: ZomeApiResult<()>|,
            handler: persona::handlers::handle_add_field
        }
        get_field: {
            inputs: |persona_address: Address, field_name: String|,
            outputs: |result: ZomeApiResult<RawString>|,
            handler: persona::handlers::handle_get_field
        }
	]

    capabilities: {
        public (Public) [create_persona, get_personas, add_field, get_field]
    }
 }
