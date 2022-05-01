import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Pagination } from 'antd'
import Title from 'antd/lib/typography/Title'
import { Materials } from 'api/materials'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PriceModal from './priceModal'
import { setCurrentMaterials, setEditPrice } from './priceSlice'
import PriceTable from './priceTable'

const PricePage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const currentMaterials = useAppSelector(state => state.price.currentMaterials)
  useEffect(() => {
    let m = location.state as Materials
    dispatch(setCurrentMaterials(m))
  }, [])
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
      <PriceTable />
      <PriceModal />
      <Pagination></Pagination>
    </>
  )
}

export default PricePage
