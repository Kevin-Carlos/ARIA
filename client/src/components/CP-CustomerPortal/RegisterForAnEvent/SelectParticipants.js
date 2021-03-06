import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import ParticipantTableHead from './ParticipantTableHead';

// Do not do this, fix this
let counter = 0;

const styles = () => ({
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
    textDecorationColor: '#FFFFFF',
    paddingBottom: '15px',
  },
});

const createData = (firstName, middleInitial, lastName, age, musicLevel, teacher) => {
    counter += 1;
    return {
        id: counter, firstName, middleInitial, lastName, age, musicLevel, teacher,
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
  highlight: {
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
        <Typography variant="h6" id="tableTitle">
          Select Participants
        </Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class SelectParticipants extends Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    // TODO: Create a data file instead of hard coding inside of code for future use
    data: [
      createData('Alice', 'P', 'Smith', '4', 2, 'Mr. Jenkins'),
      createData('Mary', 'B', 'Daniels', '11', 11, 'Mr. Matthews'),
      createData('Ronald', 'E', 'Davidson', '16', 4, 'Mrs. Charles'),
      createData('Scott', 'K', 'Brown', '18', 6, 'Ms. Anderson'),
      createData('Raymond', 'I', 'McMann', '14', 1, 'Mrs. Stevenson'),
      createData('Kenneth', 'B', 'Honeycomb', '9', 8, 'Mr. Franklin'),
      createData('Gary', 'N', 'Peters', '8', 3, 'Mr. Jackson'),
      createData('Joshua', 'S', 'Holyfield', '7', 9, 'Ms. Sparks'),
      createData('Heather', 'D', 'Howard', '5', 6, 'Mrs. Cilliza'),
      createData('Lou', 'V', 'York', '2', 8, 'Mrs. Thomas'),
      createData('Jack', 'S', 'Ybarra', '12', 1, 'Mrs. Banks'),
      createData('Steve', 'A', 'Noack', '11', 10, 'Mr. Cummings'),
      createData('Gabriella', 'I', 'Barnett', '7', 6, 'Mr. Ehlers'),
    ],
    page: 0,
    rowsPerPage: 5,
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
    const { handleStudents } = this.props;
    const { data } = this.state;

    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      handleStudents([data.map(n => n)]);
      return;
    }
    handleStudents([]);
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { handleStudents } = this.props;
    const { selected, data } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    const newSelectedObjs = [];

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

    // Get the actual objects and store them in parent's state
    newSelected.forEach((index) => {
      newSelectedObjs.push(data[index]);
    });

    handleStudents(newSelectedObjs);
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
            <div className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <ParticipantTableHead
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
                            <TableCell>{n.age}</TableCell>
                            <TableCell>{n.musicLevel}</TableCell>
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
            </div>
    );
  }
}

export default withStyles(styles)(SelectParticipants);
