'use strict';
const Fs = require('fire-fs');
const Del = require('del');

Editor.ProjectCompiler.moveScripts = async function (srcRawPaths, dstRawPaths) {
  let newSrcPaths = [];

  for (let i = 0; i < dstRawPaths.length; i++) {
    let dstRawPath = dstRawPaths[i];
    let uuid = Editor.assetdb.fspathToUuid(dstRawPath);
    let isPlugin = this.isPlugin(uuid);
    if (!isPlugin) {
      // 删除原路径脚本
      let srcRawPath = srcRawPaths[i];
      let src = this.raw2src(srcRawPath);
      Del.sync(src, {force: true});
      let dest = this.raw2dest(srcRawPath);
      Del.sync(dest, {force: true});

      // 主要是这里没有对删除缓存中的脚本，才导致创建脚本改名后，运行模拟器会报错
      this.compiler.removeCachedScripts(src);

      // 拷贝脚本到新路径
      src = this.raw2src(dstRawPath);
      let importPath = this.raw2import(dstRawPath);
      Fs.copySync(importPath, src);
      newSrcPaths.push(src);
    }
  }
  await this.rebuild(newSrcPaths);
}

module.exports = {
  load () {},
  unload () {}
};