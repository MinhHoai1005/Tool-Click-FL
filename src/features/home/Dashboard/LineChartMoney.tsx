import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import moment from 'moment';
import { getLineChartMoney } from 'utils/apis/account';
import { ILineChartMoeny } from 'models';

const LineChartMoney = () => {

    const xLabels = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ];
    const [dataTotal, setDataTotal] = useState<ILineChartMoeny>()
    const loadLineChartMoney = async () => {
        const now = moment();

        // Lấy ngày đầu năm
        const firstDayOfYear = now.clone().startOf('year');

        // Lấy ngày cuối năm
        const lastDayOfYear = now.endOf('year');
        let data = await getLineChartMoney(firstDayOfYear, lastDayOfYear)
        if (data.code === 200) {
            setDataTotal(data.data)
        }
    }
    useEffect(() => {
        loadLineChartMoney()
    }, [])
    return (
        <div>
            <div>Biểu đồ sử dụng tiền</div>
            <LineChart
                width={window.innerWidth * 3 / 4}
                height={window.innerHeight * 3 / 4}
                series={[
                    { data: dataTotal?.action === undefined ? [0] : dataTotal?.action, label: 'Số lượng tiến trình' },
                    { data: dataTotal?.amount_used === undefined ? [0] : dataTotal?.amount_used, label: 'Số tiền đã sử dụng' },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </div>

    )
}

export default LineChartMoney