import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import Title from 'antd/lib/typography/Title'
import { Materials } from 'api/materials'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PriceChart from './priceChart'
import PriceModal from './priceModal'
import { changePricePage, listPrice, setCurrentMaterials, setEditPrice } from './priceSlice'
import PriceTable from './priceTable'

const PricePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const currentMaterials = useAppSelector(state => state.price.currentMaterials)
  const currentPage = useAppSelector(state => state.price.currentPage)
  const total = useAppSelector(state => state.price.total)

  const changePage = page => {
    dispatch(changePricePage(page))
    dispatch(listPrice())
  }
  useEffect(() => {
    let m = location.state as Materials
    dispatch(setCurrentMaterials(m))
  }, [])

  useEffect(() => {
    if (currentMaterials && currentMaterials.id != 0) {
      dispatch(listPrice())
    }
  }, [currentMaterials])
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
        <div className="flex mr-4 ">
          <Title level={5}>物料:</Title>
          <div>{currentMaterials?.name}</div>
        </div>

        <div className="flex">
          <Title level={5}>物料编码: </Title>
          <div>{currentMaterials?.code}</div>
        </div>
      </div>
      <div className="mb-6">
        <Button
          onClick={() => {
            dispatch(setEditPrice(false))
          }}
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
      </div>
    </>
  )
}

export default PricePage
