import React, { Component } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { Link } from "react-router-dom"
import piechart from './piechart.JPG';

export class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            name: '',
            image: '',
            taskName: '',
            taskList: [],
            taskCompleted: '',
            totalTasks: '',
            token: '',
            id: ''
        }
    }

    handleClick(e) {
        console.log(e.target.value)
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
        console.log(this.state.search)
    }

    //Update state by calling the GET API
    updateAPI() {
        var token = this.props.location.data[2];
        //GET TASK
        axios({ method: 'get', url: 'https://dev.teledirectasia.com:3092/tasks', headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                // console.log(response)
                this.setState({ taskList: response.data.tasks })

            }).catch(error => {
                console.log(error);
            })
        axios({ method: 'get', url: 'https://dev.teledirectasia.com:3092/dashboard', headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                //console.log(response)
                this.setState({ taskCompleted: response.data.tasksCompleted, totalTasks: response.data.totalTasks })

            }).catch(error => {
                console.log(error);
            })
    }


    componentDidMount() {

        this.setState({ name: this.props.location.data[0], image: this.props.location.data[1], token: this.props.location.data[2] })
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        //     .then(response => {
        //         console.log(response)
        //         this.setState({ posts: response.data })

        //     }).catch(error => {
        //         console.log(error);
        //     })
        var token = this.props.location.data[2];

        //GET DASHBOARD
        axios({ method: 'get', url: 'https://dev.teledirectasia.com:3092/dashboard', headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response)
                // const data = response;
                this.setState({ taskCompleted: response.data.tasksCompleted, totalTasks: response.data.totalTasks })

            }).catch(error => {
                console.log(error);
            })

        //GET TASKS
        axios({ method: 'get', url: 'https://dev.teledirectasia.com:3092/tasks', headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response)
                // const data = response;
                console.log(response.data.tasks)
                this.setState({ taskList: response.data.tasks })

            }).catch(error => {
                console.log(error);
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //ADD TASK
    submitHandler = e => {
        e.preventDefault()
        //console.log(this.state)
        var token = this.props.location.data[2]
        var taskAdd = [{ name: this.state.taskName }];
        //console.log(taskAdd[0])
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }

        axios.post('https://dev.teledirectasia.com:3092/tasks', taskAdd[0], {
            headers: headers
        })
            .then((response) => {
                console.log("ADD")
                this.setState({
                    taskName: ''
                });
                this.updateAPI();

            })
            .catch((error) => {
                console.log(error)
            })
    }

    //DELETE TASK
    deleteHandler = e => {
        var userTaskID = e.target.value
        //e.preventDefault()
        var token = this.props.location.data[2]
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }
        axios.delete(('https://dev.teledirectasia.com:3092/tasks/' + userTaskID), {
            headers: headers
        })
            .then((response) => {
                console.log("DELETED");
                this.updateAPI();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    //EDIT TASK
    editHandler = e => {
        var userTaskID = e.target.value
        console.log(userTaskID)
        var taskAdd = [{ name: this.state.taskName }];
        console.log(taskAdd)
        //e.preventDefault()
        var token = this.props.location.data[2]

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }

        axios.put(('https://dev.teledirectasia.com:3092/tasks/' + userTaskID), taskAdd[0], {
            headers: headers
        })
            .then((response) => {
                console.log("TASK EDITED");
                this.updateAPI();
                this.state.taskName = '';
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        // const { users } = this.props.location
        const { name, image, taskName, taskList, taskCompleted, totalTasks } = this.state
        let filteredTask = this.props.tasksList;

        return (
            <div>

                <div class="navbar">
                    <ul>
                        <li><img src={'https://dev.teledirectasia.com:3092' + image} style={{ width: "40px", height: "30px" }}></img></li>
                        <li className="leftspace">{name}</li>
                        <li style={{ float: "right" }}> <Link to="/">Logout</Link></li>
                    </ul>
                </div>

                {totalTasks > 0 &&
                    <div>
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="card" style={{ width: "30rem" }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Tasks Completed</h4>
                                        <span className="fontBlue">{taskCompleted}</span><span> &nbsp;/&nbsp;</span><span>{totalTasks}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="card" style={{ width: "30rem" }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Latest Created Task</h4>
                                        <ul>
                                            {
                                                taskList.length ?
                                                    taskList.map(taskListing => <li key={taskListing.name}> {taskListing.name}</li>) :
                                                    null
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="card" style={{ width: "30rem" }}>
                                    <img src={piechart} alt="chart"></img>
                                </div>
                            </div>
                        </div>

                        <div class="container" style={{ margin: "50px" }}>
                            <div class="row">
                                <div class="col-sm-4">
                                    <h4>Tasks</h4>
                                </div>
                                <div class="col-sm-6">
                                    <div class="topnav" style={{ float: "right" }}>
                                        <input type="text" placeholder="Search By Task Name" value={this.state.search} onChange={this.updateSearch.bind(this)}></input>
                                    </div>
                                </div>
                                <div class="col-sm-2" >
                                    <div style={{ float: "right" }}>
                                        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">+ New Task</button>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div>
                                <ul class="list-group list-group-flush">
                                    {
                                        taskList.length ?
                                            taskList.map(taskListing => <li key={taskListing.name} class="list-group-item">
                                                <div class="checkbox" >
                                                    <input type="checkbox" onClick={this.handleClick} value={taskListing._id}></input>
                                                    <label class="strikethrough">{taskListing.name}</label>

                                                    <button style={{ float: "right" }} type="button" class="glyphicon glyphicon-pencil" data-toggle="modal" data-target="#editModal"></button>
                                                    <button style={{ float: "right" }} class="glyphicon glyphicon-trash" onClick={this.deleteHandler} value={taskListing._id}></button>
                                                </div>
                                            </li>) :
                                            null
                                    }
                                </ul>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={this.submitHandler} >
                                <div class="modal fade" id="myModal" role="dialog" >
                                    <div class="modal-dialog modal-sm">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                <h3>+ New Task</h3>
                                            </div>
                                            <div class="modal-body">
                                                <input type="text" placeholder="Task Name" className="taskName" name="taskName" value={taskName} onChange={this.changeHandler} required></input>
                                                <div className="addTask"><br></br>
                                                    <button class="btn btn-info btn-lg" >+ New Task</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Edit Task Name */}
                        <div>
                            <div class="modal fade" id="editModal" role="dialog" >
                                <div class="modal-dialog modal-sm">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h3>Edit Task Name</h3>
                                        </div>
                                        <div class="modal-body">
                                            <input type="text" placeholder="Task Name" className="taskName" name="taskName" value={taskName} onChange={this.changeHandler} required></input>
                                            {
                                                taskList.length ?
                                                    taskList.map(taskListing => <div key={taskListing.name} style={{ border: "none" }}><br></br>
                                                        <button class="btn btn-info btn-lg" data-dismiss="modal" onClick={this.editHandler} value={taskListing._id} >Submit</button>
                                                    </div>) :
                                                    null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {totalTasks < 1 &&
                    <div style={{ align: "center" }}>
                        <div class="card" style={{ height: "150px", width: "300px" }}>
                            <div>
                                <br></br>
                                <h4><b>You have no task.</b></h4>
                                <button type="button" style={{ align: "center" }} class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">+ New Task</button>
                            </div>
                        </div>

                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog modal-sm">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h3>+ New Task</h3>
                                    </div>
                                    <div class="modal-body">
                                        <input type="text" placeholder="Task Name" className="taskName" name="taskName" value={taskName} onChange={this.changeHandler} required></input>
                                        <div className="addTask"><br></br>
                                            <button class="btn btn-info btn-lg" data-dismiss="modal" onClick={this.submitHandler} >+ New Task</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div >
        )
    }
}

export default Dashboard