class DeviceService{

  static async getDevice(sentData) {
    let url = `${APP_DOMAIN}api/GetDevice.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getDevicelist() {
    let url = `${APP_DOMAIN}api/getDevicelist.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getEventHistoryDevice(sentData) {
    let url = `${APP_DOMAIN}api/GetEventHistoryDevice.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async updateDevice(sentData) {
    let url = `${APP_DOMAIN}api/UpdateDevice.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async insertDevice(sentData) {
    return DeviceService.updateDevice(sentData);
  }

  static async lockDevice(sentData) {
    return DeviceService.updateDevice(sentData);
  }

  static async getReportWorkingvsIdlingTimeDeviceData(sentData) {
    let url = `${APP_DOMAIN}api/Report/ReportWorkingvsIdlingTimeDevice.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  


  
  
}