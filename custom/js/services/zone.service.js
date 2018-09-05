class ZoneService{

  static async getAllZones() {
    let url = `${APP_DOMAIN}api/GetZone.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async insertZone(sentData) {
    let url = `${APP_DOMAIN}api/UpdateZone.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async updateZone(sentData) {
    let url = `${APP_DOMAIN}api/UpdateZone.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async inActiveZone(sentData) {
    let url = `${APP_DOMAIN}api/UpdateZone.php`;
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