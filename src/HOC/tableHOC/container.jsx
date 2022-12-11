import React from "react";
import { connect } from "react-redux";
import { filter } from "lodash";
import { Grid, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { UPDATE_TABLE_SETTINGS } from "@/store/settings/actions";
import { Modal } from "./components";


export default function TableHOC(Component, id) {
    class TableHOC extends React.Component  {
        state = {
            open: false,
        };
        handleModal = (boolean) => {
            this.setState({ open: boolean });
        };

        render() {
            const { settings } = this.props;

            const rows = filter(settings, ({ hide = false }) => !hide);

            return (
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <IconButton
                            size="small"
                            style={{ textAlign: "right", zIndex: 5, position: "absolute", top: 16, left: 16}}
                            onClick={() => this.handleModal(true)}
                        >
                            <Settings color="secondary" />
                        </IconButton>
                        <Component {...this.props} rows={rows} />
                    </Grid>
                    <Modal
                        open={this.state.open}
                        onUpdate={this.props.updateSettings}
                        rows={settings.slice()}
                        setOpen={this.handleModal}
                    />
                </Grid>
            );
        }
    }
    const mapStateToProps = (state) => {
      // console.log('state', state);
      // console.log('id', id);
      return ({
        settings: state.settings.tables[id],
    })};

    const mapDispatchToProps = (dispatch) => ({
        updateSettings: (DTO) => dispatch(UPDATE_TABLE_SETTINGS(DTO, id)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(TableHOC);
}
