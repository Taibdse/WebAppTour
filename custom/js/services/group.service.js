class GroupService{

  static async getGroup() {
    let url = `${APP_DOMAIN}api/getGroup.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getGroupData() {
    let url = `${APP_DOMAIN}api/GetGroupData.php`;
    let method = 'post';
    try {
      let res = await $.ajax({ url, method });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async updateGroup(sentData){
    let url = `${APP_DOMAIN}api/UpdateGroup.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async deleteGroup(sentData){
    return GroupService.updateGroup(sentData);
  }

  static async insertGroup(sentData){
    return GroupService.updateGroup(sentData);
  }

  static async getReportWorkingvsIdlingTimeGuardGroup(sentData) {
    let url = `${APP_DOMAIN}api/Report/ReportWorkingvsIdlingTimeGuardGroup.php`;
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