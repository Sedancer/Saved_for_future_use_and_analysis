import React from "react";
import classNames from "classnames";
import Select from "react-select";
import { isEmpty } from "lodash";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { createStyles, emphasize, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: 250,
        },
        input: {
            display: "flex",
            padding: 0,
            height: "auto",
        },
        valueContainer: {
            display: "flex",
            flexWrap: "wrap",
            flex: 1,
            alignItems: "center",
            overflow: "hidden",
        },
        chip: {
            margin: theme.spacing(0.5, 0.25),
        },
        chipFocused: {
            backgroundColor: emphasize(theme.palette.grey[700], 0.08),
        },
        noOptionsMessage: {
            padding: theme.spacing(1, 2),
        },
        singleValue: {
            fontSize: 16,
        },
        placeholder: {
            position: "absolute",
            left: 2,
            bottom: 6,
            fontSize: 16,
        },
        paper: {
            position: "absolute",
            marginTop: 0,
            top: 45,
            left: 0,
            right: 0,
            borderLeft: '2px solid #FDD835',
            borderRight: '2px solid #FDD835',
            borderBottom: '2px solid #FDD835',
            borderRadius: '0 0 4px 4px',
            zIndex: 99999,
        },
        divider: {
            height: theme.spacing(2),
        },
    })
);

function NoOptionsMessage(props) {
    return (
        <Typography color="textSecondary" className={props.selectProps.classes.noOptionsMessage} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} style={{ padding: "2px 13px" }} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            error={props.error}
            helperText={props.error}
            required={props.required}
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography color="textSecondary" className={props.selectProps.classes.placeholder} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            color={props.data.isFixed ? "primary" : "secondary"}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.data.isFixed ? () => {} : props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

function IntegrationReactSelect(props) {
    const classes = useStyles();

    function handleDelegate(value, { action }) {
        if (action === "clear" && props.isMulti) {
            props.onChange(props.value.filter((v) => v.isFixed).concat(value));
            return;
        }
        if (props.isMulti) {
            props.onChange(value);
        } else {
            props.onChange(value);
        }
    }

    if(isEmpty(props.data)) return null;

    return (
        <div>
            <Select
                classes={classes}
                margin="dense"
                maxMenuHeight={150}
                textFieldProps={{
                    margin:"dense",
                    label: props.label,
                    required: props.required,
                    error: props.error,
                    InputLabelProps: {
                        shrink: true,
                    },
                }}
                isDisabled={props.disabled}
                required={props.required}
                //TODO: error empty props.data
                options={props.data[0] && typeof props.data[0] === "string" ? props.data.map((el) => ({ value: el, label: el })) : props.data}
                isClearable={props.data.some((el) => !el.isFixed)}
                components={components}
                value={props.value}
                onChange={handleDelegate}
                placeholder={props.placeholder}
                isMulti={props.isMulti}
            />
        </div>
    );
}

export default IntegrationReactSelect;
