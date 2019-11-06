interface GlobalConfig {
  token:string;
  [propName:string]: any;
}
const Global:GlobalConfig = {
  token:'',
  versionAndroid:'',
  upgradeUrlAndroid:'',
  isUpgrade:false,
}
export default Global
