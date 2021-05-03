import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import {FaChevronLeft} from 'react-icons/fa'

function DetaiHeader(props) {
    return (
        <Switch>
            <Route path="/addbook">
                <Link to="/">
                    <Button className="headerButton"><FaChevronLeft/></Button>
                </Link>
                <span className="detailHeader">Neues Buch</span>
                <Link to="/">
                    <Button className="float-right headerButton" variant="outline-secondary">Abbrechen</Button>
                </Link>
            </Route>
            <Route path="/book/:id">
                <Link to="/">
                    <Button className="headerButton"><FaChevronLeft/></Button>
                </Link>
                <span className="detailHeader">Details</span>
                <Button className="float-right headerButton" variant="outline-secondary" 
                    onClick={props.toggleEditMode}>{props.edit ? 'Abbrechen' : 'Bearbeiten'}</Button>
            </Route>
        </Switch>   
    )
}

DetaiHeader.propTypes = {
    toggleEditMode: PropTypes.func,
    edit: PropTypes.bool,
}

export default DetaiHeader

