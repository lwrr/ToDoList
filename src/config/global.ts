interface GlobalConfig {
  token:string;
  [propName:string]: any;
}
const Global:GlobalConfig = {
  token:'',
  versionAndroid:'3.0.0',
  upgradeUrlAndroid:'',
  isUpgrade:false,
}
export default Global
