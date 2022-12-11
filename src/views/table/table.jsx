import React, {useState} from 'react';
import clsx from 'clsx';
import {useTranslation} from "react-i18next";
import {createStyles, makeStyles, withStyles} from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Collapse,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton, Grid, Card, CardContent,
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import HeadersTable from "./partHeadersTable"
import {stableSort, getSorting} from './helper';

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
    wrapInnerInfo: {
      backgroundColor: 'rgb(89, 102, 113)',
      paddingBottom: 10,
      borderBottom: "1px solid #999",
      borderTop: "1px solid #999",
      '& .MuiListItem-secondaryAction': {
        padding: '0 0 0 16px',
      },
      '& .MuiListItemText-root, & .MuiListItemSecondaryAction-root, & .MuiTypography-root': {
        fontSize: 14,
      }
    }
  });


const useStyles = makeStyles({
  wrap: {
    padding: '0 16px 16px 16px',
  },
  card: {
    minWidth: 250,
    backgroundColor: "#525d67",
    border: "1px solid #ccc",
    overflow: "hidden",
    borderRadius: 2,
    '& .MuiListItemSecondaryAction-root': {
      right: 0
    },
    '& .MuiListItem-container': {
      listStyle: 'none'
    }
  },
  listItem: {
    padding: 0,
    listStyle: 'none',
  },
  listItemText: {
    borderBottom: "0.5px dotted #808080",
    paddingRight: '120px',
    "& span": {
      lineHeight: "1 !important",
    },
  },
  headWrap: {
    borderBottom: "1px solid #ccc",
    padding: 16,
  },
  head: {
    display: 'flex',
  },
  headStatus: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiChip-label': {
      padding: '0 8px',
    }
  },
  headActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    color: "#fff",
    textAlign: "left",
    fontSize: "18px",
  },
  headOpen: {
    width: 100,
    borderRadius: 0
  }
});

function TileTable(props) {
  const {data, rows, page, rowsPerPage, collapsibleFn } = props;
  const classes = useStyles();
  const fields = rows.filter(({id}) => (!(id === 'status' || id === 'actions' || id === 'ovopName' || id === 'neId' || id === 'type')));
  return (
    <div className={classes.wrap}>
      <Grid container spacing={2}>
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
          (item) => (
            <Grid item xs={12} md={6}>
              <Card key={item?.key} className={classes.card}>
                <div className={classes.headWrap}>
                <Grid
                  container
                  role="button"
                  className={classes.head}
                  onClick={() => collapsibleFn(item.key)}
                >
                  <Grid item xs={5}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {`${item?.ovopName} ${item?.neId} ${item?.type}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={7} className={classes.headStatus}>
                    {item?.status}
                  </Grid>
                </Grid>
                  <Grid container>
                    <Grid item xs={2}>
                      <IconButton
                        aria-label="open"
                        onClick={() => collapsibleFn(item.key)}
                        className={classes.headOpen}
                      >
                        {item.isCollapsible ? <KeyboardArrowUpIcon fontSize="small"/> :
                          <KeyboardArrowDownIcon fontSize="small"/>}
                      </IconButton>
                    </Grid>
                    <Grid item xs={10} className={classes.headActions}>
                      {item?.actions}
                    </Grid>
                  </Grid>
                </div>
                <Collapse in={item.isCollapsible} timeout="auto" unmountOnExit>
                  <CardContent>
                  {fields.map(
                    ({id, label}) => (
                      <ListItem key={id} className={classes.listItem}>
                        <ListItemText className={clsx(classes.listItemText, "MuiListItemText-dense")} primary={label}/>
                        <ListItemSecondaryAction>{item[id]}</ListItemSecondaryAction>
                      </ListItem>
                    )
                  )}
                  {item?.info?.map(({label, title, value, date}) => (
                    <div key={label}>
                      <ListItem className={classes.listItem}>
                        <ListItemText className={clsx(classes.listItemText, "MuiListItemText-dense")}  primary={label} />
                        <ListItemSecondaryAction>{value}</ListItemSecondaryAction>
                      </ListItem>
                      {title && (
                        <ListItem className={classes.listItem}>
                          <ListItemText
                            className={clsx(classes.listItemText, "MuiListItemText-dense")}
                            primary={title}
                          />
                          <ListItemSecondaryAction>{date}</ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </div>
                  ))}
                </CardContent>
                </Collapse>
              </Card>
            </Grid>
          )
        )
        }
      </Grid>
    </div>
  )
}

function SimpleTable(props) {
  // TODO: Обьединить эту таблицу и таблицу сортировки на беке
  const { t } = useTranslation('dictionary');
  const {classes, type, collapsibleFn, view} = props;
  const {data, rows } = props;
  const lengthData = data.length;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
  const [subOrder, setSubOrder] = useState("desc");
  const [subOrderBy, setSubOrderBy] = useState("");

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  function handleRequestSort(_, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleRequestSortSub(_, property) {
    const isDesc = subOrderBy === property && subOrder === "desc";
    setSubOrder(isDesc ? "asc" : "desc");
    setSubOrderBy(property);
  }

  return (
    <div className={classes.tableWrapMain}>
      <div className={classes.tablePagination}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, { label: 'Всі', value: lengthData }]}
          component="div"
          count={lengthData}
          rowsPerPage={rowsPerPage}
          page={page}
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
        { view === 'tile' && (
          <TileTable
            page={page}
            rowsPerPage={rowsPerPage}
            data={data}
            rows={rows}
            collapsibleFn={collapsibleFn}
          />
        )}
        {!view && (
          <Table className={classes.table}>
            <HeadersTable
              type={type}
              order={order}
              orderBy={orderBy}
              rowCount={data.length / rowsPerPage}
              onRequestSort={handleRequestSort}
              rows={rows}
              subOrder={subOrder}
              subOrderBy={subOrderBy}
              onRequestSortSub={handleRequestSortSub}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy), getSorting(subOrder, subOrderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                    // TODO: создать в редаксе уникальное полде для клуюча key или id
                    const key = n.key || n.id || n.userId || `${n.auditId}_${n.ovopId}_${n.neId}_${n.ovopName}_${n.time}`;
                    return (
                      <>
                        <TableRow key={key} className={classes.tr}>
                          {type === 'collapsible' && (
                            <TableCell>
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => collapsibleFn(key)}
                              >
                                {n.isCollapsible ? <KeyboardArrowUpIcon fontSize="small"/> :
                                  <KeyboardArrowDownIcon fontSize="small"/>}
                              </IconButton>
                            </TableCell>
                          )}
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
                        {type === 'collapsible' && (
                          <TableRow>
                            <TableCell style={{padding: 0, border: 'none'}} colSpan={rows.length + 1}>
                              <Collapse in={n.isCollapsible} timeout="auto" unmountOnExit>
                                <Box sx={{margin: 1}} className={classes.wrapInnerInfo}>
                                  <div>
                                    <List>
                                      {n?.info?.map(({label, title, value, date}) => (
                                        <Grid container key={label}>
                                          <Grid item xs={12} md={6}>
                                          <ListItem className={classes.listItem}>
                                            <ListItemText className={clsx(classes.listItemText, "MuiListItemText-dense")}  primary={label} />
                                            <ListItemSecondaryAction>{value}</ListItemSecondaryAction>
                                          </ListItem>
                                          </Grid>
                                          {title && (
                                            <Grid item xs={12} md={6}>
                                            <ListItem className={classes.listItem}>
                                              <ListItemText
                                                className={clsx(classes.listItemText, "MuiListItemText-dense")}
                                                primary={title}
                                              />
                                              <ListItemSecondaryAction>{date}</ListItemSecondaryAction>
                                            </ListItem>
                                            </Grid>
                                          )}
                                        </Grid>
                                      ))}
                                    </List>
                                  </div>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    )
                  }
                )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default React.memo(withStyles(styles)(SimpleTable));
