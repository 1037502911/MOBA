<template>
  <div class="container">
    <div style="display:flex;">
      <span>请选择分类模块</span>
      <el-select v-model="specialColumn" placeholder="请选择" class="chooseModel">
        <el-option v-for="item in options" :key="item._id" :label="item.name" :value="item._id"></el-option>
      </el-select>
    </div>
    <div style="display:flex">
      <span>请输入栏目名</span>
      <el-input v-model="categoryName" placeholder="请输入内容" class="classification"></el-input>
    </div>
    <el-button type="primary" style="margin-left:120px;margin-top:20px" @click="saveCategories()">保存</el-button>
    <div>父</div>
    <List :option="option" :a="a"></List>
  </div>
</template>

<script>
import { getSpecialComlumnList, saveCategoryList } from "@/api/specialComlumn";
import { getDay, allWeek } from "@/utils/oldTool/time";
import { removeRepeat } from "@/utils/oldTool/RemoveTheRepetition";
import List from "@/views/category/list/index.vue";
export default {
  components: {
    List
  },
  data() {
    return {
      options: [],
      specialColumn: "",
      categoryName: "",
      a: "10",
      option: {
        backgroundColor: "#080b30",
        title: {
          text: "哎呦,不错哦",
          textStyle: {
            align: "center",
            color: "#fff",
            fontSize: 20
          },
          top: "5%",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 255, 233,0)"
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255, 255, 255,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 255, 233,0)"
                  }
                ],
                global: false
              }
            }
          }
        },
        grid: {
          top: "15%",
          left: "5%",
          right: "5%",
          bottom: "15%"
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true
            },
            splitArea: {
              // show: true,
              color: "#f00",
              lineStyle: {
                color: "#f00"
              }
            },
            axisLabel: {
              color: "#fff"
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: ["A", "B", "C", "D", "E", "F"]
          }
        ],

        yAxis: [
          {
            type: "value",
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                color: "#d1e6eb"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 25,
            lineStyle: {
              normal: {
                color: "#6c50f3",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#6c50f3"
              }
            },
            itemStyle: {
              color: "#6c50f3",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {}
            },
            data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02]
          },
          {
            name: "注册总量",
            type: "line",
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 25,
            lineStyle: {
              normal: {
                color: "#00ca95",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#00ca95"
              }
            },

            itemStyle: {
              color: "#00ca95",
              borderColor: "#fff",
              borderWidth: 3,
              shadowColor: "rgba(0, 0, 0, .3)",
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {}
            },
            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14]
          }
        ]
      }
    };
  },
  async mounted() {
    console.log(allWeek(2021, "yyyy-MM-dd"));
    // await this.getSpecialList();
  },
  methods: {
    async saveCategories() {
      const [err, res] = await this.to(
        saveCategoryList({
          specialColumn: this.specialColumn,
          categoryName: this.categoryName,
          startTime: getDay()
        })
      );
      if (err) {
        console.log(err, "saveCategories");
      } else {
        this.$message({
          message: "新增成功",
          type: "success"
        });
        this.specialColumn = "";
        this.categoryName = "";
      }
    },
    async getSpecialList() {
      const [err, res] = await this.to(getSpecialComlumnList());
      err ? console.log(err, "getSpecialList") : (this.options = res.data);
    }
  }
};
</script>

<style scoped>
.container {
  margin: 30px;
}
.chooseModel {
  margin-bottom: 20px;
}
.classification {
  width: 200px;
}
span {
  font-size: 12px;
  width: 100px;
  display: block;
  line-height: 40px;
  text-align: right;
  margin-right: 20px;
}
</style>