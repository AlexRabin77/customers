import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import ListRoundedIcon from '@material-ui/icons/ListRounded';

import './customer-details.css';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: green[500],
    },
}));

const CustomerDetails = () => {
    const classes = useStyles();
    const apiCustomers = 'https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0';

    const { id } = useParams();
    const history = useHistory();
    const [customer, seCustomer] = useState(null);
    const [isInit, seInit] = useState(false);

    useEffect(() => {
        fetch(apiCustomers)
        .then(response => response.json())
        .then(data => {
            const currentCustomer = data.find(customer => customer._id === id);
            seCustomer(currentCustomer);
            seInit(true);
        });
    }, [id]);

    const handleBack = (event, newPage) => {
        history.push(`/customers`);
    };


    const CurrentCustomer = () => {

        return (
            <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  C
                </Avatar>
              }
              action={
                <IconButton aria-label="settings" onClick={handleBack} component="span">
                    <ListRoundedIcon />
                </IconButton>
              }
              title={`${customer.name.first} ${customer.name.last}`}
              subheader={`Registered: ${customer.registered}`}
            />
            <CardContent>
                <Typography variant="body2" component="p">
                    Balance: {`${customer.balance}`}
                </Typography>
                <Typography variant="body2" component="p">
                    Age: {`${customer.age}`}
                </Typography>
                <Typography variant="body2" component="p">
                    Eye color: {`${customer.eyeColor}`}
                </Typography>
                <Typography variant="body2" component="p">
                    Company: {`${customer.company}`}
                </Typography>
                <Typography variant="body2" component="p">
                    Email: {`${customer.email}`}
                </Typography>
                <Typography variant="body2" component="p">
                    Phone: {`${customer.phone}`}
                </Typography>
                <Typography variant="body2" component="p">
                    Address: {`${customer.address}`}
                </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image={`${customer.picture}`}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                    {`${customer.about}`}
              </Typography>
            </CardContent>
          </Card>
        )
    }


    return (
        <div className="app">
            <Grid container
                spacing={3}
                justify="center"
                alignItems="center"
            >
                {isInit ? <CurrentCustomer /> : <CircularProgress />}
            </Grid>  
      </div> 
    );
};

export default CustomerDetails;