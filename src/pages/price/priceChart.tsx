import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { useAppSelector } from 'app/hooks'
import { dateToShortStr } from 'utils/time'
import { Empty } from 'antd'

let option = {
  xAxis: {
    type: 'time',
    axisPointer: {
      label: {
        formatter: function (params) {
          const { value } = params
          return dateToShortStr(value)
        }
      }
    }
  },
  legend: {},
  yAxis: {
    name: '元',
    type: 'value'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
    valueFormatter: value => '￥' + value.toFixed(2) + '元',
    formatter: function (params) {
      params = params[0]
      var chartdate = dateToShortStr(params.value[0])
      var val =
        '<li style="list-style:none">' + params.marker + params.seriesName + '&nbsp;&nbsp;' + params.value[1] + '</li>'
      return chartdate + val
    }
  },
  series: [
    {
      name: '价格',
      data: [],
      type: 'line',
      smooth: true,
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均值' }]
      }
    }
  ]
}

const PriceChart = () => {
  const items = useAppSelector(state => state.price.items)
  const showChart = items && items.length > 0
  useEffect(() => {
    if (items && chart) {
      const ds: any[] = []
      items.forEach(it => {
        ds.push([it.date, it.price])
      })

      option.series[0].data = ds as any
      chart.setOption(option)
    }
  }, [items])

  const [chart, setChart] = useState<any>()

  useEffect(() => {
    let chartDom = document.getElementById('priceMap')!
    let c = echarts.init(chartDom, undefined, { locale: 'ZH' })
    setChart(c)
    c.setOption(option)
  }, [])
  return (
    <div style={{ width: 1200, height: 670 }} className="flex items-center justify-center">
      <div id="priceMap" style={{ width: 1200, height: 670 }} className={`${showChart ? '' : 'hidden'}`}></div>
      <div className={`${showChart ? 'hidden' : ''}`}>
        <Empty />
      </div>
    </div>
  )
}

export default PriceChart
