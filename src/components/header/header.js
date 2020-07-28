import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './header.css';

const Header = ({customers}) => {

    const getActive = () =>
        customers.reduce((sum, customer) => {
            if(customer.isActive){
                sum ++;
            }
            return sum;
    }, 0);

    return (
        <Grid container
            spacing={3}
            justify="center"
            alignItems="center"
      >
          <Grid item container justify="center" alignItems="center" xs={12}>
                <Typography component="h5" variant="h5">
                    User management [{getActive()} active users]
                </Typography> 
          </Grid>
      </Grid>   
    );
};

export default Header;