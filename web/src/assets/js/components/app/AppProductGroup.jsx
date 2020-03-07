import React, {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import {Table} from "react-bootstrap";
import {$isOpen, $setMethod, $setProduct} from "../../modules/api/product";
import {useDispatch} from "react-redux";
import AppName from '../../modules/static/name'

export default (props) => {

    let data = props.data
    let dispatch = useDispatch();

    if (typeof data == 'undefined') {
        return (
            <div>
                <span>Load ... </span>
            </div>
        )
    }

    let keys = Object.keys(data[0]).filter(f => f != 'store' && f != 'seq' && f != 'info')

    let $onEdit = (idx) => {
        $setMethod(dispatch, 'U')
        $setProduct(dispatch, data[idx])
        $isOpen(dispatch)
    }

    let changeTd = (data, name) => {

        if (typeof data === 'boolean') {
            return (
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round"></span>
                </label>

            )
        }

        let typeAlias = ""

        if (name === "create_at") {
            typeAlias = "date"
            data = data.split('T')[0]
        } else if (typeof data === 'number') {
            typeAlias = "number"
        } else {
            typeAlias = "text"
        }

        return (
            <Fragment>
                <span>{data}</span>
                <input className="dp-none" type={typeAlias} defaultValue={data}/>
            </Fragment>
        )

    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                {
                    keys.map((m, i) => (
                        <th key={i}>{AppName.changeNameByProd(m)}</th>
                    ))
                }
                <th>Action</th>
            </tr>

            </thead>
            <tbody>
            {
                data.map((d, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        {
                            keys.map((k, n) => (
                                <td key={n}>{changeTd(d[k], k)}</td>
                            ))
                        }
                        <td>
                            <button onClick={() => $onEdit(i)}>
                                <FontAwesomeIcon icon={icon.faEdit}/>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={icon.faSave}/>
                            </button>
                            <button>
                                <FontAwesomeIcon icon={icon.faTrashAlt}/>
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
    )
}
