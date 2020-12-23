import React from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { LoadingOutlined } from "@ant-design/icons";
import Modal from "../components/Modal";
import Carousels from "../components/Carousels";
import ErrorBoundary from "../ErrorBoundary";
import ThemeContext from "../ThemeContext";
import { navigate, RouteComponentProps } from "@reach/router";

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  // Hooks not allowed in class components
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       loading: true,
  //     };
  //   }
  state = {
    loading: true,
    showModal: false,
    url: "",
    name: "",
    animal: "",
    location: "",
    description: "",
    media: [] as Photo[],
    breed: "",
  };
  componentDidMount() {
    // throw new Error("lol");
    if (!this.props.id) {
      navigate("/");
      return;
    }
    pet
      .animal(+this.props.id)
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
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                style={{ backgroundColor: theme }}
                onClick={this.toggleModal}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
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
export default function DetailsWithErrorBoundary(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
