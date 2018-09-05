class IncidentService{

  static async getLiveIncident(sentData) {
    let url = `${APP_DOMAIN}api/GetLiveIncident.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getIncidentsData(sentData) {
    let url = `${APP_DOMAIN}api/GetIncidentData.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getIncidentContent() {
    let url = `${APP_DOMAIN}api/GetIncidentContent.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async updateIncident(sentData){
    let url = `${APP_DOMAIN}api/UpdateIncident.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async insertIncident(sentData) {
    return IncidentService.updateIncident(sentData);
  }
  
  static async deleteIncident(sentData){
    return IncidentService.updateIncident(sentData);
  }

  static async reportIncidentWeekOrMonthChart(sentData) {
    let url = `${APP_DOMAIN}api/Report/ReportIncidentWeekOrMonthChart.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async reportIncidentWeekOrMonth(sentData) {
    let url = `${APP_DOMAIN}api/Report/ReportIncidentWeekOrMonth.php`;
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