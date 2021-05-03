import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function DetailRow(props) {
    return (
        <Row>
            <Col className="detailLabel" lg={2} xs={12}>{props.label}</Col>
            <Col>
                { props.edit 
                ? <Form.Control type={props.type} value={props.value || ''} required
                    onChange={props.onChange}></Form.Control> 
                : props.display }
            </Col>
        </Row>
    )
}

DetailRow.propTypes = {
    label: PropTypes.string,
    edit: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    display: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default DetailRow

