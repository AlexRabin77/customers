import React, { Fragment, useEffect, useState } from 'react';

import Header from '../header';
import ItemList from '../item-list';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import './customers.css';

const Customers = () => {
    const apiCustomers = 'https://run.mocky.io/v3/93a7ac54-14e7-43a0-8a8d-8e3821cf74d0';
    const apiDigests = 'https://api.hashify.net/hash/md4/hex?value=';
    
    const [isInit, seInit] = useState(false);
    const [data, setData] = useState(null);
    const [digestArray, setDigestArray] = useState([]);
    
    useEffect(() => {
        fetch(apiCustomers)
        .then(response => response.json())
        .then(data => {
            setData(data);
            initDigest(data);
        });
    }, []);

    const onCustomerChanged = (id) => {
        const customerForUpdate = data.find(customer => customer._id === id);
        const indexForUpdate = data.indexOf(customerForUpdate);
        let newCustomer = {
            ...customerForUpdate,
            isActive: !customerForUpdate.isActive,
        }
        setData([
                ...data.slice(0, indexForUpdate),
                newCustomer,
                ...data.slice(indexForUpdate + 1)
            ]
        );
    };

    const initDigest = async (data) => {
        let curretDigests = [];
        for (const customer of data) {
            const fullName = `${customer.name.first}${customer.name.last}`;
            const resourceUrl = `${apiDigests}${fullName}`;
            const response = await fetch(resourceUrl);
            const json = await response.json();
            curretDigests.push(json.Digest);
            setDigestArray(curretDigests);
        }
        seInit(true);
    }

    return (
        <div className="app">
            <Grid container
              spacing={3}
              justify="center"
              alignItems="center"
            >
                {isInit ? 
                <Fragment>
                    <Grid item container justify="center" alignItems="center"  xs={12}>
                            <Header customers={data} />
                    </Grid>
                    <Grid item container justify="center" alignItems="center"  xs={12}>
                            <ItemList customers={data} digests={digestArray} onCustomerChanged={onCustomerChanged} />
                    </Grid>
                </Fragment>
                 : <CircularProgress />}
            </Grid>
        </div>
    );
};

export default Customers;