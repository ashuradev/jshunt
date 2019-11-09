import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'
import './styles.css'

class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts()
    }

    loadProducts = async (page = 1) => {
        const {
            data: {
                docs,
                ...productInfo
            }
        } = await api.get(`/products?page=${page}`)

        this.setState({ products: docs, productInfo, page })
    }

    prevPage = () => {
        const { page } = this.state

        if (page === 1) return 

        const pageNumber = page - 1

        this.loadProducts(pageNumber)
    }

    nextPage = () => {
        const { page, productInfo } = this.state

        if (page === productInfo.pages) return

        const pageNumber = page + 1

        this.loadProducts(pageNumber)
    }

    render() {
        const { products, page, productInfo } = this.state

        return (
            <div className="products">
                {products.map(({ _id, title, description }) => (
                    <article key={_id}>
                        <strong>{title}</strong>
                        <p>{description}</p>

                        <Link to={`/products/${_id}`}>Acessar</Link>
                    </article>
                ))}

                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}

export default Main