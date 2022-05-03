import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';


class PeopleTable extends React.Component {
    state = {
        person: {
            id: uuidv4(),
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        selectedPeople: []
    }

    onTextChange = e => {

        const newState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });

        this.setState(newState);

        // const { person } = this.state;
        // const copy = { ...person };
        // copy[e.target.name] = e.target.value;
        // this.setState({ person: copy });
    }

    isAddButtonEnabled = () => {
        const { firstName, lastName, age} = this.state.person;
        return firstName && lastName && age;
    }

    // onLastNameChange = e => {
    //     const { person } = this.state;
    //     const copy = { ...person, lastName: e.target.value };
    //     this.setState({ person: copy });
    // }

    // onAgeChange = e => {
    //     const { person } = this.state;
    //     const copy = { ...person, age: e.target.value };
    //     this.setState({ person: copy });
    // }

    onAddClick = () => {
        const { person } = this.state;

        const newState = produce(this.state, draftState => {
            draftState.people.push(person);
            draftState.person = {
                id: uuidv4(),
                firstName: '',
                lastName: '',
                age: ''
            }
        });

        this.setState(newState);

        // const copy = [...people, person];
        // this.setState({
        //     people: copy, person: {
        //         firstName: '', lastName: '', age: ''
        //     }
        // });
    }

    onClearClick = () => {
        this.setState({
            people: [], person: {
                firstName: '', lastName: '', age: ''
            }
        });
    }

    onSelectClick = p => {
        // const { selectedPeople} = this.state;
        // const copy = [...selectedPeople, p];
        // this.setState({selectedPeople: copy});

        const newState = produce(this.state, draftState => {
            draftState.selectedPeople.push(p);
        });

        this.setState(newState);
    }

    onUnselectClick = p => {
        const selectedPeople = this.state.selectedPeople.filter(pe => p.id !== pe.id);
        this.setState({ selectedPeople });
    }

    isSelected = p => {
        const { selectedPeople } = this.state;
        return selectedPeople.some(s => s.id === p.id);
    }

    generateTable = () => {
        const { people } = this.state;
        if (!people.length) {
            return <h1>No people added yet! Go ahead and add some!</h1>
        }

        return (
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((p, i) => {
                        return <PersonRow
                            onSelectClick={() => this.onSelectClick(p)}
                            onUnselectClick={() => this.onUnselectClick(p)}
                            person={p}
                            isSelected={this.isSelected(p)}
                            key={i} />
                    })
                    }
                </tbody>
            </table>
        )
    }


    render() {
        const { firstName, lastName, age } = this.state.person;
        const { selectedPeople, people } = this.state;
        return (
            <div className='container mt-5'>
                <h1>{selectedPeople.length}</h1>
                <PersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    onClearClick={this.onClearClick}
                    isAddButtonEnabled={this.isAddButtonEnabled()}
                    />

                {/* {this.generateTable()} */}
                {!people.length && <h1>No people added yet! Go ahead and add some!</h1>}
                {!!people.length && <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((p, i) => {
                        return <PersonRow
                            onSelectClick={() => this.onSelectClick(p)}
                            onUnselectClick={() => this.onUnselectClick(p)}
                            person={p}
                            isSelected={this.isSelected(p)}
                            key={i} />
                    })
                    }
                </tbody>
            </table>}
            </div>
        );
    }
}

export default PeopleTable;