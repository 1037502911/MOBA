<template>
  <div class="container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" width="200">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.categoryName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="所属专栏" width="200">
        <template slot-scope="scope">
          <el-popover placement="top">
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.specialColumn }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>{{count}}</div>
    <button @click="btnHandle()">加1</button>
    <div ref="myChart" :style="{width: '300px', height: '300px'}" @click="onClick"></div>
  </div>
</template>

<script>
import { getCatetoryList } from "@/api/category";
import { mapState, mapMutations } from "vuex";
import echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      myChart: null
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    a: {
      type: String,
      default: "dakjfkls"
    }
  },
  computed: {
    ...mapState({
      count: e => e.demo.count
    })
  },
  methods: {
    ...mapMutations({
      addItem: "demo/addItem"
    }),
    getEcharts() {
      this.myChart = echarts.init(this.$refs.myChart);
      this.myChart.setOption(this.option);
    },
    onClick(params) {
      alert(JSON.stringify(params));
    },
    btnHandle() {
      this.addItem(3);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async getTableList() {
      const [err, res] = await this.to(getCatetoryList());
      err ? console.log(err, "getTableList") : (this.tableData = res.data);
    }
  },
  mounted() {
    // this.getTableList();
    this.getEcharts();
  }
};
</script>

<style >
.container {
  margin: 30px;
}
</style>