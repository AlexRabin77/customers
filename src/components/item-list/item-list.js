import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TablePagination from '@material-ui/core/TablePagination';

import './item-list.css';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    selected: {
       cursor: 'pointer',
    }
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const ItemList = ({customers, digests, onCustomerChanged = () => {}}) => {
    const classes = useStyles();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleDoubleClick = (event, customer) => {
      if(customer.isActive) {
        history.push(`/customer/id=${customer._id}`);
      }
    };

    const getState = (address) => {
      return address.split(',')[2];
    };

    const getCity = (address) => {
      return address.split(',')[1];
    };
  
    return (

        <Grid container
              spacing={3}
              justify="center"
              alignItems="center"
        >
            <Grid item container justify="center" alignItems="center" xs={12}>
              <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                      <TableHead>
                          <TableRow>
                            <StyledTableCell align="center">Action</StyledTableCell>
                            <StyledTableCell align="center">First Name</StyledTableCell>
                            <StyledTableCell align="center">Last Name</StyledTableCell>
                            <StyledTableCell align="center">Company</StyledTableCell>
                            <StyledTableCell align="center">City</StyledTableCell>
                            <StyledTableCell align="center">State</StyledTableCell>
                            <StyledTableCell align="center">Digest</StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, key) => {
                            return (
                              <StyledTableRow key={key} 
                                              hover
                                              onDoubleClick={(event) => handleDoubleClick(event, customer)} 
                                              selected={customer.isActive}>
                                <StyledTableCell align="center">
                                  <Switch
                                    checked={customer.isActive}
                                    onChange={() => { onCustomerChanged(customer._id) }}
                                    name="checkedB"
                                    color="primary"
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="center">{customer.name.first}</StyledTableCell>
                                <StyledTableCell align="center">{customer.name.last}</StyledTableCell>
                                <StyledTableCell align="center">{customer.company}</StyledTableCell>
                                <StyledTableCell align="center">{getCity(customer.address)}</StyledTableCell>
                                <StyledTableCell align="center">{getState(customer.address)}</StyledTableCell>
                                <StyledTableCell align="center">{digests[key]}</StyledTableCell>
                              </StyledTableRow>
                            );
                          })}
                      </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
        </Grid>  
    );
};

export default ItemList;