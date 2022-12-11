import React from "react";
import clsx from 'clsx';
import {Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    title: {
        textAlign: "center",
        borderBottom: "1px solid #999",
        padding: "10px 0",
        fontWeight: "bold",
        position: "sticky",
        top: "50px",
        backgroundColor: "#525d67",
        zIndex: 2
    },
    notSticky: {
      position: "relative",
      top: "0px",
    },
    cardWrap: {
        marginBottom: '10px',
        border: "1px solid #999",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, .16)",
        borderRadius: "4px",
        backgroundColor: "#525d67",
        position: "relative"
    },
    card: {
        overflowY: "auto",
        padding: "10px 10px 5px 10px",
    },
    content: {
        lineHeight: 1.4,
        fontSize: 12,
        padding: "0 0 5px 0",
    }
});

const LogComponent = props => {
    const classes = useStyles();
    return (
        <div className={classes.cardWrap}>
            <Typography
              className={clsx(classes.title, {
                [classes.notSticky]: props?.notSticky,
              })}
             color="textSecondary" gutterBottom>
                {props.label}
            </Typography>
            <div className={classes.card}>
                {props.data.map(t => <div key={t} className={classes.content}>{t}</div>)}
            </div>
        </div>
    );
};

export default LogComponent;
