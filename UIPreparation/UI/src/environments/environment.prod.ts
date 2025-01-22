export const environment = {
    production: true,
    getApiUrl: `http://banu-pass-api:5000/api/v1`, // Prodüksiyon API URL'si
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
  