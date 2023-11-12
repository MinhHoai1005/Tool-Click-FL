import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { IPieChart } from 'models';
import moment from 'moment';
import { getPieChartCategory, getPieChartCategoryAction } from 'utils/apis/account';

const PieChartCategoryAction = () => {

    const [data, setData] = useState<IPieChart[]>([])
    const loadPieChartCategory = async () => {
        const currentDate = moment(); // Ngày hiện tại

        const firstDayOfMonth = currentDate.clone().set({ date: 1, hour: 0, minute: 0, second: 0, millisecond: 0 });
        const lastDayOfMonth = currentDate.clone().set({ date: 1, hour: 23, minute: 59, second: 59, millisecond: 99 })
            .add(1, 'months').subtract(1, 'days');
        let res = await getPieChartCategoryAction(firstDayOfMonth, lastDayOfMonth)
        if (res.code === 200) {
            setData(res.data)
        }
    }
    useEffect(() => {
        loadPieChartCategory()
    }, [])
    
    return (
        <div >
            <div style={{
                textAlign: "center",
                padding: "10px"
            }}>Số tiến trình theo danh mục</div>
            <PieChart
                series={[
                    {
                        data: data,
                    },
                ]}
                width={550}
                height={window.innerHeight * 2 / 4}
            />
        </div>

    )
}

export default PieChartCategoryAction