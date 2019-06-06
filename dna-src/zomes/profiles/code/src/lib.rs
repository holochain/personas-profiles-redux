#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
    error::{ZomeApiResult},
    holochain_core_types::{cas::content::Address, json::JsonString, json::RawString, error::HolochainError},
    holochain_core_types::dna::entry_types::Sharing,
};

pub mod profile;
pub type Base = RawString;

pub static PROFILE_ENTRY: &str = "profile";
pub static FIELD_MAPPING_ENTRY: &str = "field_mapping";
pub static PROFILE_ANCHOR_ENTRY: &str = "profile_anchor";

pub static FIELD_MAPPINGS_LINK_TYPE: &str = "field_mappings";
pub static PROFILES_LINK_TYPE: &str = "profiles";

define_zome! {

	entries: [
	   profile::profile_definition(),
	   profile::field_mapping_definition(),
        entry!(
            name: PROFILE_ANCHOR_ENTRY,
            description: "",
            sharing: Sharing::Public,
            validation_package: || {
                hdk::ValidationPackageDefinition::Entry
            },
            validation: | _validation_data: hdk::EntryValidationData<Base>| {
                Ok(())
            },
            links: [
                to!(
                    PROFILE_ENTRY,
                    link_type: PROFILES_LINK_TYPE,
                    validation_package: || {
                        hdk::ValidationPackageDefinition::Entry
                    },
                    validation: | _validation_data: hdk::LinkValidationData| {
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
            inputs: |retriever_dna: Address, profile_field: String|,
            outputs: |result: ZomeApiResult<RawString>|,
            handler: profile::handlers::handle_retrieve
        }
	]

    traits: {
        hc_public [register_app, get_profiles, create_mapping, retrieve]
    }
 }
