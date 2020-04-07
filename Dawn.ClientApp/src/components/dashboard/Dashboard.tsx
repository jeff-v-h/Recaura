import * as React from "react";
import { connect } from "react-redux";
import DashboardTable from "./DashboardTable";

const Dashboard = () => <DashboardTable />;

export default connect()(Dashboard);
