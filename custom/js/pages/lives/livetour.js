$(async () => {

  //bind event click view to show event history
  $('#btnShowLiveTourDataByGuard').click(() => {
    showLiveTourData('guard')
  });
  $('#btnShowLiveTourDataByRoute').click(() => {
    showLiveTourData('route')
  });
  $('#btnShowLiveTourDataByDevice').click(() => {
    showLiveTourData('device');
  });
  $('#btnIncidentsMap').click(showAllIncidentsMap)
  // set up time default when page onload 
  // formatTodayEvent();
  arrGuardList = await SelectComponentService.renderGuardSelectList(false);
  arrRouteList = await SelectComponentService.renderRouteSelectList(false);
  arrDeviceList = await SelectComponentService.renderDeviceSelectList(false);
  
  if(!arrGuardList) arrGuardList = [];
  if(!arrRouteList) arrRouteList = [];
  if(!arrDeviceList) arrDeviceList = [];

  showTourListsByDefault();
})

let arrGuardList = [];
let arrRouteList = [];
let arrDeviceList = [];
let headerTblTours = '';

async function showTourListsByDefault(){
  let sentData = { "iKindSearch":0,"iID":0};
  data = await TourService.getLiveTour(sentData);
  if(data) showToursListPagination(data);
  else AlertService.showAlertError("No data available", "", 3000);
  setDefaultLang();
}

function showAllIncidentsMap() {
  $('#modalEventMap').modal('show');
}

async function showLiveTourData(type) {
  
  type = type[0].toUpperCase() + type.substring(1).toLowerCase();
  let id = $(`#select${type}Name`).val();

  if (id) {
    let sentData = null;
    let data = null;

    if(type.toLowerCase() == 'guard'){
        sentData = { "iKindSearch":1,"iID":id};
    }else if(type.toLowerCase() == 'route'){
        sentData = { "iKindSearch":2,"iID":id};
    }else if(type.toLowerCase() == 'device'){
        sentData = { "iKindSearch":3,"iID":id};
    }
    //console.log(sentData);
    data = await TourService.getLiveTour(sentData);
    //console.log(data);
    if(data){
      showToursListPagination(data);
    }else {
      resetTblEventHistory();
      AlertService.showAlertError("No data available", "", 3000);
    }
  }
  setDefaultLang();
}

function showToursListPagination(data){
  $('#totalTours').html(`<strong class="trn">Total tours</strong>: ${data.length}`)
  $('#pagingToursControl').pagination({
    dataSource: data,
    pageSize: 10,
    className: 'paginationjs-theme-green paginationjs-big',
    showGoInput: true,
    showGoButton: true,
    callback: function (data, pagination) {
      // template method of yourself
      let $table = renderEventHistoryTable(data);
      $('.card-tour .table-responsive').html($table);
      setDefaultLang();
    }
  })
}

function resetTblEventHistory(){
  $('#totalTours').html('');
  $('#pagingToursControl').html('');
  $('#tblEventHistory').html('');
  $('.headerTblTours').html('');
}

function renderEventHistoryTable(data) {
  let $table = $(`<table class="table table-hover table-striped table-condensed text-center custom-table" id="tblEventHistory" style="min-height: 150px"></table>`);
  let $thead = $('<thead class="custom-table-header"></thead>');
  let $tbody = $('<tbody></tbody>');

  $thead.html(
    `
      <tr>
        <th class="trn">#</th>
        <th class="trn">Zone</th>
        <th class="trn">Route</th>
        <th class="trn">Name of Guard</th>
        <th class="trn">Device</th>
        <th class="trn">Tour No</th>
        <th class="trn">Start</th>
        <th class="trn">Finish</th>
        <th class="trn">Timing (min)</th>
        <th class="trn ">Missed CheckPoint Name</th>
        <th class="trn">Distance (km)</th>
        <th class="trn"></th>
      </tr>
    `
  )
  if (data) {
    data.forEach((event, index) => {
      const { sZoneName, sRouteName, sGuardName, sDeviceName, dDateTimeStart, dDateTimeEnd, iTimeComplete, dDistance, sCheckingCode, MissedCheckPointName, iNoTour}= event;
      $tbody.append(`
        <tr>
          <td>${index + 1}</td>
          <td>${sZoneName}</td>
          <td>${sRouteName}</td>
          <td>${sGuardName}</td>
          <td>${sDeviceName}</td>
          <td>${iNoTour}</td>
          <td>${dDateTimeStart}</td>
          <td>${dDateTimeEnd}</td>
          <td>${iTimeComplete}</td>
          <td class="text-left">${MissedCheckPointName}</td>
          <td>${dDistance}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-custom bg-main-color btn-custom-small dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="trn">Action</span>
              </button>
              <div class="dropdown-menu" >
                <button class="btn btn-custom btn-success btn-custom-small dropdown-item trn" style=" margin-top:-5px" onClick = "showEventDetailsMap('${sCheckingCode}')">Map</button>
                <button class="btn btn-custom btn-info btn-custom-small dropdown-item trn" style=" margin-top:-5px; margin-left: 5px" onClick = "showEventHistoryDetails('${sCheckingCode}')">Details</button>
              </div>
            </div>
          </td>
        </tr>
      `)
    })
  } 
  $table.append($thead).append($tbody);
  return $table;
}


function checkTimeFormat(from, to) {
  let valid = true;
  let errMsg = '';
  if (from == '' || to == '') {
    valid = false;
    errMsg += `Please choose date time\n`;
  } else {
    let fromDate = new Date(from).getTime();
    let toDate = new Date(to).getTime();
    if (fromDate >= toDate) {
      valid = false;
      errMsg += 'Start date must be sooner than end date\n';
    }
  }
  if (!valid) AlertService.showAlertError("Invalid date", errMsg, 6000);
  return valid;
}

async function showEventHistoryDetails(checkingCode) {
  let data = await TourService.getEventHistoryDetails(checkingCode);
  renderTableEventHistoryDetails(data);
  setDefaultLang();
  $('#modalEventHistoryDetails').modal('show');
}

function renderTableEventHistoryDetails(data) {
  let $table = $('#tblEventHistoryDetails');
  $table.html('');
  let $thead = $('<thead class="custom-table-header"></thead>');
  let $tbody = $('<tbody></tbody>');

  $thead.html(
    `
      <tr>
        <th class="trn">Name</th>
        <th class="trn">Point ID</th>
        <th class="trn">Status</th>
        <th class="trn">Datetime</th>
        <th class="trn">KindCheck</th>
        <th class="trn">#</th>
      </tr>
    `
  )
  if (data) {
    data.forEach(detail => {
      $tbody.append(`
        <tr>
          <td>${detail.sGuardName}</td>
          <td>${detail.iPointID}</td>
          <td>${detail.sStatus}</td>
          <td>${detail.dDateTimeHistory}</td>
          <td>${detail.KindCheck}</td>
          <td>${detail.iNo}</td>
        </tr>
      `)
    })
  } 
  $table.append($thead).append($tbody);
}

function renderModalEditEventHistoryDetails(data) {
  $('#modalEventHistoryDetailsEdit').modal('show');
}

function buildEventDetailsMap(data, dataTracking){
  let lat = CENTER_POS_MAP_VIEW[0];
  let lng = CENTER_POS_MAP_VIEW[1];
  let mapProp = GoogleMapService.createMapProp(16, lat, lng);
  let mymap = new google.maps.Map($('#mapEventDetails')[0], mapProp);
  if(data){
    let l1 = data.length;
    data.forEach((detail, index) => {
      let lat = Number(detail.dPointLat);
      let lng = Number(detail.dPointLong);
      let pos = new google.maps.LatLng(lat, lng);
      if (lat != 0 || lng != 0){
        if(detail.sStatus == 'Checked'){
          let mes = `${detail.sGuardName} checked at ${detail.dDateTimeHistory}`
          let icon = '../../img/Checked.png';
          let marker = GoogleMapService.createMarker(pos, icon);
          marker.setMap(mymap);
          let infoWindow = GoogleMapService.createInfoWindow(mes);
          if(index == 0 || index == l1 - 1) 
            infoWindow.open(mymap, marker);
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(mymap, marker);
          });
        }else{
          let icon = '../../img/None.png';
          let marker = GoogleMapService.createMarker(pos, icon);
          marker.setMap(mymap);
        }
      }
    })
  }
  if(dataTracking){
    let path = [];
    dataTracking.forEach(item => {
      const { dGuardLatCurrent, dGuardLongCurrent } = item;
      let lat = Number(dGuardLatCurrent);
      let lng = Number(dGuardLongCurrent);
      if (lat != 0 || lng != 0){
        let pos = new google.maps.LatLng(lat, lng);
        path.push(pos);
      }
    })
    let polyline = GoogleMapService.createPolyline(path);
    polyline.setMap(mymap);
  }
}

async function showEventDetailsMap(checkingCode) {
  let $mapView = $('<div id="mapEventDetails" class="mymap"></div>');
  $('#modalEventMap').find('.modal-body').html($mapView);
  let data = await TourService.getEventHistoryDetails(checkingCode);
  let sentData = { CheckingCode: checkingCode };
  let dataTracking = await GuardService.getGuardTrackingbyTour(sentData);
  $('#modalEventMap').modal('show');
  buildEventDetailsMap(data, dataTracking);
}
