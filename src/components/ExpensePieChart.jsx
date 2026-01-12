import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#A020F0', '#F3B755', 'red'];
const EMPTY_COLOR = ['grey']; 

function ExpensePieChart({ data }) {
  
  const hasData = data && data.length > 0 && data.some(item => item.value > 0);

 
  const emptyData = [{ name: "No Expenses", value: 1 }];

  return (
    <div className="h-48 w-full flex flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={hasData ? data : emptyData}
            innerRadius={50} 
            outerRadius={90}
            paddingAngle={hasData ? 5 : 0}
            dataKey="value"
            stroke="none"
          >
            {hasData ? (
              data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))
            ) : (
              <Cell fill={EMPTY_COLOR[0]} />
            )}
          </Pie>
          {hasData && <Tooltip cursor={{ fill: 'transparent' }} />}
        </PieChart>
      </ResponsiveContainer>
      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-grey-400 text-sm font-medium">0%</span>
        </div>
      )}
    </div>
  );
}

export default ExpensePieChart;
