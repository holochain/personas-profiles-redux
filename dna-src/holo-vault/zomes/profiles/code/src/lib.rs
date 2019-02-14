#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
    error::{ZomeApiError, ZomeApiResult},
    holochain_core_types::{cas::content::Address, entry::Entry, json::JsonString, json::RawString, error::HolochainError},
    holochain_wasm_utils::api_serialization::get_links::GetLinksResult,
    holochain_core_types::dna::entry_types::Sharing,
};

pub mod profile;
mod utils;

define_zome! {

	entries: [
	   profile::profile_definition(),
	   profile::field_mapping_definition(),
        entry!(
            name: "profile_anchor",
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
                    "profile",
                    tag: "profiles",

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

    genesis: || {{ Ok(()) }}

    functions: [
		register_app: {
			inputs: |spec: profile::ProfileSpec|,
			outputs: |result: ZomeApiResult<()>|,
			handler: profile::handlers::handle_register_app
		}
		get_profiles: {
			inputs: | |,
			outputs: |profiles: ZomeApiResult<Vec<profile::Profile>>|,
			handler: profile::handlers::handle_get_profiles
		}
        create_mapping: {
            inputs: |mapping: profile::ProfileMapping|,
            outputs: |result: ZomeApiResult<profile::MapFieldsResult>|,
            handler: profile::handlers::handle_create_mapping
        }
        retrieve: {
            inputs: |retriever_DNA: Address, profile_field: String|,
            outputs: |result: ZomeApiResult<RawString>|,
            handler: profile::handlers::handle_retrieve
        }
	]

    traits: {
        hc_public [register_app, get_profiles, create_mapping, retrieve]
    }
 }
