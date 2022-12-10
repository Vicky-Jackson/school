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
                    value: 600,
                    name: '男'
                },
                {
                    value: 512,
                    name: '女'
                },
            ]
        },
    ],
}
const option_bar = {
    title: { text: "各年级人数" },
    tooltip: {},
    xAxis: {
        data: ["高一","高二","高三"],
    },
    yAxis: {},
    series: [
        {
            name: "人数",
            type: "bar",
            data: [350,400,362],
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