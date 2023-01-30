import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './App.css';
import {Hasil, ListCategories, Menus, NavbarComponent} from './components';
import { API_URL } from './utils/constant';
import axios from "axios"
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [], // menu ini isinya akan kosong dan diisikan dengan product
       kategoriYangDipilih: "Makanan" //default dari kategori yang dipilih yaitu makanan, nah nanti akan diklik sesuai dengan user yang memilih
    }
  }
  componentDidMount() {
    axios
      .get(API_URL+"products?category.nama="+this.state.kategoriYangDipilih)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      })
  }

  // Membuat arrow function berdasarkan kategori yang dipilih

  changeCategory = (value) => {
    this.setState ({ // function ini berfungsi untuk mengubah kategori yang dipilih berdasarkan user
      kategoriYangDipilih: value, // nah di dalam setState, maka kategori yang dipilih dimasukkan dan diganti dengan props value
      menus: [] // pada function ini juga menusnya diganti dengan array kosong kembali
    })

    axios
    .get(API_URL+"products?category.nama="+value)
    .then(res => {
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  render() {
    const {menus, kategoriYangDipilih} = this.state
    return (
      <div className="App">
      <NavbarComponent/>
      <div className='mt-4'>
        <Container>
          <Row>
            <ListCategories changeCategory={this.changeCategory} kategoriYangDipilih={kategoriYangDipilih} />
            <Col>
              <h4><strong>Daftar Produk</strong></h4>
              <hr />
              <Row>
                {menus && menus.map((menu) => (
                  <Menus 
                    key={menu.id}
                    menu={menu}
                  />
                ))}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>  
    </div>
    )
  }
}



