export default {
  data() {
    return {
      editorCtx: null,
      content: '<p>Simditor 是 Tower 开源的所见即所得的在线富文本编辑器。Simditor 的理念是保持简单，'+
      '避免过度的功能，每一个特性都追求极致的用户体验。同时 Simditor 也很容易扩展。</p>'+
'<p><a pjax="exclude" href="http://www.wenjiangs.com/wp-content/uploads/2018/10/simditer.jpg">'+
'<img class="aligncenter size-full wp-image-30262"'+
'data-original="http://www.wenjiangs.com/wp-content/uploads/2018/10/simditer.jpg"'+
'alt="Tower 开源 Simditor 简单快速的富文本编辑器" width="367" height="242" /></a></p>'+
'<h2>使用方法</h2>'+
'<p>下面将介绍 Simditer 的基本使用方法，部分内容摘录自官方网站 '+
'<a pjax="exclude" external-link="true" href="http://simditor.tower.im" target="_blank" rel="noopener">'+
'http://simditor.tower.im</a>。</p>'+
'<h3>下载并引用</h3>'+
'<p>在<a pjax="exclude" external-link="true" external-link="true"'+
'href="https://github.com/mycolorway/simditor/releases">这里</a>下载并解压最新版的 Simditor 文件，然后在页面中引入这些文件：</p>'+
'<pre>&lt;link rel="stylesheet" type="text/css" href="[style path]/font-awesome.css" /&gt;'+
'&lt;link rel="stylesheet" type="text/css" href="[style path]/simditor.css" /&gt;'+
'&lt;script type="text/javascript" src="[script path]/jquery.min.js"&gt;&lt;/script&gt;'+
'&lt;script type="text/javascript" src="[script path]/module.js"&gt;&lt;/script&gt;'+
'&lt;script type="text/javascript" src="[script path]/uploader.js"&gt;&lt;/script&gt;'+
'&lt;script type="text/javascript" src="[script path]/simditor.js"&gt;&lt;/script&gt;</pre>',
    }
  },
  onLoad(options) {
    
  },
  methods: {
    onEditorReady() {
      uni.createSelectorQuery().select('#editor').context((res) => {
        this.editorCtx = res.context;
        this.editorCtx.setContents({
          html: this.content
        })
      }).exec()
    },
    // 撤销
    undo() {
      this.editorCtx.undo();
    },
    redo() {
      this.editorCtx.redo();
    },
    clear(){
      this.editorCtx.clear();
    },
    insertDivider(){
      this.editorCtx.insertDivider();
    },
    insertText(){
      this.editorCtx.insertText();
    },
  }
}
