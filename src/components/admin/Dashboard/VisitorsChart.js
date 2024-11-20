import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartWrapper = styled.div`
  height: 300px;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

function VisitorsChart() {
  const [chartData, setChartData] = React.useState({
    labels: [],
    datasets: []
  });

  React.useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/admin/visitors');
        const data = await response.json();
        
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Visitors',
              data: data.visitors,
              borderColor: '#0073E6',
              backgroundColor: 'rgba(0, 115, 230, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching visitor data:', error);
      }
    };

    fetchVisitorData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <Line data={chartData} options={options} />
    </ChartWrapper>
  );
}

export default VisitorsChart; 