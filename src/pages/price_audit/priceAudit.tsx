import { Card } from 'antd'
import { PriceStatus } from 'api/price'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { listPrice } from 'pages/price/priceSlice'
import { useEffect } from 'react'

const PriceAuditPage = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(s => s.price.items)
  useEffect(() => {
    dispatch(listPrice({ status: PriceStatus.NotAudit }))
  }, [])

  return (
    <div>
      {items?.map((it, index) => (
        <Card hoverable key={`${index}price`} />
      ))}
    </div>
  )
}

export default PriceAuditPage
