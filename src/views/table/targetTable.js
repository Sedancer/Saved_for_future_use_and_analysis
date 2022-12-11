import React from "react";
import {createStyles, withStyles} from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from "@material-ui/core";
import {useTranslation} from "react-i18next";
const styles = (theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(1) * 3,
      overflowX: "auto",
    },
    btnBlock: {
      position: "absolute",
      right: 280,
    },
    tableWrapMain: {
      "& .MuiTablePagination-spacer": {
        display: "none",
      }
    },
    tablePagination: {
      padding: "0 16px 0 50px",
      height: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    tableWrap: {
      minWidth: 400,
      padding: "0",
    },
    table: {
      borderTop: "1px solid #999",
      minWidth: 400,
    },
    tr: {
      "&:hover": {
        backgroundColor: "rgba(0,0,0, 0.1)",
        transition: '400ms'
      }
    },
    td: {
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 10,
      paddingRight: 15,
      display: "flex",
      letterSpacing: "1px"
    }
  });

function SimpleTable(props) {
  const {classes, setParams, params, total, data, rows} = props;
  const { t } = useTranslation('dictionary');
  const { t:tableT } = useTranslation('table');
  function handleChangePage(event, newPage) {
    setParams({
      ...params,
      page: newPage,
    });
  }

  function handleChangeRowsPerPage(event) {
    setParams({
      ...params,
      page: 0,
      limit: event.target.value
    });
  }

  const handleClick = (sortField) => {
    setParams({
      ...params,
      page: 0,
      sortField: sortField,
      isAsc: params?.sortField === sortField && !params?.isAsc
    });
  }

  return (
    <div className={classes.tableWrapMain}>
      <div className={classes.tablePagination}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={params?.limit}
          page={params?.page}
          labelRowsPerPage={t('рядків на сторінку')}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {props.btnBlock && <div className={classes.btnBlock}>{props.btnBlock}</div>}
      </div>
      <div className={classes.tableWrap}>
        <Table className={classes.table}>
          <TableHead style={{backgroundColor: '#596671'}}>
            <TableRow>
              {rows.map(
                row => (
                  <TableCell key={row.id} padding="none" style={{width: row.width, height: 50}}>
                    {row.label === "Дії" && <div className={classes.td} style={{textAlign: 'right'}}>
                      {tableT(row.label)}
                    </div>}
                    {row.label !== "Дії" && <TableSortLabel
                      className={classes.td}
                      active={params?.sortField === row.id}
                      direction={params?.sortField === row.id && params?.isAsc ? 'asc' : 'desc'}
                      style={{justifyContent: ((row.label === "Дії") ? 'flex-end' : 'flex-start')}}
                      onClick={()=>handleClick(row.id)}
                    >
                      {tableT(row.label)}
                    </TableSortLabel>
                    }
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((n) => (
                <TableRow key={n.id} className={classes.tr}>
                  {rows.map(({id: field}) => (
                    <TableCell
                      key={field}
                      align={field === "actions" ? "right" : "inherit"}
                      component="td"
                      scope="row"
                      padding="none"
                      style={{height: 40, paddingLeft: 15, fontSize: 14}}
                    >
                      {n[field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default withStyles(styles)(SimpleTable);
