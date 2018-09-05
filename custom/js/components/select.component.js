class SelectComponentService{

  static async renderGuardSelectList(all, className) {
    if(!className) className = 'selectGuards';
    let data = await GuardService.getGuardsData();
    let $select = $(`.${className}`);
    $select.html('');
    if(!data) return;
    if(all) $select.append(`<option value="0">All</option>`)
    data.forEach(g => {
      const { iGuardId, sGuardName } = g;
      $select.append(`<option value="${iGuardId}">${sGuardName}</option>`)
    })
    return data;
  }

  static async renderZoneSelectList(all, className) {
    if(!className) className = 'selectZones';
    let data = await ZoneService.getAllZones();
    let $select = $(`.${className}`);
    $select.html('');
    if(!data) return;
    if(all) $select.append(`<option value="0">All</option>`)
    data.forEach(zone => {
      const { iZoneID, sZoneName } = zone;
      $select.append(`<option value="${iZoneID}">${sZoneName}</option>`)
    })
    return data;
  }

  static async renderRouteSelectList(all, className) {
    if(!className) className = 'selectRoutes';
    let data = await RouteService.getRoutelist();
    let $select = $(`.${className}`);
    $select.html('');
    if(!data) return;
    if(all) $select.append(`<option value="0">All</option>`)
    data.forEach(route => {
      const { iRouteID, sRouteName } = route;
      $select.append(`<option value="${iRouteID}">${sRouteName}</option>`)
    })
    return data;
  }

  static async renderGroupSelectList(all, className) {
    if(!className) className = 'selectGroups'
    let data = await GroupService.getGroup();
    let $select = $(`.${className}`);
    $select.html('');
    if(!data) return;
    if(all) $select.append(`<option value="0">All</option>`)
    data.forEach(group => {
      const { iGuardGroupID, sGroupName } = group;
      $select.append(`<option value="${iGuardGroupID}">${sGroupName}</option>`)
    })
    return data;
  }

  static async renderIncidentSelectList(all, className) {
    if(!className) className = 'selectIncidents'
    let data = await IncidentService.getIncidentContent();
    let $select = $(`.${className}`);
    $select.html('');
    if(!data) return;
    if(all) $select.append(`<option value="0">All</option>`)
    data.forEach(incident => {
      const { iAlertContentID, sAlertContent } = incident;
      $select.append(`<option value="${iAlertContentID}">${sAlertContent}</option>`)
    })
    return data;
  }

  static async renderDeviceSelectList(all, className) {
    if(!className) className = 'selectDevices'
    let data = await DeviceService.getDevicelist();
    let $select = $(`.${className}`);
    $select.html('');
    if(!data) return;
    if(all) $select.append(`<option value="0">All</option>`)
    data.forEach(device => {
      const { sDeviceName, iDeviceID } = device;
      $select.append(`<option value="${iDeviceID}">${sDeviceName}</option>`)
    })
    return data;
  }

  static renderMonthSelectList() {
    let $select = $('.selectMonth');
    $select.html('');
    for(let i = 1; i <= 12; i++){
      $select.append(`<option value="${i}">${arrMonths[i - 1]}</option>`);
    }
  }

  static renderYearSelectList(){
    let $select = $('.selectYear');
    $select.html('');
    for(let i = 1; i <= 5; i++){
      $select.append(`<option value="${i + 2017}">${arrYears[i - 1]}</option>`);
    }
  }
  
  static renderWeekSelectList(){
    let $select = $('.selectWeek');
    $select.html('');
    for(let i = 1; i <= 52; i++){
      $select.append(`<option value="${i}">Week ${i}</option>`);
    }
  }
  
}