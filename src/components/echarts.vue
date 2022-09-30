<template>
    <div id="pie">
        <v-charts :option="option_pie" style="height: 300px; width:400px;"></v-charts>
    </div>
    <div id="bar">
        <v-charts :option="option_bar" style="height: 250px; width:400px;"></v-charts>
    </div>
   
</template>

<script setup>
const option_pie = {
    title: { text: "新生比例" },
    tooltip: {},
    series: [
        {
            type: 'pie',
            data: [
                {
                    value: 335,
                    name: '男'
                },
                {
                    value: 234,
                    name: '女'
                },
            ]
        },
    ],
}
const option_bar = {
    title: { text: "Column Chart" },
    tooltip: {},
    xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
        {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
        },
    ],
}
</script>

<style lang="less" scoped>
#bar{
    position:absolute;
    left:900px;
    top:10px
}
</style>