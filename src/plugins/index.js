import {
    use
} from "echarts/core";

// 手动引入 ECharts 各模块来减小打包体积
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart,
    PieChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent,
    TitleComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    BarChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    TitleComponent
]);