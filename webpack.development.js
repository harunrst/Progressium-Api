const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

//to be added development spesific configurations
module.exports = merge(common, {
  mode: "development",
});
