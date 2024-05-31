import { useContext, useEffect, useState } from "react"
import { SERVER_URL } from "../constants/http";
import { UserContext } from "../store/userContext";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Tooltip } from "react-leaflet";

function HomePage() {
  const [stats, setStats] = useState({})
  const userCtx = useContext(UserContext)

  const { profitPerJob, profitPerYear, profitPerMonth } = stats

  function negateCosts(data) {
    return data.map(entry => ({
      ...entry,
      costs: -entry.costs,
    }));
  }
  const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

  useEffect(() => {
    async function fetchStats() {
      const data = await fetch(SERVER_URL + '/statistics', {
        headers: {
          "x-auth-token": userCtx.token
        },
      });
      if (data.status < 305) {
        const json = await data.json();
        setStats(json);
        //console.log(json)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
    { profitPerJob && <PieChart width={400} height={400}>
        <Pie
          dataKey="totalIncome"
          isAnimationActive={false}
          data={profitPerJob}
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        />
        <Legend />
      </PieChart>}
     { profitPerJob &&
        <BarChart
          width={500}
          height={300}
          data={profitPerJob}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#fff" />
          <Bar dataKey="totalIncome" fill="#8884d8" stackId="stack" />
          <Bar dataKey="costs" fill="#82ca9d" stackId="stack" />
        </BarChart>}

        { profitPerYear &&
        <BarChart
          width={500}
          height={300}
          data={profitPerYear}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="joining_year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#fff" />
          <Bar dataKey="totalIncome" fill="#8884d8" stackId="stack" />
          <Bar dataKey="costs" fill="#82ca9d" stackId="stack" />
        </BarChart>}

        { profitPerMonth &&
        <BarChart
          width={500}
          height={300}
          data={profitPerMonth}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="joining_month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#fff" />
          <Bar dataKey="totalIncome" fill="#8884d8" stackId="stack" />
          <Bar dataKey="costs" fill="#82ca9d" stackId="stack" />
        </BarChart>}
        { profitPerMonth &&
        <LineChart
          width={500}
          height={300}
          data={negateCosts(profitPerMonth)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="joining_month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#fff" />
          <Line type="monotone" dataKey="totalIncome" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="costs" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>}
    </div>
  )
}

export default HomePage