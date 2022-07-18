import React, { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Pagination, Select } from 'antd'
import API from 'api'
import { Materials } from 'api/materials'
import { PriceStatus } from 'api/price'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import MoqModal from './moqModal'
import { clearMoq, listMoq, openMoqModal } from './moqSlice'
import PriceChart from './priceChart'
import PriceModal from './priceModal'
import PriceTable from './priceTable'
import {
  changePricePage,
  clearPriceList,
  listPrice,
  setCurrentMaterials,
  setCurrentMoqID,
  setEditPrice
} from './priceSlice'

const PricePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const currentMaterials = useAppSelector(state => state.price.currentMaterials)
  const currentMoqID = useAppSelector(s => s.price.currentMoqID)
  const currentPage = useAppSelector(state => state.price.currentPage)
  const total = useAppSelector(state => state.price.total)

  const moqList = useAppSelector(s => s.moq.items)

  const changePage = page => {
    dispatch(changePricePage(page))
    dispatch(listPrice({}))
  }
  useEffect(() => {
    let m = location.state as Materials
    if (!currentMaterials) {
      dispatch(setCurrentMaterials(m))
    }
    return () => {
      dispatch(setCurrentMoqID(undefined))
      dispatch(clearMoq())
    }
  }, [])

  useEffect(() => {
    if (currentMaterials && currentMaterials.id != 0) {
      dispatch(listPrice({}))
      // 获取moq列表
      dispatch(listMoq())
    }
  }, [currentMaterials?.id])

  useEffect(() => {
    if (currentMoqID) {
      dispatch(listPrice({}))
    } else {
      dispatch(clearPriceList())
    }
  }, [currentMoqID])

  useEffect(() => {
    if (moqList && moqList.length > 0 && currentMoqID === undefined) {
      dispatch(setCurrentMoqID(moqList[0].id!))
    }
  }, [moqList])

  return (
    <>
      <div className="flex items-center h-10">
        <div className="mr-6">
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              navigate(-1)
            }}
          ></Button>
        </div>
        <div className="flex mr-4 items-end">
          <div className="text-base font-bold">物料:</div>
          <div className="ml-2">{currentMaterials?.name}</div>
        </div>

        <div className="flex items-end mr-4">
          <div className="text-base font-bold">物料编码: </div>
          <div className="ml-2">{currentMaterials?.code}</div>
        </div>

        <div className="flex items-center">
          <div className="text-base font-bold mr-2">MOQ:</div>
          <Select
            className="w-32 mr-4"
            value={currentMoqID}
            onChange={v => {
              dispatch(setCurrentMoqID(v))
            }}
          >
            {moqList?.map((moq, index) => (
              <Select.Option value={moq.id} key={index + 'moq'}>
                {moq.moq}
              </Select.Option>
            ))}
          </Select>
          <Button
            onClick={() => {
              dispatch(openMoqModal(true))
            }}
          >
            编辑MOQ
          </Button>
        </div>
      </div>
      <div className="mb-6 mt-4">
        <Button
          onClick={() => {
            dispatch(setEditPrice(false))
          }}
          disabled={currentMoqID === undefined}
        >
          添加价格
        </Button>
      </div>
      <PriceModal />
      <div className="flex">
        <div style={{ width: 450, position: 'relative', height: 670 }}>
          <PriceTable />
          {/* <div className="flex justify-end items-center absolute" style={{ right: 0, bottom: 0 }}>
            <Pagination current={currentPage} onChange={changePage} total={total}></Pagination>
          </div> */}
        </div>
        <div className="flex-1">
          <PriceChart />
        </div>

        <MoqModal />
      </div>
    </>
  )
}

export default PricePage
