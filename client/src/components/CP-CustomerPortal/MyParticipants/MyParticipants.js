import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import EnhancedTableHead from './EnhancedTableHead';
import CustomerPortalContainer from '../../../containers/Shell/CustomerPortalContainer/CustomerPortalContainer';

// Do not do this, fix this
let counter = 0;

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  pageTitle: {
    width: '100%',
    textDecoration: 'underline',
    textDecorationColor: (theme.palette.type === 'light') ? '#000000' : '#FFFFFF',
    paddingBottom: '15px',
  },
  participationButton: {
    margin: '8px',
  },
});

const createData = (firstName, middleInitial, lastName, suffix, age, teacher) => {
    counter += 1;
    return {
        id: counter, firstName, middleInitial, lastName, suffix, age, teacher,
    };
};

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.main, 0.75),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.primary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="h6">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Participants
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Typography variant="h6" id="tableTitle">
                Delete
              </Typography>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

/* const styles = () => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}); */

class MyParticipants extends Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    // TODO: Create a data file instead of hard coding inside of code for future use
    data: [
      createData('Alice', 'P', 'Smith', 'Jr', 9, 'Mr. Jenkins'),
      createData('Mary', 'B', 'Daniels', 'Sr', 11, 'Mr. Matthews'),
      createData('Ronald', 'E', 'Davidson', '-', 8, 'Mrs. Charles'),
      createData('Scott', 'K', 'Brown', '-', 16, 'Ms. Anderson'),
      createData('Raymond', 'I', 'McMann', 'Jr', 13, 'Mrs. Stevenson'),
      createData('Kenneth', 'B', 'Honeycomb', '-', 18, 'Mr. Franklin'),
      createData('Gary', 'N', 'Peters', 'Sr', 13, 'Mr. Jackson'),
      createData('Joshua', 'S', 'Holyfield', '-', 9, 'Ms. Sparks'),
      createData('Heather', 'D', 'Howard', '-', 16, 'Mrs. Cilliza'),
      createData('Lou', 'V', 'York', '-', 12, 'Mrs. Thomas'),
      createData('Jack', 'S', 'Ybarra', '-', 14, 'Mrs. Banks'),
      createData('Steve', 'A', 'Noack', 'Jr', 10, 'Mr. Cummings'),
      createData('Gabriella', 'I', 'Barnett', 'Jr', 12, 'Mr. Ehlers'),
    ],
    page: 0,
    rowsPerPage: 5,
    open: false,
  };

  handleRequestSort = (event, property) => {
    let { order = 'desc' } = this.state;
    const { orderBy = property } = this.state;

    if (orderBy === property && order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  handleDialogOpen = () => {
    this.setState({ open: true });
  };

  handleDialogClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const {
        data,
        order,
        orderBy,
        selected,
        rowsPerPage,
        page,
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <CustomerPortalContainer>
          <div className={classes.pageTitle}>
            <Typography component="h2" variant="h2" gutterBottom align="center">
              My Participants
            </Typography>
          </div>
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={data.length}
                    />
                    <TableBody>
                    {stableSort(data, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((n) => {
                        const isSelected = this.isSelected(n.id);
                        return (
                            <TableRow
                              hover
                              onClick={event => this.handleClick(event, n.id)}
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={n.id}
                              selected={isSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox color="primary" checked={isSelected} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                {n.firstName}
                            </TableCell>
                            <TableCell>{n.middleInitial}</TableCell>
                            <TableCell>{n.lastName}</TableCell>
                            <TableCell>{n.suffix}</TableCell>
                            <TableCell>{n.age}</TableCell>
                            <TableCell>{n.teacher}</TableCell>
                            </TableRow>
                        );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </div>
                <TablePagination
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.participationButton}
                  onClick={this.handleDialogOpen}
                >
                  Add New Participant
                </Button>
                <Dialog
                  // eslint-disable-next-line react/destructuring-assignment
                  open={this.state.open}
                  onClose={this.handleDialoglose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Add New Participant</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please enter all required information to add a new participant!
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="first-name"
                      label="First Name"
                      required
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="middle-initial"
                      label="Middle Initial"
                      required
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="last-name"
                      label="Last Name"
                      required
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="suffix"
                      label="Suffix"
                    />
                    <TextField
                      margin="dense"
                      id="age"
                      label="Age"
                      fullWidth
                      required
                    />
                    <TextField
                      margin="dense"
                      id="teacher"
                      label="Teacher"
                      required
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleDialogClose} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
            </Paper>
        </CustomerPortalContainer>
    );
  }
}

export default withStyles(styles)(MyParticipants);
