import React, { useEffect, useState } from 'react'
import "./sb-admin-2.min.css"
import moment from 'moment';
import { getDashboard } from 'utils/apis/account';
import { IDashboard } from 'models';

export const HomeUser = () => {

  const [dataTotal, setDataTotal] = useState<IDashboard>()

  const loadDashboard = async () => {
    const currentDate = moment(); // Ngày hiện tại

    const firstDayOfMonth = currentDate.clone().set({ date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
    const lastDayOfMonth = currentDate.clone().set({ date: 1, hour: 23, minute: 59, second: 59, millisecond: 99 })
      .add(1, 'months').subtract(1, 'days');
    let data = await getDashboard(firstDayOfMonth, lastDayOfMonth)
    if (data.code === 200) {
      setDataTotal(data.data)
    }
  }
  useEffect(() => {
    loadDashboard()
  }, [])
  return (
    <div>
      <div className="row">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Số tiền đã sử dụng trong tháng</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{dataTotal?.earnings.toLocaleString('en-US')}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Số lệnh đang chờ duyệt trong tháng</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{dataTotal?.action.toLocaleString('en-US')}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tiến trình sử lý nhiều nhất
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">Tiến trình: {dataTotal?.category_name}</div>
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">Tổng tiền: {dataTotal?.maxTotal.toLocaleString('en-US')}</div>
                    </div>
                    {/* <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Số lệnh đã chạy trong tháng</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pie Chart */}
      <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
          {/* Card Body */}
          <div className="card-body">
            <div className="chart-pie pt-4 pb-2">
              <canvas id="myPieChart" />
            </div>
            <div className="mt-4 text-center small">
              <span className="mr-2">
                <i className="fas fa-circle text-primary" /> Direct
              </span>
              <span className="mr-2">
                <i className="fas fa-circle text-success" /> Social
              </span>
              <span className="mr-2">
                <i className="fas fa-circle text-info" /> Referral
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
