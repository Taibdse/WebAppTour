class GuardService{

  static async updateGuard(sentData) {
    let url = `${APP_DOMAIN}api/UpdateGuard.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async insertGuard(sentData) {
    return GuardService.updateGuard(sentData);
  }

  static async inActiveGuard(sentData) {
    return GuardService.updateGuard(sentData);
  }

  static async getPersonalGuardsInfo(sentData) {
    let url = `${APP_DOMAIN}api/GetGuardInformation.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async sendMessageGuard(sentData) {
    let url = `${APP_DOMAIN}api/InsertMessage.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async sendSMSToGuards(sentData) {
    let url = `${APP_DOMAIN}api/InsertMessage.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getGuardsData() {
    let url = `${APP_DOMAIN}api/GetGuard.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getEventHistoryDataGuard(sentData) {
    let url = `${APP_DOMAIN}api/GetEventHistoryGuard.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getGuardGPSCurrent(sentData) {
    let url = `${APP_DOMAIN}api/GetGuardGPSCurrent.php`;
    let method = 'get';
    let data = sentData;
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async makeAttendance(sentData) {
    let url = `${APP_DOMAIN}api/CheckTime.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getReportWorkingvsIdlingTimeGuardData(sentData) {
    let url = `${APP_DOMAIN}api/Report/ReportWorkingvsIdlingTimeGuard.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getLiveAttandance() {
    let url = `${APP_DOMAIN}api/GetLiveAttandance.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getDataAttandance(sentData) {
    let url = `${APP_DOMAIN}api/GetDataAttandance.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getGuardTrackingbyTour(sentData) {
    let url = `${APP_DOMAIN}api/GuardTrackingbyTour.php`;
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