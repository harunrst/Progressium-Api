const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

//to be added production spesific configurations
module.exports = merge(common, {
  mode: "production",
});
