import React, { Component } from "react";
import { InstantSearch, SearchBox, Pagination, Configure, Panel } from "react-instantsearch-dom";
import './AlgoliaSearchPage.css'
import classes from './AlgoliaSearchPage.module.css';
import Grid from '@material-ui/core/Grid';

import Stats from "../../components/SearchPage/Stats/Stats.js";
import RangeSlider from "../../components/SearchPage/RangeSlider/RangeSlider.js";
import Content from "../../components/SearchPage/Content/Content";
import Facet from "../../components/SearchPage/Facet/Facet";

import { searchClient } from '../../services/SearchService';

class AlgoliaSearchPage extends Component {
    render() {
        return (
            <div className={classes.SearchPage}>
                <InstantSearch indexName={process.env.REACT_APP_ALGOLIA_INDEX_NAME}
                    searchClient={searchClient}>
                    <Configure
                        hitsPerPage={5}
                        attributesToSnippet={["description:24"]}
                        snippetEllipsisText=" [...]" />

                    <Grid container spacing={1} justify='center'>
                        <Grid item xs={12} sm={6}>
                            <div id="searchbox" className={classes.searchBox}>
                                <SearchBox translations={{ placeholder: "Search for translators" }} />
                            </div>
                            <div id="stats">
                                <Stats />
                            </div>
                            <h1>Map</h1>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div id="hits">
                                <Content />
                            </div>
                        </Grid>
                    </Grid>

                    <div id="pagination">
                        <Pagination />
                    </div>
                </InstantSearch>
            </div>
        );
    }
}

export default AlgoliaSearchPage;

/* <div id="categories">
    <Panel header="Categories">
        <Facet attribute="categories" />
    </Panel>
</div>
<div id="brands">
    <Panel header="Brands">
        <Facet
            attribute="brand"
            searchable={true}
            translations={{ placeholder: "Search for other..." }}
        />
    </Panel>
</div>
<div id="price">
    <Panel header="Price">
        <RangeSlider attribute="price" />
    </Panel>
</div> */

