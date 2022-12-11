import React from "react";
import { connect } from "react-redux";
import { GET_TABLE_SETTINGS } from "@/store/settings/actions";

export default function getDataHOC(Component) {
  class GetData extends React.Component {
    componentDidMount() {
      this.props.getSetting();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    const { fetching } = state.commutators;
    const isLoading = Object.values(fetching).some((v) => Boolean(v));
    return {
      rules: state.users.claims,
      loading: isLoading,
      settings: state.settings.settings,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    getSetting: () => dispatch(GET_TABLE_SETTINGS()),
  });

  return connect(mapStateToProps, mapDispatchToProps)(GetData);
}