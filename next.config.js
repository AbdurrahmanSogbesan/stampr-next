const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "react-dnd",
  "dnd-core",
  "@react-dnd/invariant",
  "@react-dnd/asap",
  "@react-dnd/shallowequal",
]);
module.exports = withTM({
  reactStrictMode: true,
  // ...
});

module.exports = withPlugins([], {});
