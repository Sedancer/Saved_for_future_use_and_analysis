import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Dialog,
	DialogContent,
	Button,
	DialogTitle,
	Grid,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {CLEAR} from "@redux/commutators/actions";

import {useDispatch} from "react-redux";

const useStyles = makeStyles({
    card: {
        minWidth: 250,
        border: "3px dashed"
    },
    error: {
        borderColor: "red !important"
    },
    success: {
        borderColor: "green !important"
    },
    listItem: {
        padding: 0,
        textTransform: 'capitalize'
    },
    listItemText: {
        borderBottom: "0.5px dotted #808080",
        "& span": {
            lineHeight: "1 !important"
        }
    },
    title: {
        textAlign: "center"
    }
});
const InfoCommutator = ({ isOpen, dopInfo, onClose }) => {
		const dispatch = useDispatch();
		const clear = id => dispatch(CLEAR(id));
    const classes = useStyles();
    const { ovopId, ...dop } = dopInfo;
    return (
        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
					<DialogTitle>
						<Grid container justify="flex-end" spacing={1}>
							<IconButton aria-label="close" onClick={onClose} size="small">
								<CloseIcon fontSize="inherit" />
							</IconButton>
						</Grid>
					</DialogTitle>
            <DialogContent>
                <Grid container alignItems="center" justify="center" spacing={1}>
                    <Grid item xs={12}>
                        <List>
                            {Object.entries(dop).map(([label, value]) => (
                                <ListItem key={label} className={classes.listItem}>
                                    <ListItemText id="switch-list-label-wifi" primary={`${label}: `} />
                                    <ListItemSecondaryAction>{`${value}`}</ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                        <Button style={{ marginBottom: 4 }} fullWidth variant="outlined" onClick={() => clear(ovopId)}>
                            Очистити чергу
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default InfoCommutator;
