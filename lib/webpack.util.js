module.exports = {
	getWidgetAssetServer: () => {
	  if(!process.env.WIDGET_ASSET_SERVER) return "."
	  var url = new URL(process.env.WIDGET_ASSET_SERVER);
	  if(process.env.PORT && !url.port) url.port = process.env.PORT
	  url = url.toString()
	  return url.endsWith("/") ? url.substring(0, url.length - 1) : url 
	}
}
