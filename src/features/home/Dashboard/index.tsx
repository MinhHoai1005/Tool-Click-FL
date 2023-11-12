import { IDashboard } from 'models';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { getDashboard } from 'utils/apis/account';

const Dashboard = () => {

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
        <div className="row">
            {/* Earnings (Monthly) Card Example */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Tổng tiền nạp</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{dataTotal?.total.toLocaleString('en-US')}</div>
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
                                Tổng tiền chạy</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{dataTotal?.earnings.toLocaleString('en-US')}</div>
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
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Số lệnh đã chạy
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{dataTotal?.action.toLocaleString('en-US')}</div>
                                    </div>
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
                                Số lệnh đang chạy</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{dataTotal?.pending.toLocaleString('en-US')}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-comments fa-2x text-gray-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard