import React, { Component } from "react";
import axios from 'axios';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
  
class Profil extends Component {
    constructor() {
        super();
        this.state = {
            profil: [],
            id_profil: "",
            first_name: "",
            last_name: "",
            name: "",
            role: "profil",
            alamat: null,
            gender: "",
            date_birth: "",
            no_hp: "",
            alamat: ""
            
        }
        if (!localStorage.getItem("Token")) {
            // direct ke halaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    Edit = item => {
        // shows modal
        $("#modal_profil").modal("show");
        // fills in form data
        this.setState({
            action: "update",
            id_profil: item.id_profil,
            name: item.name,
            first_name: item.first_name,
            last_name: item.last_name,
            gender: item.gender,
            date_birth: item.date_birth,
            no_hp: item.no_hp,
            alamat: item.alamat
        });
    }
    get_profil = () => {
        // $("#loading").toast("show");
        let id_profil= JSON.parse(localStorage.getItem('id_profil'))
        // console.log(items)
        let url = "http://localhost/lapangan/public/myProfil/" + id_profil;
        axios.get(url)
            .then(response => {
                this.setState({ profil: response.data.profil, });
                // $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount = () => {
        this.get_profil();
    }

    Save = (event) => {
        console.log(this.state.id_profil)
        event.preventDefault();
        // shows loading process
        // $("#loading").toast("show");
        // closes modal form
        $("#modal_profil").modal("hide");
        let url = "http://localhost/lapangan/public/profil/saveProfil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_profil", this.state.id_profil);
        form.append("first_name", this.state.first_name);
        form.append("last_name", this.state.last_name);
        form.append("gender", this.state.gender);
        form.append("date_birth", this.state.date_birth);
        form.append("no_hp", this.state.no_hp);
        form.append("alamat", this.state.alamat, this.state.alamat.name);
        axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                // $("#message").toast("show");
                this.get_profil();
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { profil } = this.state;
        console.log(profil)
        return (
            <div className="container">
                <div className="card mt-2">
                    <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
                        <div className="#" style={{ maxwidth: "200px" }}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    {profil.map((item, index) => {
                                        return (
                                            <ul class="list-group" key={index}>
                                                <img className="rounded float-left" src={'http://localhost/lapangan/public/alamats/' + item.alamat} style={{ height: "240px", width: "200px" }} />
                                            </ul>
                                        )
                                    })}
                                </div>
                                <div>
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                                        <table className="table table-borderless" style={{ width : "500px"}}>
                                            {profil.map((item, index) => {
                                                return (
                                                    <ul class="list-group" key={index}>
                                                        <li class="list-group-item">First name : {item.first_name}</li>
                                                        <li class="list-group-item">Last name : {item.name}</li>
                                                        <li class="list-group-item">Gender : {item.gender}</li>
                                                        <li class="list-group-item">Date Birth : {item.date_birth}</li>
                                                        <li class="list-group-item">Phone : {item.no_hp}</li>
                                                        <li class="list-group-item">Address : {item.alamat}</li>
                                                        <button className="m-1 btn btn-sm btn-outline-info" onClick={() => this.Edit(item)}>
                                                            <span className="fa fa-edit"></span>
                                                        </button>
                                                    </ul>
                                                );
                                            })}
                                            
                                            <button className="m-1 btn btn-sm btn-outline-success" style={{ width : "500px"}} onClick={this.Add}>
                                                <span className="fa fa-plus"></span>
                                            </button>
                                        </table>
                                    </div>
                                </div>
                                <Modal id="modal_profil" title="Form profil" bg_header="success"
                                    text_header="white">
                                    <form onSubmit={this.Save}>
                                        First name
                                            <input type="text" className="form-control" name="first_name"
                                            value={this.state.first_name} onChange={this.bind} required />
                                        Last name
                                            <input type="text" className="form-control" name="name"
                                            value={this.state.name} onChange={this.bind} required />
                                        <div className="form-group">
                                            <label for="gender">Gender</label>
                                            <select className="form-control" name="gender" value={this.state.gender} onChange={this.bind} required>
                                                <option value=" "></option>
                                                <option value="Pria">Pria</option>
                                                <option value="Wanita">Wanita</option>
                                            </select>
                                        </div>
                                        Date birth
                                            <input type="date" className="form-control" name="date_birth"
                                            value={this.state.date_birth} onChange={this.bind} required />
                                        Phone
                                            <input type="text" className="form-control" name="no_hp"
                                            value={this.state.no_hp} onChange={this.bind} required />
                                        Address
                                            <input type="text" className="form-control" name="alamat"
                                            onChange={this.bind} required />
                                        
                                        <button type="submit" className="btn btn-info pull-right m-2">
                                            <span className="fa fa-check"></span> Simpan
                                            </button>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profil;