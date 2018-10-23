import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logoutUser, fetchPnlSummary } from '../actions/index';


class PnlSummaryPage extends Component {
  componentDidMount() {
    this.props.fetchPnlSummary(this.props.user.accessToken);
  }

  onLogout() {
    this.props.logoutUser(this.props.user.accessToken);
  }

  renderPositions() {
    if (!this.props.pnl_summary.positions) {
      return (
        <tr>
          <td colSpan="6">
            Waiting for positions to load...
          </td>
        </tr>
      );
    }
    return this.props.pnl_summary.positions.map(position => {
      return (
        <tr key={position.symbol}>
          <th scope="row">{position.symbol}</th>
          <td>{position.unrealisedPnl}</td>
          <td>{position.leveragedEquity}</td>
          <td>{position.realEquity}</td>
          <td>{position.unrealisedPnlPercent}</td>
          <td>{position.returnOnEquity}</td>
        </tr>
      );
    })
  }

  render() {
    const { authenticated } = this.props.user;
    if (!authenticated) {
      return <Redirect to='/'/>;
    }
    return (
      <div className="page-header">
        <div className="row">
          <div className="col-xs-6">
            Hello {this.props.user.email}!
          </div>
          <div className="col-xs-6">
            <button
              className="btn btn-danger"
              onClick={this.onLogout.bind(this)}>
                Logout
            </button>
          </div>
        </div>
        <h3>PnL Summary Page</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Unrealised PnL</th>
              <th scope="col">Leveraged Equity</th>
              <th scope="col">Real Equity</th>
              <th scope="col">Unrealised PnL %</th>
              <th scope="col">Return on Equity</th>
            </tr>
          </thead>
          <tbody>
            {this.renderPositions()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({user, pnl_summary}) {
  return {
    user,
    pnl_summary
  }
}

export default connect(mapStateToProps, { logoutUser, fetchPnlSummary } )(
  PnlSummaryPage
);
