<template>
  <el-dialog
    title="Tag management"
    :close-on-click-modal="false"
    :visible.sync="dialogTagManagement.isShow"
    v-loading="dialogTagManagement.loading"
    :style="{ overflow: dialogTagManagement.loading ? 'hidden' : 'auto' }"
    width="500px"
  >
    <div style="width: 420px">
      <div v-if="dialogTagManagement.addMode">
        <el-form
          ref="addTagForm"
          @submit.native.prevent
          label-width="120px"
          style="margin: 0"
        >
          <el-form-item
            label="New Tag"
            style="margin-right: 5px; margin-bottom: 0"
            size="mini"
          >
            <el-input
              ref="tagIpt"
              v-model="dialogTagManagement.tagIpt"
              size="mini"
              style="margin-right: 10px; width: 150px; height: 29px;"
              @keyup.enter.native="saveEntTag"
            ></el-input>
            <el-button-group style="position: relative; top: -2px;">
              <el-button
                type="primary"
                icon="el-icon-check"
                size="mini"
                :loading="dialogTagManagement.addNewLoading"
                @click="saveEntTag"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-close"
                size="mini"
                @click="changeEntTag(false)"
              ></el-button>
            </el-button-group>
          </el-form-item>
          
        </el-form>
      </div>
      <div v-else style="padding-left: 30px">
        <el-button size="mini" type="primary" @click="changeEntTag(true)"
          >+Add New Tags</el-button
        >
      </div>
    </div>
    <div style="padding: 0 15px">
      <el-table
        :data="dialogTagManagement.tags"
        stripe
        style="width: 100%"
        height="300"
        ref="tagListTable"
      >
        <el-table-column prop="name" label="Tag name">
          <template slot-scope="scope">
            <div v-if="scope.row.edit" class="d-flex">
              <el-input
                ref="tagsListIpt"
                v-model="scope.row.ipt"
                size="mini"
                style="margin-right: 5px; width: 180px"
                @keyup.enter.native="saveTagIpt(scope.row)"
              ></el-input>
              <el-button-group>
                <el-button
                  type="primary"
                  icon="el-icon-check"
                  size="mini"
                  @click="saveTagIpt(scope.row)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-close"
                  size="mini"
                  @click="cancelTagIpt(scope.row)"
                ></el-button>
              </el-button-group>
            </div>
            <div v-else>
              {{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Action" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.edit"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editTag(scope.row)"
            >
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delTag(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["dialogTagManagement"],
  methods: {
    editTag(tag) {
      //在列表上开始编辑tag
      tag.edit = true;
      this.$nextTick(() => {
        this.$refs.tagsListIpt.$refs.input.focus();
      });
    },
    delTag(tag) {
      this.$confirm("Are you sure to delete it?？")
        .then(() => {
          this.dialogTagManagement.loading = true;
          this.$apiCall("api.Product.deleteTag", { id: tag.id }, (r) => {
            this.dialogTagManagement.loading = false;
            if (r.ErrorCode == 9999) {
              this.$parent.getTagList();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          });
        })
        .catch(() => {});
    },
    cancelTagIpt(tag) {
      tag.edit = false;
    },
    saveTagIpt(tag) {
      //保存修改的tag
      if (tag.ipt) {
        this.dialogTagManagement.loading = true;
        this.$apiCall(
          "api.Product.changeTag",
          {
            id: tag.id,
            name: tag.ipt,
          },
          (r) => {
            this.dialogTagManagement.loading = false;
            if (r.ErrorCode == 9999) {
              this.$parent.getTagList();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      } else {
        this.$elementMessage("Please enter the tag", "error");
      }
    },
    saveEntTag() {
      //保存新tag
      if (this.dialogTagManagement.tagIpt) {
        this.dialogTagManagement.addNewLoading = true;
        this.$apiCall(
          "api.Product.createTag",
          { name: this.dialogTagManagement.tagIpt },
          (r) => {
            this.dialogTagManagement.addNewLoading = false;
            if (r.ErrorCode == 9999) {
              this.changeEntTag(false);
              this.$parent.getTagList();
            } else {
              this.$elementMessage(r.Message, "error");
            }
          }
        );
      } else {
        this.$elementMessage("Please enter the New tag", "error");
      }
    },
    changeEntTag(type) {
      //切换输入新tag
      this.dialogTagManagement.tagIpt = "";
      this.dialogTagManagement.addMode = type;
      if (type) {
        this.$nextTick(() => {
          this.$refs.tagIpt.$refs.input.focus();
        });
      }
    },
  }
}
</script>