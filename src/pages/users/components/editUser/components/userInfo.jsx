import React from "react";
import {useTranslation} from "react-i18next";
import { Grid, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GET_CLAIM_NAME } from "@/utils/claims";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));
const UserInfo = (props) => {
    const classes = useStyles();
    const { t } = useTranslation('users');
    const { t:rules } = useTranslation('rules');
    return (
        <Grid container spacing={2} style={{padding: '5px 5px 20px 5px'}}>
            <Grid item container xs={12} justify="space-between" style={{ borderBottom: "1px dashed #c3c3c3" }}>
                <Typography gutterBottom variant="h6">
                  {`${t('Логiн')}:`}
                </Typography>

                <Typography gutterBottom variant="h6" style={{ fontWeight: 400 }}>
                    {props.login}
                </Typography>
            </Grid>
            <Grid item container xs={12} justify="space-between" style={{ borderBottom: "1px dashed #c3c3c3" }}>
                <Typography gutterBottom variant="h6">
                  {`${t('Права')}:`}
                </Typography>

                <Typography gutterBottom variant="h6" style={{ fontWeight: 400 }}>
                    {props.roles.map((claim) => (
                        <Chip style={{ margin: 1 }} size="small" label={rules(GET_CLAIM_NAME(claim))} className={classes.chip} />
                    ))}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default UserInfo;
