import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { 
  FaUsers, 
  FaComments, 
  FaEnvelope, 
  FaChartLine 
} from 'react-icons/fa';
import StatCard from './StatCard';
import RecentReviews from './RecentReviews';
import RecentMessages from './RecentMessages';
import VisitorsChart from './VisitorsChart';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const ChartSection = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const RecentActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

function DashboardOverview() {
  const { t } = useTranslation();
  const [stats, setStats] = React.useState({
    visitors: 0,
    reviews: 0,
    messages: 0,
    conversion: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <DashboardGrid>
        <StatCard
          icon={<FaUsers />}
          title={t('admin.dashboard.visitors')}
          value={stats.visitors}
          trend={+5.2}
        />
        <StatCard
          icon={<FaComments />}
          title={t('admin.dashboard.reviews')}
          value={stats.reviews}
          trend={+2.1}
        />
        <StatCard
          icon={<FaEnvelope />}
          title={t('admin.dashboard.messages')}
          value={stats.messages}
          trend={-1.5}
        />
        <StatCard
          icon={<FaChartLine />}
          title={t('admin.dashboard.conversion')}
          value={`${stats.conversion}%`}
          trend={+0.8}
        />
      </DashboardGrid>

      <ChartSection>
        <h2>{t('admin.dashboard.visitorsOverTime')}</h2>
        <VisitorsChart />
      </ChartSection>

      <RecentActivityGrid>
        <RecentReviews />
        <RecentMessages />
      </RecentActivityGrid>
    </div>
  );
}

export default DashboardOverview; 