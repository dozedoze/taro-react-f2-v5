import { Chart, Axis, Interval, Tooltip } from '@antv/f2';

import F2Canvas from '@/components/f2-canvas';

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1953 年', sales: 52 },
  { year: '1954 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
];

const Bar = () => {
  return (
    <>
      <F2Canvas id='gfg'>
        <Chart data={data} scale={{ sales: { tickCount: 5 } }}>
          <Axis field='year' />
          <Axis field='sales' />
          <Interval x='year' y='sales' />
          <Tooltip />
        </Chart>
      </F2Canvas>
    </>
  );
};
export default Bar;
