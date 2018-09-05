class AssetService{

  static async getAssetsData(sentData) {
    let url = `${APP_DOMAIN}api/GetAssetData.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async getAssetsData(sentData) {
    let url = `${APP_DOMAIN}api/getassetsdata.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return CommonService.handleData(res);
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async updateAsset(sentData){
    let url = `${APP_DOMAIN}api/Updateasset.php`;
    let method = 'post';
    let data = JSON.stringify(sentData);
    try {
      let res = await $.ajax({ url, method, data });
      return res;
    } catch (error) {
      return CommonService.handleError(error);
    }
  }

  static async deleteAsset(sentData){
    AssetService.updateAsset(sentData);
  }

  static async insertAsset(sentData){
    AssetService.updateAsset(sentData);
  }

}