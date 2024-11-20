import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaUsers, FaShoppingCart, FaStar, FaChartLine } from 'react-icons/fa';
import StatCard from './StatCard';

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
`;

const StatCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ChartSection = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const ChartContainer = styled.div`
  height: 400px;
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

function StatisticsDashboard() {
  const { t } = useTranslation();
  const [stats, setStats] = React.useState({
    overview: {
      visitors: 0,
      orders: 0,
      revenue: 0,
      rating: 0,
    },
    visitorStats: [],
    orderStats: [],
    revenueStats: [],
  });

  React.useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/admin/statistics');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <DashboardWrapper>
      <StatCards>
        <StatCard
          icon={<FaUsers />}
          title={t('admin.stats.visitors')}
          value={stats.overview.visitors}
          trend={+12.5}
        />
        <StatCard
          icon={<FaShoppingCart />}
          title={t('admin.stats.orders')}
          value={stats.overview.orders}
          trend={+8.2}
        />
        <StatCard
          icon={<FaChartLine />}
          title={t('admin.stats.revenue')}
          value={`₪${stats.overview.revenue.toLocaleString()}`}
          trend={+15.3}
        />
        <StatCard
          icon={<FaStar />}
          title={t('admin.stats.rating')}
          value={stats.overview.rating.toFixed(1)}
          trend={+0.3}
        />
      </StatCards>

      <Grid>
        <ChartSection>
          <ChartTitle>{t('admin.stats.visitorTrends')}</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer>
              <LineChart data={stats.visitorStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#0073E6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartSection>

        <ChartSection>
          <ChartTitle>{t('admin.stats.orderTrends')}</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer>
              <BarChart data={stats.orderStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartSection>

        <ChartSection>
          <ChartTitle>{t('admin.stats.revenueTrends')}</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer>
              <LineChart data={stats.revenueStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FFB800"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartSection>
      </Grid>
    </DashboardWrapper>
  );
}

export default StatisticsDashboard; 