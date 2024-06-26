import {useContext, useEffect, useState} from "react";
import {SERVER_URL} from "../constants/http";
import {UserContext} from "../store/userContext";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

function HomePage() {
  const [stats, setStats] = useState({});
  const userCtx = useContext(UserContext);

  const {profitPerJob, profitPerYear, profitPerMonth} = stats;

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
      }
    }

    fetchStats();
  }, []);

  const generateGreenShade = (index, total) => {
    const hue = index % 3 === 0 ? 120 : 60;
    const saturation = 30 + (index / total) * 60
    const lightness = 40 + (index / total) * 60
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  };

  const renderCustomizedLabel = ({name, value}) => `${name}`;

  return (
      <div style={{ display: 'flex',flex: 1,flexFlow:"column", alignItems: 'center', width: "100%"}}>

      {profitPerJob &&
        <div style={{ display: 'flex', flexFlow:"row",justifyContent: 'center', flex:1, width: "100%" }}>
        <PieChart width={600} height={500}>
          <text x={300} y={40} style={{padding: 1}} textAnchor="middle" dominantBaseline="middle" fontSize="20"
                fontWeight="bold" fill="#fff">
           Prihodek glede na vrsto službe
          </text>
          <Pie
            dataKey="totalIncome"
            data={profitPerJob}
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={renderCustomizedLabel}
          >
            {
              profitPerJob.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={generateGreenShade(index, profitPerJob.length)}/>
              ))
            }
          </Pie>
          <Tooltip formatter={(value) => `${value} €`}/>
        </PieChart>

          {profitPerJob &&
            <BarChart
              width={500}
              height={380}
              data={profitPerJob}
              stackOffset="sign"
              margin={{
                top: 80,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <text x={250} y={60} textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="bold"
                    fill="#fff">
                Prihodek glede na vrsto službe
              </text>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <ReferenceLine y={0} stroke="#fff"/>
              <Bar dataKey="totalIncome" name="Prihodek" fill="#167921" stackId="stack"/>
              <Bar dataKey="costs" name="Stroški" fill="#cc3333" stackId="stack"/>
            </BarChart>
          }
        </div>
          }
      {profitPerYear &&
        <div style={{ display: 'flex', flexFlow:"row",justifyContent: 'center', flex:1, width: "100%" }}>

        <BarChart
          width={500}
          height={380}
          data={profitPerYear}
          stackOffset="sign"
          margin={{
            top: 80,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <text x={250} y={60} textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="bold"
                fill="#fff">
            Prihodek skozi leta
          </text>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="joining_year"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <ReferenceLine y={0} stroke="#fff"/>
          <Bar dataKey="totalIncome" name="Prihodek" fill="#167921" stackId="stack"/>
          <Bar dataKey="costs" name="Stroški" fill="#cc3333" stackId="stack"/>
        </BarChart>

          {profitPerMonth &&
            <BarChart
              width={500}
              height={380}
              data={profitPerMonth}
              stackOffset="sign"
              margin={{
                top: 80,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <text x={250} y={60} textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="bold"
                    fill="#fff">
                Prihodek na mesec
              </text>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="joining_month"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <ReferenceLine y={0} stroke="#fff"/>
              <Bar dataKey="totalIncome" name="Prihodek" fill="#167921" stackId="stack"/>
              <Bar dataKey="costs" name="Stroški" fill="#cc3333" stackId="stack"/>
            </BarChart>
          }
        </div>
      }
        {profitPerMonth &&
          <LineChart
            width={500}
            height={380}
            data={negateCosts(profitPerMonth)}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="joining_month"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <ReferenceLine y={0} stroke="#fff"/>
            <Line type="monotone" dataKey="totalIncome" name="Prihodek" stroke="#167921" activeDot={{r: 8}}/>
            <Line type="monotone" dataKey="costs" name="Stroški" stroke="#cc3333" activeDot={{r: 8}}/>
            <text x={250} y={270} textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="bold"
                  fill="#fff">
              Prihodek na mesec
            </text>
          </LineChart>
        }
    </div>
  );
}

export default HomePage;
