import React from 'react';

class PersonRow extends React.Component {
    // onSelectClick = () => {
    //     const { person, onSelectClick } = this.props;
    //     onSelectClick(person);
    // }

    render() {
        const { firstName, lastName, age } = this.props.person;
        const { onSelectClick, onUnselectClick, isSelected } = this.props;

        return (
            <tr className={age >= 65 ? 'bg-danger' : ''}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>
                    <button className={`btn btn-${isSelected ? 'danger': 'success'}`} onClick={isSelected ? onUnselectClick : onSelectClick}>
                        {isSelected ? 'Unselect' : 'Select'}
                    </button>
                </td>
            </tr>
        )
    }
}

export default PersonRow;