import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import * as action from '../../store/actions/auth';
import { connect } from 'react-redux';

function AppDrawer(props) {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/');
  }

  const handleStats = () => {
    navigate('/stats')
  }

  return (
    <div>
        <ListItem button onClick={handleDashboard}>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={handleStats}> 
        <ListItemIcon>
            <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
        </ListItem>

        <ListItem button onClick={props.logout}>
        <ListItemIcon>
            <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
        </ListItem>
    </div>
  )
}

  
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(action.authLogout())
  }
}

export default connect(null, mapDispatchToProps)(AppDrawer);