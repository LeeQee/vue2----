<template>
  <div class="app-container">
    <el-input disabled v-model="filename"></el-input>
    <input
      type="file"
      name="myFile"
      id="upload"
      style="display: none"
      @change="displayName"
    />
    <el-button
      @click="handleUploadFile"
      style="margin-left: 10px"
      type="primary"
    >
      上传
    </el-button>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      filename: null,
    };
  },
  methods: {
    // 上传按钮点击浏览文件
    handleUploadFile() {
      document.getElementById("upload").click();
    },
    // 上传文件-判断文件格式是否合法，将文件名称回显数据源以及批次名称。
    displayName() {
      var file = document.getElementById("upload").files[0]; //获取文件
      if (file != undefined) {
        var fileName = file.name;
        if (fileName.lastIndexOf(".") != -1) {
          var fileType = fileName
            .substring(fileName.lastIndexOf(".") + 1, fileName.length)
            .toLowerCase();
          var suppotFile = new Array();
          suppotFile[0] = "xlsx";
          var flag = false;
          for (var i = 0; i < suppotFile.length; i++) {
            if (suppotFile[i] == fileType) {
              flag = true;
            }
          }
          if (flag) {
            this.importFile = file;
            this.importForm.fileName = fileName;
            this.importForm.name = fileName.substring(
              0,
              fileName.lastIndexOf(".")
            );
            let formData = new FormData();
            formData.append("file", file); //接口需要传递的参数
            uploadTemporary(formData).then((res) => {
              this.importForm.fileSid = res.data.sid;

              if (!this.importForm.selectedMethod) {
                this.getTableData(res.data.sid);
              } else {
                this.getTableData(res.data.sid, this.importForm.selectedMethod);
              }

              this.getExcelList();
              document.getElementById("upload").value = "";
            });
          } else {
            this.$message.error("文件类型不合法,只能是xlsx类型！");
          }
        }
      }
    },
  },
};
</script>

<style>
</style>