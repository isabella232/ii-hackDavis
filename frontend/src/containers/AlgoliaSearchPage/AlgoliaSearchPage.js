import React, { Component } from "react";
import { InstantSearch, SearchBox, Pagination, Configure, Panel } from "react-instantsearch-dom";
import './AlgoliaSearchPage.css'
import classes from './AlgoliaSearchPage.module.css';
import Grid from '@material-ui/core/Grid';

import Stats from "../../components/SearchPage/Stats/Stats";
import Content from "../../components/SearchPage/Content/Content";
import Map from '../../components/SearchPage/Map/Map';

import { searchClient } from '../../services/SearchService';

class AlgoliaSearchPage extends Component {
    render() {
        return (
            <div className={classes.SearchPage}>
                <InstantSearch indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME} searchClient={searchClient}>
                    <Configure hitsPerPage={5} />

                    <Grid container spacing={2} justify='center'>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.searchBox}>
                                <SearchBox translations={{ placeholder: "Search for translators" }} />
                            </div>

                            <Stats />

                            <Map />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Content />
                        </Grid>
                    </Grid>

                    <Pagination />
                </InstantSearch>
            </div>
        );
    }
}

export default AlgoliaSearchPage;
