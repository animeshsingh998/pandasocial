import './Trend.css'

const Trend = ({trend}) => {
  return (
    <div className="Trend">
      <span>#{trend.name}</span>
      <span>{trend.shares}k Shares</span>
    </div>
  )
}

export default Trend