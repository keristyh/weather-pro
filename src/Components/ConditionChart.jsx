import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const colors = ['#02c39a', '#f15bb5', '#6e44ff', '#00bbf9', '#6610f2']

const ConditionChart = ({ data }) => {
    if (!data || data.length === 0) return null

    return (
        <PieChart width={400} height={300}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={false}>
                {data.map((entry, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
    )
}
export default ConditionChart;