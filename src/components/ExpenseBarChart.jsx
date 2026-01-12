import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from 'recharts';

const BAR_COLORS = ['#A020F0', '#F3B755', '#FF4D4D', '#4D96FF', '#20B2AA'];

function ExpenseBarChart({ data }) {
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-4xl p-6 text-black shadow-lg h-full min-h-75">
      <h3 className="italic font-bold text-xl mb-6">Top Expenses</h3>

      {data.length === 0 ? (
        <div className='text-xl text-gray-400 italic flex items-center justify-center h-40'>
          No Data Available
        </div>
      ) : (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              
              layout={isMobile ? "horizontal" : "vertical"}
              data={sortedData}
              margin={{ top: 5, right: 20, left: isMobile ? 0 : 40, bottom: 20 }}
            >
              <XAxis 
                type={isMobile ? "category" : "number"} 
                dataKey={isMobile ? "name" : undefined}
                hide={!isMobile} 
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type={isMobile ? "number" : "category"}
                dataKey={isMobile ? undefined : "name"}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#333', fontSize: 14, fontWeight: '600' }}
                width={isMobile ? 30 : 100}
                hide={isMobile}
              />
              
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              />

              <Bar
                dataKey="value"
                radius={isMobile ? [10, 10, 0, 0] : [0, 15, 15, 0]}
                barSize={isMobile ? 30 : 20}
                isAnimationActive={true}
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default ExpenseBarChart;