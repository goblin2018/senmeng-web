import { Checkbox, Divider } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import MaterialsSearch from 'pages/materials/materialsSearch'
import React, { useEffect, useState } from 'react'
import { dateToShortStr } from 'utils/time'
import * as echarts from 'echarts'

let option = {
  xAxis: {
    type: 'time',
    axisPointer: {
      label: {
        formatter: function (params) {
          const { value } = params
          return dateToShortStr(value as Date)
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
  series: []
} as any

const sampleSerie = {
  name: '',
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
} as any

const AppHome = () => {
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [checkedList, setCheckedList] = useState<number[]>([])
  const dispatch = useAppDispatch()

  const items = useAppSelector(state => state.materials.items)
  let series: any[] = []
  useEffect(() => {
    if (!items || !chart) {
      return
    }
    // 搜索后全选展示
    setAllChecked()
  }, [items])

  const findWithID = (i: number) => {
    for (let index = 0; index < items!.length; index++) {
      const it = items![index]
      if (i === it.id) {
        return it
      }
    }
  }

  const setAllChecked = () => {
    let cs: number[] = []
    items!.forEach(it => {
      cs.push(it.id)
    })
    setCheckedList(cs)
  }

  useEffect(() => {
    if (!items || !chart) {
      return
    }

    if (checkedList.length === 0) {
      setCheckAll(false)
      setIndeterminate(false)
    } else if (checkedList.length === items.length) {
      setCheckAll(true)
      setIndeterminate(false)
    } else {
      setCheckAll(false)
      setIndeterminate(true)
    }
    let series: any[] = []

    let index = 0
    checkedList.forEach(i => {
      const ds: any[] = []
      let serie = { ...sampleSerie }

      var it
      if (checkedList.length !== items.length) {
        it = findWithID(i)!
      } else {
        it = items[index]
      }
      it.price_list?.forEach(p => {
        ds.push([p.date, p.price / 100])
      })
      serie.data = ds
      serie.name = it.supplier!.name
      series.push(serie)
      index++
    })

    chart.setOption({ ...option, series }, true)
    console.log(option)
  }, [checkedList])

  const [chart, setChart] = useState<any>()

  useEffect(() => {
    let chartDom = document.getElementById('mChart')!
    let c = echarts.init(chartDom, undefined, { locale: 'ZH' })
    setChart(c)
    c.setOption(option)
  }, [])

  // 更换选择
  const onChange = list => {
    setCheckedList(list)
  }
  const onCheckAllChange = e => {
    if (e.target.checked) {
      // 全选
      setAllChecked()
    } else {
      // 全不选
      setCheckedList([])
    }
  }
  return (
    <>
      <MaterialsSearch searchEmpty={false} />
      <div className="flex py-6" style={{ height: '100%' }}>
        <div style={{ width: 1400 }}>
          <div id="mChart" style={{ width: 1400, height: 700 }}></div>
        </div>
        <div>
          <div>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
              全选
            </Checkbox>
          </div>
          <Divider />
          <div>
            <Checkbox.Group value={checkedList} onChange={onChange}>
              {items?.map(it => (
                <div className="mb-2" key={it.id}>
                  <Checkbox value={it.id}>{it.supplier?.name}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppHome
