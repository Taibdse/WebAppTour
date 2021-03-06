$(() => {
  $('#formUpdateGuard').submit((e) => {
    e.preventDefault();
    updateGuard();
  });
  $('#formInsertGuard').submit(e => {
    e.preventDefault();
    insertGuard();
  });
  $('#btnShowGuardInsertModal').click(showGuardModalInsert);
  $('#btnSendMessageGuard').click(sendMessageGuard);
  $('#selectFilterGuardByGroup').change(showGuards);
  $('#btnConfirmPass').click(saveNewPassword);
  showGuardGroupsFilter()
  SelectComponentService.renderGroupSelectList(false);
  showGuards();
})

var currentSendMessageGuard = null;

async function saveNewPassword(){
  let pass = $('#txtUpdateGuardPassword').val();
  let repass = $('#txtUpdateGuardRepassword').val();
  if(!validateResetPassword(pass, repass)) return;
  let sentData = {};
  let response = GuardService.resetGuardPassword(sentData);
  console.log(response);
  AlertService.showAlertSuccess("Reset successfully", "", 4000);
}

function validateResetPassword(pass, repass){
  let err = '';
  let valid = true;
  if(!checkPass(pass)){
    valid = false;
    err += 'Password is required and more than 6 characters\n'
  }
  if(!checkPass(repass)){
    valid = false;
    err += 'Repassword is required and more than 6 characters\n'
  }
  if(pass != repass) {
    valid = false;
    err += 'Repassword and password must be the same\n'
  }
  if(!valid) AlertService.showAlertError("Invalid data!!!", err);
  return valid;
}

function checkPass(pass){
  if(!ValidationService.checkEmpty(pass)) return false;
  if(pass.trim().length < 6 ) return false;
  return true;
}

function showModalResetPass(){
  $('#txtUpdateGuardPassword').val('');
  $('#txtUpdateGuardRepassword').val('');
  $('#modalResetPassword').modal('show');
}

async function insertGuard(){
  let name = $('#txtInsertGuardName').val();
  let phone = $('#txtInsertGuardPhone').val();
  let username = $('#txtInsertGuardUsername').val();
  let password = $('#txtInsertGuardPassword').val();
  let iGroupIDIN = $('#selectInsertGuardGroup').val();
  if(checkValidation(name, username, phone, password)){
    let sentData = { sGuardNameIN: name, sGuardPhone: phone, sGuardUsername: username, sGuardPassword: password, iGuardIDIN: 0, bStatusIN: 1, iGroupIDIN };
    console.log(JSON.stringify(sentData));
    let response = await GuardService.insertGuard(sentData);
    console.log(response);
    $('#modalInsertGuard').modal('hide');
    AlertService.showAlertSuccess("Insert successfully!", "", 2000);
    showGuards();
  }
}

function checkValidation(name, username, phone, password){
  let valid = true;
  let errMsg = '';
  if(name == null || name.trim() == ''){
    valid = false;
    errMsg += 'Name must be filled in\n'
  } 
  if(username == null || username.trim() == ''){
    valid = false;
    errMsg += 'Username must be filled in\n'
  } 
  if(!/^[0-9]+$/.test(phone)){
    valid = false;
    errMsg += 'Phone must be number\n'
  } 
  if(password.trim().length < 4){
    valid = false;
    errMsg += 'Password must be longer than 4\n'
  } 
  if(!valid){
    AlertService.showAlertError("Invalid data!", errMsg);
  }
  return valid;
}

async function updateGuard(){
  let id = $('#txtUpdateGuardID').val();
  let name = $('#txtUpdateGuardName').val();
  let phone = $('#txtUpdateGuardPhone').val();
  let username = $('#txtUpdateGuardUsername').val();
  let iGroupIDIN = $('#selectUpdateGuardGroup').val();
  if(checkValidation(name, username, phone, 'password')){
    let sentData = { sGuardNameIN: name, sGuardPhone: phone, sGuardUsername: username, sGuardPassword: 0, iGuardIDIN: id, bStatusIN: 2, iGroupIDIN };
    let response = await GuardService.updateGuard(sentData);
    console.log(response);
    AlertService.showAlertSuccess("Updated successfully!", "", 2000);
    showGuards();
  }
}

async function inActiveGuard(id){
  let sure = await showAlertWarning("Are you sure?", "");
  if(sure){
    let sentData = { sGuardNameIN: 0, sGuardPhone: 0, sGuardUsername: 0, sGuardPassword: 0, iGuardIDIN: id,  iGroupIDIN:0, bStatusIN: 3 };
    let response = await GuardService.inActiveGuard(sentData);
    console.log(response);
    AlertService.showAlertSuccess("Inactive successfully!", "", 2000);
    showGuards();
  }
}

function renderGuardTable(guards){
  let $table = $(`<table class="table table-hover table-striped table-condensed text-center custom-table min-height-table" id="tblGuards"></table>`)
  let $thead = $('<thead class="custom-table-header"></thead>');
  let $tbody = $('<tbody></tbody>');

  $thead.html(
    `
    <tr>
      <th class="trn">#</th>
      <th class="trn">ID.</th>
      <th class="trn">Full name</th>
      <th class="trn">Phone number</th>
      <th class="trn">User name</th>
      <th class="trn">Group</th>
      <th class="trn">Position</th>
      <th class="trn">Active</th>
    </tr>
  `
  )
  if (guards) {
    guards.forEach((guard, index) => {
      const { iGuardID, sGuardName, sGuardPhone, sGuardUserName, bActive, sGroupName, sPosition} = guard
      $tbody.append(`
        <tr>
          <td>${index + 1}</td>
          <td>${iGuardID}</td>
          <td>${sGuardName}</td>
          <td>${sGuardPhone}</td>
          <td>${sGuardUserName}</td> 
          <td>${sGroupName}</td>
          <td>${sPosition}</td> 
          <td>${bActive}</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-custom bg-main-color btn-custom-small dropdown-toggle trn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action</button>
              <div class="dropdown-menu" >
                <button class="btn btn-custom bg-danger btn-custom-small dropdown-item btnInactiveGuard trn">Lock</button>
                <button class="btn btn-custom btn-info btn-custom-small dropdown-item btnShowUpdateGuardModal trn">Update</button>
                <button class="btn btn-custom btn-warning btn-custom-small dropdown-item btnShowModalResetPassword trn">Reset Password</button>
                <button class="btn btn-custom btn-primary btn-custom-small dropdown-item btnShowModalSendMessage trn">Send Message</button>
                <button class="btn btn-custom btn-success btn-custom-small dropdown-item btnShowMapGuardCurrentPos trn">View map</button>
              </div>
            </div>
          </td>
        </tr>
      `)
      $tbody.find('.btn.btnInactiveGuard').last().click(() => {
          inActiveGuard(iGuardID);
      })
      $tbody.find('.btn.btnShowUpdateGuardModal').last().click(() => {
        showGuardModalUpdate(guard);
      })
      $tbody.find('.btn.btnShowModalResetPassword').last().click(() => {
        showModalResetPass();
      })
      $tbody.find('.btn.btnShowModalSendMessage').last().click(() => {
        showModalSendMessage(guard);
      })
      $tbody.find('.btn.btnShowMapGuardCurrentPos').last().click(() => {
        showModalGuardCurrentPos(guard);
      })
    })
  }

  $table.append($thead).append($tbody);
  return $table;
}

function showModalGuardCurrentPos(guard){
  let { iGuardID } = guard;
  buildCurrentPosGuardMap(iGuardID);
  $('#modalShowMapGuardCurrentPos').modal('show');
}

function showModalSendMessage(guard){
  const { iGuardID, sGuardName } = guard;
  currentSendMessageGuard = guard;
  $('#txtSendMessageGuardName').val(sGuardName);
  $('#textAreaSendMessage').val('')
  $('#modalSendMessageGuard').modal('show');
}

async function sendMessageGuard(){
  const { iGuardID } = currentSendMessageGuard;
  let sMessageContent = $('#textAreaSendMessage').val();
  let sentData = { iGuardID: [iGuardID], sMessageContent };
  let response = await GuardService.sendMessageGuard(sentData);
  console.log(response);
  $('#modalSendMessageGuard').modal('hide');
  AlertService.showAlertSuccess("Send successfully!", "", 2000);
}

function showGuardModalUpdate(guard){
  const { iGuardID, sGuardName, sGuardPhone, sGuardUserName, iGuardGroupID} = guard
  $('#txtUpdateGuardID').val(iGuardID);
  $('#txtUpdateGuardPhone').val(sGuardPhone);
  $('#txtUpdateGuardName').val(sGuardName);
  $('#txtUpdateGuardUsername').val(sGuardUserName);
  $('#selectUpdateGuardGroup').val(iGuardGroupID);
  $('#modalUpdateGuard').modal('show');
}

function showGuardModalInsert(){
  $('#formInsertGuard')[0].reset();
  $('#modalInsertGuard').modal('show');
}

async function showGuards(){
  let iGroupIDIN = $('#selectFilterGuardByGroup').val();
  if(!iGroupIDIN) iGroupIDIN = 0;
  let sentData = { iGroupIDIN };
  let guards = await GuardService.getPersonalGuardsInfo(sentData);
  console.log(guards);
  if(guards) showGuardPagination(guards);
  else{
    resetTblPersonalGuardInfo();
    AlertService.showAlertError("No data available", "", 3000);
  }
  setDefaultLang();
}

function showGuardPagination(guards){
  if(!guards) return;
  $('#totalGuards').html(`<strong class="trn">Total Guards</strong>:  ${guards.length}`);
  $('#pagingGuardsControl').pagination({
    dataSource: guards,
    pageSize: 10,
    className: 'paginationjs-theme-green paginationjs-big',
    showGoInput: true,
    showGoButton: true,
    callback: function (guards, pagination) {
      let $table = renderGuardTable(guards);
      $('.card-guard .table-responsive').html($table);
      setDefaultLang();
    }
  })
}

function resetTblPersonalGuardInfo(){
  $('#totalGuards').html('');
  $('#pagingGuardsControl').html('');
  $('#tblGuards').find('tbody').html('');
}

async function buildCurrentPosGuardMap(iGuardID, sCheckingCode){
  let $mapArea = $('<div id="guardCurrentPosMapArea" style="widht:100%; height:400px"></div>');
  $('#modalShowMapGuardCurrentPos').find('.modal-body').html($mapArea);
  let sentGuardData = { iGuardID };
  let guardGPSCurrent = await GuardService.getGuardGPSCurrent(sentGuardData);
  console.log(guardGPSCurrent);
  const { dGuardLatCurrent, dGuardLongCurrent, sMessage, bOnline } = guardGPSCurrent[0];
  let latGuard = Number(dGuardLatCurrent);
  let lngGuard = Number(dGuardLongCurrent);
  let mapProp = GoogleMapService.createMapProp(18, latGuard, lngGuard)
  let mymap = new google.maps.Map($('#guardCurrentPosMapArea')[0], mapProp);
  
  let urlGuard = '../../img/Guard.png';
  console.log(latGuard);
  console.log(lngGuard)
  let mainPos = new google.maps.LatLng(latGuard, lngGuard);
  let guardMarker = GoogleMapService.createMarker(mainPos, urlGuard);

  guardMarker.setMap(mymap);
  let infoWindowGuard = GoogleMapService.createInfoWindow(sMessage);
  infoWindowGuard.open(mymap, guardMarker);
  if(sCheckingCode){
    const pointChekingSentData = { iGuardID, sCheckingCode };
    let checkingPointData = await PointService.getPointChecking(pointChekingSentData);
    if(checkingPointData){
      checkingPointData.forEach(checkedPoint => {
        let { Lat, Long, Status, Message, ImageUrl } = checkedPoint;
        let url = '';
        switch(Status){
          case 1: 
            url = '../../img/Checked.png'; 
            break;
          case 2: 
            url = '../../img/None.png'; 
            break;
          case 3: 
            url = '../../img/Waiting.png'; 
            break;
          case 4: 
            url = '../../img/error.png'; 
            break;
        }
        let pos = new google.maps.LatLng(Lat, Long);
        let marker = GoogleMapService.createMarker(pos, url);
        marker.setMap(mymap);
        let mes = Message;
        if(Status == 4){
          mes = `${Message}<br><img src="${APP_DOMAIN}${ImageUrl}" class="img-fluid">`
          let infoWindow = GoogleMapService.createInfoWindow(mes);
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(mymap, marker);
          });
        }else{
          let infoWindow = GoogleMapService.createInfoWindow(mes);
          infoWindow.open(mymap, marker);
        }
      })
    }
  }
}

async function showGuardGroupsFilter(){
  let data = await GroupService.getGroup();
  $('#selectFilterGuardByGroup').html('');
  if(data){
    $('#selectFilterGuardByGroup').append(`<option value="0">All</option>`);
    data.forEach(group => {
      const { iGuardGroupID, sGroupName } = group;
      $('#selectFilterGuardByGroup').append(`<option value="${iGuardGroupID}">${sGroupName}</option>`);
    })
  }
}



