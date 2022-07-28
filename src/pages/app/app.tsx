import { Checkbox, Divider, Empty } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect, useState } from 'react'
import { dateToShortStr } from 'utils/time'
import * as echarts from 'echarts'
import { Materials } from 'api/materials'
import AppSearch from './app_search'
import { Moq } from 'api/moq'
import { utc } from 'moment'
import { listAllSuppliers } from 'pages/materials/materialsSlice'

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
  grid: {
    right: 400
  },
  legend: {
    orient: 'vertical',
    itemGap: 20,
    right: 0,
    align: 'left',
    top: 30,
    bottom: 30,
    type: 'scroll',
    icon: 'circle',
    backgroundColor: '#fff',
    borderRadius: 8
  },
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
        '<li style="list-style:none">' +
        params.marker +
        params.seriesName +
        '&nbsp;&nbsp;' +
        params.value[1] +
        '元</li>'
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
  }
} as any

const AppHome = () => {
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [checkedList, setCheckedList] = useState<number[]>([])
  const dispatch = useAppDispatch()

  const [items, setItems] = useState<Moq[]>([])

  const materialsList = useAppSelector(state => state.materials.items)

  const showChart = materialsList && materialsList.length > 0

  let series: any[] = []
  useEffect(() => {
    if (!materialsList || !chart) {
      return
    }
    // 搜索后全选展示
    setAllChecked()
  }, [materialsList])

  const findWithID = (i: number) => {
    for (let index = 0; index < items.length; index++) {
      const it = items[index]
      if (i === it.id) {
        return it
      }
    }
  }

  const getSerieName = (it: Moq) => {
    return (
      (it.materials?.supplier?.abbr || it.materials?.supplier?.name) +
      ':' +
      it.materials?.code +
      ':' +
      (it.materials?.short_name || it.materials?.name) +
      ': ' +
      it.moq
    )
  }

  const setAllChecked = () => {
    let cs: number[] = []
    let its: Moq[] = []
    materialsList!.forEach(mt => {
      mt.moqList?.forEach(m => {
        cs.push(m.id!)
        let nm = { ...m }
        nm.materials = {
          id: mt.id,
          name: mt.name,
          short_name: mt.short_name,
          code: mt.code,
          desc: mt.desc,
          supplier: mt.supplier
        }
        its.push(nm)
      })
    })
    setItems(its)
    setCheckedList(cs)
  }

  useEffect(() => {
    if (!materialsList || !chart) {
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

    checkedList.forEach((i, index) => {
      const ds: any[] = []
      let serie = { ...sampleSerie }

      var it: Moq
      if (checkedList.length !== items.length) {
        it = findWithID(i)!
      } else {
        it = items[index]
      }

      console.log('get moq ', it)

      if (it.priceList) {
        it.priceList.forEach(p => {
          ds.push([p.date, p.price / 100])
        })
      }
      serie.data = ds

      serie.name = getSerieName(it)
      series.push(serie)
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

    dispatch(listAllSuppliers())
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
      <AppSearch />
      <div className={`${showChart ? 'hidden' : 'h-full'} flex items-center justify-center overflow-hidden `}>
        <Empty />
      </div>
      <div className={`flex items-center ${showChart ? '' : 'hidden overflow-hidden'}`} style={{ height: '100%' }}>
        <div style={{ width: 1400 }}>
          <div id="mChart" style={{ width: 1500, height: 700 }}></div>
        </div>
        {/* <div className="h-full pt-20">
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
                  <Checkbox value={it.id}>{getSerieName(it)}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default AppHome
