import React from 'react'
import Dashboard from './Dashboard'
import LineChartMoney from './Dashboard/LineChartMoney'
import PieChartCategory from './Dashboard/PieChartCategory'
import PieChartCategoryYearh from './Dashboard/PieChartCategoryAction'
import "./sb-admin-2.min.css"

export const HomeUser = () => {

  return (
    <div>
      <Dashboard />
      <LineChartMoney />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <PieChartCategory />
        <PieChartCategoryYearh />
      </div>
    </div>
  )
}
