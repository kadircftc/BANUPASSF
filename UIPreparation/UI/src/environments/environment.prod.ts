export const environment = {
    production: true,
    getApiUrl: '/api/v1', // Dinamik host URL
    signalRUrl: '/d_o10_sig_r',  // SignalR hub URL'si
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
      pageLength: 2
    }
  };
  