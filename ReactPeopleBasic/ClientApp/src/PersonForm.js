
import React from 'react';

class PersonForm extends React.Component {
    render() {
        const { onTextChange, onAddClick, onClearClick,
            firstName, lastName, age, isAddButtonEnabled } = this.props;

        return (
            <div className="row jumbotron">
                <div className="col-md-3">
                    <input type="text" placeholder="First Name"
                        name="firstName" className="form-control" value={firstName} onChange={onTextChange} />
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="Last Name"
                        name="lastName" className="form-control" value={lastName} onChange={onTextChange} />
                </div>
                <div className="col-md-3">
                    <input type="text" placeholder="Age"
                        name="age" className="form-control" value={age} onChange={onTextChange} />
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary" onClick={onAddClick} disabled={!isAddButtonEnabled}>Add</button>
                    <button className="btn btn-warning ml-3" onClick={onClearClick}>Clear All</button>
                </div>
            </div>
        );
    }
}

export default PersonForm;