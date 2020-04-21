import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Member extends Component {
  constructor() {
    super();
    this.state = {
      member: [],
      id: "",
      username: "",
      email: "",
      role: "",
      first_name: null,
      last_name: null,
      gender: null,
      date_birth: null,
      no_hp: null,
      alamat: null,
      image: null,
      action: "",
      find: "",
      message: "",
    }

    // jika tidak terdapat data token pada local storage
    // if(!localStorage.getItem("Token")){
    //   // direct ke halaman login
    //   window.location = "/login";
    // }
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  bindImage = (e) => {
    this.setState({ image: e.target.files[0] })
  }

  Add = () => {
    // membuka modal
    $("#modal_member").modal("show");
    // mengosongkan data pada form
    this.setState({
      action: "insert",
      id: "",
      username: "",
      email: "",
      password: "",
      role: "admin",

    });
  }

  Edit = (item) => {
    // membuka modal
    $("#modal_member").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id: item.id,
      username: item.username,
      email: item.email,
      password: item.password,
      role: item.role,

    });
  }


  get_member = () => {
    let url = "http://localhost/lapangan/public/member";
    axios.get(url)
      .then(response => {
        this.setState({ member: response.data.member });
        $("#loading").toast("hide");
      })
      .catch(error => {
        console.log(error);
      });
  }

  Drop = (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      // $("#loading").toast("show");
      let url = "http://localhost/lapangan/public/member/drop/" + id;
      axios.delete(url)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({ message: response.data.message });
          $("#message").toast("show");
          this.get_member();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount = () => {
    this.get_member();
  }

  Save = (event) => {
    event.preventDefault();
    // menampilkan proses loading
    // $("#loading").toast("show");
    // menutup form modal
    $("#modal_member").modal("hide");
    let url = "http://localhost/lapangan/public/member/save";
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id", this.state.id);
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("password", this.state.password);
    form.append("role", this.state.role);
    form.append("first_name", this.state.first_name);
    form.append("last_name", this.state.last_name);
    form.append("gender", this.state.gender);
    form.append("date_birth", this.state.date_birth);
    form.append("alamat", this.state.alamat);
    form.append("no_hp", this.state.no_hp);
    axios.post(url, form)

      .then(response => {
        // $("#loading").toast("hide");
        this.setState({ message: response.data.message });
        $("#message").toast("show");
        this.get_member();
      })
      .catch(error => {
        console.log(error);
      });
  }

  search = (event) => {
    if (event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/lapangan/public/member/find";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({ member: response.data.member });
        }) 
        .catch(error => {
        console.log(error);
        });
    }
}

  render() {
    return (
      <div className="container">
        <div className="card mt-2">
          {/* header card */}
          <div className="card-header bg-dark">
            <div className="row">
              <div className="col-sm-8">
                <h4 className="text-white">Data Member</h4>
              </div>
                <div className="col-sm-4">
                    <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div>
            </div>

          </div>
          {/* content card */}
          <div className="card-body">
            <Toast id="message" autohide="true" title="Informasi">
              {this.state.message}
            </Toast>
            {/* <Toast id="loading" autohide="false" title="Informasi"> */}
            {/* <span className="fa fa-spin fa-spinner"></span> Sedang Memuat */}
            {/* </Toast> */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Peran</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tbody>
                {this.state.member.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>{item.role}</td>
                      <button className="m-1 btn btn-sm btn-outline-info" onClick={() => this.Edit(item)}>
                        <span className="fa fa-edit"></span>
                      </button>
                      <button className="m-1 btn btn-sm btn-outline-warning"
                        onClick={() => this.Drop(item.id)}>
                        <span className="fa fa-trash"></span>
                      </button>

                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* tombol tambah */}

            <button className="btn btn-dark my-2" onClick={this.Add}>
              <span className="fa fa-plus"></span> Tambah Data
              </button>


            {/* form modal siswa*/}
            <Modal id="modal_member" title="Form Member" bg_header="dark" text_header="info">
              <form onSubmit={this.Save}>
                Username
                  <input type="text" className="form-control" name="username"
                  value={this.state.username} onChange={this.bind} required />
                  Email
                  <input type="email" className="form-control" name="email"
                  value={this.state.email} onChange={this.bind} required />
                  Password
                  <input type="password" className="form-control" name="password"
                  value={this.state.password} onChange={this.bind} required />
                <div class="form-group">
                  <label for="role">Peran</label>
                  <select class="form-control" name="role" value={this.state.role} onChange={this.bind} required>
                      <option value=" "></option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-dark pull-right m-2">
                  <span className="fa fa-check"></span> Simpan
                  </button>
              </form>
            </Modal>
          </div>
        </div>


      </div>
    );
  }



}
export default Member