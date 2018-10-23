import React, { Component } from 'react';
import { connect } from 'react-redux';


class PnlSummaryPage extends Component {
  componentWillMount() {
    if (typeof this.props.user.authenticated === "undefined" || this.props.user.authenticated == false) {
      this.props.history.push('/');
    }
  }
  
  render() {
    return (
      <div>
        <h3>PnL Summary Page</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(PnlSummaryPage);
