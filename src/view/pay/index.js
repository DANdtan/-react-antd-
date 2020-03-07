import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Pay from "./pay"
class payindex extends Component {
    render() {
        return (
            <div>
                <Route path="/pay" component={Pay}>
                </Route>
            </div>
        );
    }
}

export default payindex;