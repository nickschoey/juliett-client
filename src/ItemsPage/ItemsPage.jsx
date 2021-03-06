import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemActions } from '../_actions';
import './ItemsPage.css';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const options = [
  { value: 'salads', label: 'Salads' },
  { value: 'pasta', label: 'Pasta' },
  { value: 'pizza', label: 'Pizza' },
  { value: 'drinks', label: 'drinks' }
];

class ItemPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      item: {
        name: '',
        description: '',
        category: null,
        priceFiat: '',
        imageURL: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange (event) {
    const { name, value } = event.target;
    console.log(value);

    const { item } = this.state;
    this.setState({
      item: {
        ...item,
        [name]: value
      }
    });
  }

  handleSubmit (event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { item } = this.state;
    if (item.name && item.description && item.priceFiat && item.imageURL) {
      this.props.addItem(item);
    }
    this.setState({
      item: {
        name: '',
        description: '',
        category: null,
        priceFiat: '',
        imageURL: ''
      },
      submitted: false
    })

  }

  componentDidMount () {
    this.props.getAll()
  }

  handleDeleteItem (id) {
    return (e) => this.props.delete(id);
  }

  render () {
    const { items, adding } = this.props;
    const { item, submitted } = this.state;


    return (
      <div className="items__page">

        {items.loading && <em>Loading items...</em>}
        {items.error && <span className="text-danger">ERROR: {items.error}</span>}
        {items.items &&
          <div className="items__existing">
            {items.items.map((item, index) =>
              <div className="card" key={item._id}>
                <img src={item.imageURL} alt="Avatar" />
                <div className="card__container">
                  <h4><b>{item.name} - {item.category}</b></h4>
                  <p>{item.description}</p>
                  <div onClick={this.handleDeleteItem(item._id)} className="action">
                    <FontAwesomeIcon className="myIcon" icon={faTrash} />
                  </div>
                </div>
              </div>
            )}
          </div>
        }
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group' + (submitted && !item.name ? ' has-error' : '')}>
            <label htmlFor="name">Product name</label>
            <input type="text" className="form-control" name="name" value={item.name} onChange={this.handleChange} />
            {submitted && !item.name &&
              <div className="help-block">A product name is required</div>
            }
          </div>
          <div className={'form-group' + (submitted && !item.category ? ' has-error' : '')}>
            <label htmlFor="category">Product category</label>
            <input type="text" className="form-control" name="category" value={item.category} onChange={this.handleChange} />
            {submitted && !item.name &&
              <div className="help-block">A product name is required</div>
            }
          </div>


          <div className={'form-group' + (submitted && !item.description ? ' has-error' : '')}>
            <label htmlFor="description">Product description</label>
            <input type="text" className="form-control" name="description" value={item.description} onChange={this.handleChange} />
            {submitted && !item.description &&
              <div className="help-block">A product description is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !item.priceFiat ? ' has-error' : '')}>
            <label htmlFor="priceFiat">Product price in euros</label>
            <input type="number" className="form-control" name="priceFiat" value={item.priceFiat} onChange={this.handleChange} />
            {submitted && !item.priceFiat &&
              <div className="help-block">A product price in euros is required</div>
            }
          </div>

          <div className={'form-group' + (submitted && !item.imageURL ? ' has-error' : '')}>
            <label htmlFor="imageURL">ImageURL</label>
            <input type="url" className="form-control" name="imageURL" value={item.imageURL} onChange={this.handleChange} />
            {submitted && !item.imageURL &&
              <div className="help-block">An URL for the product image</div>
            }
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {adding &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
          </div>
        </form>
        <Link to="/" className="btn btn-link">Back</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { items } = state;
  return {
    items
  }
}
const mapDispatchToProps = (dispatch) => ({
  getAll: items => dispatch(itemActions.getAll(items)),
  delete: id => dispatch(itemActions.delete(id)),
  addItem: item => dispatch(itemActions.addItem(item))
})

const connectedItemPage = connect(mapStateToProps, mapDispatchToProps)(ItemPage);
export { connectedItemPage as ItemPage };