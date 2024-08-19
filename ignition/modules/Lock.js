const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("DocVerify", (m) => {
  const SoulBoundToken = m.contract("SoulboundToken");
  const DocumentVerify=m.contract("DocumentVerify",[SoulBoundToken]);

  return { SoulBoundToken,DocumentVerify};
});
