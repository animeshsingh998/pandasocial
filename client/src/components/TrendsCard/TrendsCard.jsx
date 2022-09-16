import './TrendsCard.css'
import {TrendData} from '../../Data/Data.js'
import Trend from './Trend/Trend'

const TrendsCard = () => {
  return (
    <div className="TrendsCard">
      <span>Trends for you</span>
      <div className="trends">
        {TrendData.length > 0 ? (
          TrendData.map((trend) => <Trend trend={trend} key={trend.shares} />)
        ) : (
          <span>No trends right now</span>
        )}
      </div>
    </div>
  );
}

export default TrendsCard