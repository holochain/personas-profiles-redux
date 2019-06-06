

use hdk::holochain_core_types::error::HolochainError;
use hdk::holochain_core_types::json::JsonString;
use hdk::{
    self,
    entry_definition::ValidatingEntryType,
};

use hdk::holochain_core_types::{
    dna::entry_types::Sharing,
    cas::content::Address,
};

use crate::{
    PROFILE_ENTRY,
    FIELD_MAPPING_ENTRY,
    FIELD_MAPPINGS_LINK_TYPE,
};

pub mod handlers;

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct ProfileSpec {
    pub name: String,
    pub source_dna: Address,
    pub fields: Vec<ProfileFieldSpec>
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct ProfileFieldSpec {
    pub name: String,
    pub display_name: String,
    pub required: bool,
    pub description: String,
    pub usage: UsageType,
    pub schema: String
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
pub enum UsageType {
    STORE,
    DISPLAY
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct ProfileMapping {
    pub retriever_dna: Address,
    pub profile_field_name: String,
    pub persona_address: Address,
    pub persona_field_name: String
}

#[derive(Serialize, Deserialize, Debug, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct Profile {
    pub name: String,
    pub source_dna: Address,
    pub hash: Address,
    pub fields: Vec<ProfileField>,
    pub expiry: u32
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct FieldMapping {
    pub persona_address: Address,
    pub persona_field_name: String
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct ProfileField {
    pub name: String,
    pub display_name: String,
    pub required: bool,
    pub description: String,
    pub usage: UsageType,
    pub schema: String,
    pub mapping: Option<FieldMapping>
}

#[derive(Serialize, Deserialize, Debug, Clone, DefaultJson)]
#[serde(rename_all = "camelCase")]
pub struct MapFieldsResult {
    pub mappings_created: i32,
}

pub fn profile_definition() -> ValidatingEntryType {
    entry!(
        name: PROFILE_ENTRY,
        description: "A data schema provided by a hApp that describes what data it is requiesting and how it will use it",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<ProfileSpec>| {
            Ok(())
        },
        links: [
            to!(
                FIELD_MAPPING_ENTRY,
                link_type: FIELD_MAPPINGS_LINK_TYPE,
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: | _validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            )
        ]
    )
}

pub fn field_mapping_definition() -> ValidatingEntryType {
    entry!(
        name: FIELD_MAPPING_ENTRY,
        description: "A single piece of data that is attached to a persona",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<ProfileField>| {
            Ok(())
        }
    )
}

impl Profile {
    pub fn from_spec(spec: ProfileSpec, hash: Address, fields: Vec<ProfileField>) -> Profile {
        Profile {
            fields: fields,
            hash: hash,
            name: spec.name,
            source_dna: spec.source_dna,
            expiry: 0
        }
    }
}


impl ProfileField {
    pub fn from_spec(spec: ProfileFieldSpec, mapping: Option<FieldMapping>) -> ProfileField {
        ProfileField {
            mapping: mapping,
            name: spec.name,
            description: spec.description,
            display_name: spec.display_name,
            required: spec.required,
            schema: spec.schema,
            usage: spec.usage
        }
    }

    pub fn new_with_mapping(&self, mapping: Option<FieldMapping>) -> ProfileField {
        ProfileField {
            mapping: mapping,
            name: self.name.clone(),
            description: self.description.clone(),
            display_name: self.display_name.clone(),
            required: self.required.clone(),
            schema: self.schema.clone(),
            usage: self.usage.clone()
        }
    }
}
