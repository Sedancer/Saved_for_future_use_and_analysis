import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { ModalsHOC } from "@/HOC";
import { Typography } from "@material-ui/core";

const useTreeItemStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        color: theme.palette.text.secondary,
        "&:hover > $content": {
            backgroundColor: theme.palette.action.hover,
        },
        "&:focus > $content, &$selected > $content": {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
            color: "var(--tree-view-color)",
        },
        "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
            backgroundColor: "transparent",
        },
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "$expanded > &": {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: 0,
        "& $content": {
            paddingLeft: theme.spacing(2),
        },
    },

    label: {
        fontWeight: "inherit",
        color: "inherit",
    },
    labelRoot: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: "inherit",
        flexGrow: 1,
    },
}));
function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, number, labelInfo, onLabelClick } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <Typography variant="body2" className={classes.labelText}>
                        {number}. {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onLabelClick();
                        }}
                    >
                        <Close fontSize="small" style={{ color: "red" }} />
                    </IconButton>
                </div>
            }
            classes={{
                root: classes.root,
                content: classes.content,

                group: classes.group,
                label: classes.label,
            }}
        />
    );
}

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
    },
});
const ErrorMessage = (props) => {
    const classes = useStyles();
    let errors = props.errors
        .reduce((acc, err) => {
            let harErrorCodeInArray = acc.find((error) => error === err.module);
            if (!harErrorCodeInArray) acc.push(err.module);
            return acc;
        }, [])
        .map((module) => {
            let errorsWithCurrentModule = props.errors.filter((err) => err.module === module);
            return errorsWithCurrentModule;
        });

    return (
        <div>
            <Dialog
                open={props.errors.length > 0}
                maxWidth="lg"
                fullWidth
                style={{ zIndex: 99999 }}
                onClose={() => {}}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title" style={{ color: "red" }}>
                    Помилки
                </DialogTitle>
                <Grid container>
                    <Grid item xs={12}>
                        <TreeView className={classes.root} defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                            {errors.map((error, i) => (
                                <TreeItem
                                    nodeId={i}
                                    label={
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <Typography style={{ fontWeight: "inherit", flexGrow: 1 }}>{`${error[0].module}. `}</Typography>
                                            <Typography variant="caption" color="inherit">
                                                Всього помилок: {error.length}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    props.onError(error.map((el) => el.id));
                                                }}
                                            >
                                                <Close style={{ color: "red" }} />
                                            </IconButton>
                                        </div>
                                    }
                                >
                                    {error.map((err, i) => (
                                        <StyledTreeItem
                                            nodeId={err.id}
                                            number={i + 1}
                                            onLabelClick={() => props.onError([err.id])}
                                            labelText={err.message}
                                            labelInfo={err.status}
                                        />
                                    ))}
                                </TreeItem>
                            ))}
                        </TreeView>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
};

export default ModalsHOC(ErrorMessage);
