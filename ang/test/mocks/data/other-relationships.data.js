((_) => {
  var module = angular.module('civicase.data');

  module.service('OtherRelationshipsData', function () {
    var relationships = [
      {
        id: 2,
        client_contact_id: 170,
        relationship_id: 27,
        relationship_type_id: 17,
        relationship_description: null,
        relationship_direction: 'a_b',
        contact_id: '2',
        contact_type: 'Individual',
        contact_sub_type: '',
        sort_name: 'admin@example.com',
        display_name: 'admin@example.com',
        do_not_email: '0',
        do_not_phone: '0',
        do_not_mail: '0',
        do_not_sms: '0',
        do_not_trade: '0',
        is_opt_out: '0',
        legal_identifier: '',
        external_identifier: '',
        nick_name: '',
        legal_name: '',
        image_URL: '',
        preferred_communication_method: '',
        preferred_language: 'en_GB',
        preferred_mail_format: 'Both',
        first_name: '',
        middle_name: '',
        last_name: '',
        prefix_id: '',
        suffix_id: '',
        formal_title: '',
        communication_style_id: '1',
        job_title: '',
        gender_id: '',
        birth_date: '',
        is_deceased: '0',
        deceased_date: '',
        household_name: '',
        organization_name: '',
        sic_code: '',
        contact_is_deleted: '0',
        current_employer: '',
        address_id: '',
        street_address: '',
        supplemental_address_1: '',
        supplemental_address_2: '',
        supplemental_address_3: '',
        city: '',
        postal_code_suffix: '',
        postal_code: '',
        geo_code_1: '',
        geo_code_2: '',
        state_province_id: '',
        country_id: '',
        phone_id: '',
        phone_type_id: '',
        phone: '',
        email_id: '2',
        email: 'admin@example.com',
        on_hold: '0',
        im_id: '',
        provider_id: '',
        im: '',
        worldregion_id: '',
        world_region: '',
        languages: 'English (United Kingdom)',
        individual_prefix: '',
        individual_suffix: '',
        communication_style: 'Formal',
        gender: '',
        state_province_name: '',
        state_province: '',
        country: ''
      }, {
        id: 4,
        client_contact_id: 170,
        relationship_id: 28,
        relationship_type_id: 14,
        relationship_description: null,
        relationship_direction: 'a_b',
        contact_id: '4',
        contact_type: 'Individual',
        contact_sub_type: '',
        sort_name: 'C, C',
        display_name: 'C C',
        do_not_email: '0',
        do_not_phone: '0',
        do_not_mail: '0',
        do_not_sms: '0',
        do_not_trade: '0',
        is_opt_out: '0',
        legal_identifier: '',
        external_identifier: '',
        nick_name: '',
        legal_name: '',
        image_URL: '',
        preferred_communication_method: '',
        preferred_language: 'en_GB',
        preferred_mail_format: 'Both',
        first_name: 'C',
        middle_name: '',
        last_name: 'C',
        prefix_id: '',
        suffix_id: '',
        formal_title: '',
        communication_style_id: '1',
        job_title: '',
        gender_id: '',
        birth_date: '',
        is_deceased: '0',
        deceased_date: '',
        household_name: '',
        organization_name: '',
        sic_code: '',
        contact_is_deleted: '0',
        current_employer: '',
        address_id: '',
        street_address: '',
        supplemental_address_1: '',
        supplemental_address_2: '',
        supplemental_address_3: '',
        city: '',
        postal_code_suffix: '',
        postal_code: '',
        geo_code_1: '',
        geo_code_2: '',
        state_province_id: '',
        country_id: '',
        phone_id: '',
        phone_type_id: '',
        phone: '',
        email_id: '4',
        email: 'c@c.com',
        on_hold: '0',
        im_id: '',
        provider_id: '',
        im: '',
        worldregion_id: '',
        world_region: '',
        languages: 'English (United Kingdom)',
        individual_prefix: '',
        individual_suffix: '',
        communication_style: 'Formal',
        gender: '',
        state_province_name: '',
        state_province: '',
        country: ''
      }
    ];

    return {
      /**
       * Returns a list of mocked relationships
       *
       * @returns {Array} list of relationships
       */
      get: function () {
        return angular.copy(relationships);
      }
    };
  });
})(CRM._);
