import React, { memo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';

import useStyles from './styles';

const SelectControl = ({
  selectedItem, items, title, onHandleChange, variant,
  fullWidth
}) => {
  const classes = useStyles();
  return (
    <FormControl
      size="small"
      variant={variant}
      className={clsx(classes.formControl, {
        [classes.fullWidth]: fullWidth
      })}
    >
      <InputLabel id="forecast-select-outlined-label">{title}</InputLabel>
      <Select
        labelId="forecast-select-outlined-label"
        id="forecast-select"
        value={selectedItem}
        onChange={onHandleChange}
        label={title}
      >
        {items.map(({ value, text }) => (<MenuItem key={value} value={value}>{text}</MenuItem>))}
      </Select>
    </FormControl>
  );
};

SelectControl.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })),
  selectedItem: PropTypes.string,
  onHandleChange: PropTypes.func,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool
};
SelectControl.defaultProps = {
  title: '',
  items: [],
  selectedItem: '',
  onHandleChange: () => {},
  variant: 'outlined',
  fullWidth: false,
};
export default memo(SelectControl);
