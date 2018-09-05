class TourService{

  static async processTourError(sentData) {
    let url = `${APP_DOMAIN}api/ProcessTourError.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getLiveTour(sentData) {
    let url = `${APP_DOMAIN}api/GetLiveTour.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getEventHistoryDetails(checkingCode) {
    let sentData = { CheckingCode: checkingCode };
    let url = `${APP_DOMAIN}api/GetEventHistoryDetail.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }
  
  static async getTourDetail(sentData) {
    let url = `${APP_DOMAIN}api/GetTourDetail.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getEventsData() {
    let url = `${APP_DOMAIN}api/GetEvent.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }
  
}