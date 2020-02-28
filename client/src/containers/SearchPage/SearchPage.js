import React, { Component } from "react";
import { InstantSearch, SearchBox, Pagination, Configure } from "react-instantsearch-dom";
import './SearchPage.css'
import classes from './SearchPage.module.css';
import Grid from '@material-ui/core/Grid';

import Stats from "../../components/SearchPage/Stats/Stats";
import Content from "../../components/SearchPage/Content/Content";
import Map from '../../components/SearchPage/Map/Map';

import { searchClient } from '../../services/SearchService';

class SearchPage extends Component {
    render() {
        return (
            <div className={classes.SearchPage}>
                <InstantSearch indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME} searchClient={searchClient}>
                    <Configure hitsPerPage={5} />

                    <div className={classes.searchBox}>
                        <SearchBox translations={{ placeholder: "e.g. Anna Smith Spanish San Francisco" }} />
                        <Stats />
                    </div>

                    <Grid container spacing={2} justify='center'>
                        <Grid item xs={12} sm={6} md={7} lg={8}>
                            <Map />
                        </Grid>

                        <Grid item xs={12} sm={6} md={5} lg={4}>
                            <Content />
                        </Grid>
                    </Grid>

                    <Pagination />
                </InstantSearch>
            </div>
        );
    }
}

export default SearchPage;
