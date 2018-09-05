class RouteService{

  static async getRoutelist() {
    let url = `${APP_DOMAIN}api/getRoutelist.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getEventHistoryRoute(sentData) {
    let url = `${APP_DOMAIN}api/GetEventHistoryRoute.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getRouteCreatedData(sentData) {
    // sentData = { iZoneIDIN: 14 }
    let url = `${APP_DOMAIN}api/GetRouteCreatedData.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getRoutesOnZone(sentData) {
    let url = `${APP_DOMAIN}api/GetRouteData.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async updateRouteDetail(sentData) {
    let url = `${APP_DOMAIN}api/UpdateRoute.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async saveRoute(sentData) {
    return RouteService.updateRouteDetail(sentData);
  }

  static async deleteRoute(sentData) {
    return RouteService.updateRouteDetail(sentData);
  }

  static async getRouteDetailsData(sentData) {
    let url = `${APP_DOMAIN}api/GetRouteDetailData.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async reportRoutebydate(sentData) {
    let url = `${APP_DOMAIN}api//Report/ReportRoutebydate.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async updateRouteGuard(sentData) {
    let url = `${APP_DOMAIN}api/UpdateRouteGuard.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }
  
}