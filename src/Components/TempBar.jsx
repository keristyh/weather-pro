import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label
} from 'recharts'

const TempBar = ({ data, units }) => (
    <div style={{ margin: '2rem auto' }}>
        <h3>Current Temperature by City</h3>
        <BarChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" interval={0} angle={-45} textAnchor="end" height={60}>
                <Label value="City" offset={-40} position="insideBottom" />
            </XAxis>
            <YAxis>
                <Label
                    value={`Temp (°${units === 'I' ? 'F' : 'C'})`}
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip />
            <Bar
                dataKey="temp"
                name={`Temp (°${units === 'I' ? 'F' : 'C'})`}
                fill="#8884d8"
            />
        </BarChart>
    </div>
)

export default TempBar;
