import React from "react";
import pet from "@frontendmasters/pet";
import { LoadingOutlined } from "@ant-design/icons";
import Modal from "../components/Modal";
import Carousels from "../components/Carousels";
import ErrorBoundary from "../ErrorBoundary";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

class Details extends React.Component {
  // Hooks not allowed in class components
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       loading: true,
  //     };
  //   }
  state = { loading: true, showModal: false };
  componentDidMount() {
    // throw new Error("lol");
    pet
      .animal(this.props.id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city},${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading)
      return <LoadingOutlined className="text-danger h1" />;

    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal,
    } = this.state;
    return (
      <div className="details">
        <Carousels media={media} />
        <div className="">
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>

          <button
            style={{ backgroundColor: this.props.storeTheme }}
            onClick={this.toggleModal}
          >
            Adopt {name}
          </button>
          <p>{description}</p>
          {showModal && (
            <Modal>
              <div>
                <h1>Would like to adopt {name} ?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>Later,Maybe</button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  storeTheme: PropTypes.string.isRequired,
};
const mapStateToProps = ({ storeTheme }) => ({ storeTheme });

const WrappedDetails = connect(mapStateToProps)(Details);
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <WrappedDetails {...props} />
    </ErrorBoundary>
  );
}
