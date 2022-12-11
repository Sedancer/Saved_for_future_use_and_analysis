import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import Btn from '@components/Button';

import FilterListIcon from '@material-ui/icons/FilterList';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {makeStyles} from "@material-ui/core/styles";

const useStyles =  makeStyles({
    root: {
      width: "100%",
      backgroundColor: "#525d67",
      border: '1px solid #999',
      boxShadow: '0 3px 6px 0 rgba(0, 0, 0, .16)',
      borderRadius: 4,
      position: "relative"
    },
    icon: {
      color: "#fff"
    },
    wrap: {
      display: "flex",
      height: "100%",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    partHead: {
      padding: '15px',
      position: "relative",
      height: '40px'
    },
    partHeadIcon: {
      position: "absolute",
      right: 16,
      top: 16,
      display: "flex",
    },
    partTable: {
      flex: "1 1 auto",
      transition: 'width 200ms',
      overflow: "auto"
    },
    partFilters: {
      marginTop: "70px",
      padding: "10px 15px",
      borderLeft: '1px solid #999',
      borderTop: '1px solid #999',
      width: 300,
      minHeight: 'calc(100% - 70px)',
      position: "sticky",
      transition: 'width 200ms, opacity 300ms',
      top: 0,
      opacity: 1
    },
    partFiltersHide: {
      width: 0,
      padding: 0,
      overflow: "hidden",
      opacity: 0
    },
  });

const WrapTablePage = props => {
  const classes = useStyles();
  const { t } = useTranslation('dictionary');
  const [isOpenFilters, setOpenFilters] = useState(true);
  return (
    <div className={classes.root}>
      <div className={classes.wrap}>
        <div className={classes.partTable}>
          {props.table}
        </div>
        {props.filters && (
          <>
            <div className={classes.partHeadIcon}>
                <Btn onClick={() => setOpenFilters(!isOpenFilters)}>
                  {isOpenFilters ? (<><FilterListIcon/>{t('Приховати фільтр')}</>) : (<><MenuOpenIcon/>{t('Показати фільтр')}</>)}
                </Btn>
            </div>

            <div className={clsx(classes.partFilters, {
              [classes.partFiltersHide]: !isOpenFilters,
            })}
            >
              <div>{props.filters}</div>
            </div>
          </>)}
      </div>
    </div>
  );
};

export default WrapTablePage;
