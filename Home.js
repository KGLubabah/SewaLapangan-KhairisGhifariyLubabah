import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slide1 from '../image/Slide1.jpeg';
import Slide2 from '../image/Slide2.jpeg';

export default class Home extends React.Component {
    render() {
        return (<div className=" container">
            <div className="row">
                <div className="col-md-11">
                    <div id="slideshow" className="carousel slide my-4" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slideshow" data-slide-to="0" className="active"></li>
                            <li data-target="#slideshow" data-slide-to="1"></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img className="d-block img-fluid" src={Slide1} alt="First slide" />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Lapangan Futsal</h5>
                                    <p>Tersedia</p>
                                </div>        
                            </div>
                            <div className="carousel-item">
                                <img className="d-block img-fluid" src={Slide2} alt="Second slide" />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Lapangan Basket</h5>
                                    <p>Tidak Tersedia</p>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#slideshow" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#slideshow" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                        <hr></hr>
                    </div>
 
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-lg-12">
                                <div className="card-header">
                                    Cara Booking?
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Hubungi kami:</h5>
                                    <p className="card-text">rentallap_lmj@yahoo.com | Pasirian, Lumajang</p>
                                    <Link to="/booking">
                                        <button className="btn btn-success float-left">
                                            <span className="fa fa-check"></span> Booking Sekarang
                                        </button>
                                    </Link><br /><br /><br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
    /* constructor(props) {
        super(props);
        this.state = {
            products: [],
            find: "",
            filter: ""
        };
    }
    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    GetProduct = () => {
        let url = "http://localhost/toko_online/public/products";
        axios.get(url)
            .then(res => {
                this.setState({ products: res.data.products });
            })
            .catch(error => {
                console.log(error);
            });
    };
    Search = (e) => {
        if (e.keyCode === 13) {
            let url = "http://localhost/toko_online/public/products";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(res => {
                    this.setState({ products: res.data.products });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };
    componentDidMount() {
        this.GetProduct();
    }
    */
}
