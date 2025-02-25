export const environment = {
    production: true,
    getApiUrl: window.location.protocol + '//' + window.location.hostname + ':5000/api/v1', // Dinamik host URL
    getDropDownSetting: {
      singleSelection: false,
      idField: 'id',
      textField: 'label',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    },
    getDatatableSettings: {
      pagingType: 'full_numbers',
      pageLength: 10
    }
  };
  