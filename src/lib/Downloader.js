import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Downloader extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        data: PropTypes.object,
        cleanup: PropTypes.func.isRequired
    };
    static defaultProps = {
        data: {}
    };

    constructor(props) {
        super(props);
    }

    download() {
        this.form.submit();
    }

    componentDidMount() {
        this.download();
        setTimeout(() => this.props.cleanup(), 10);

    }

    render() {
        return (
          <form action={this.props.url}
                ref={(form) => this.form = form}
                style={{display: 'none'}} method="post"
                accept-charset="UTF-8"
          >
              <textarea name="payload">{JSON.stringify(this.props.data)}</textarea>
          </form>
        );
    }
}


const download = (url, data = {}) => {

    let parent = document.body;

    const wrapper = parent.appendChild(document.createElement('div'));
    let cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
    };
    let props = {
        url: url,
        data: data
    };

    const component = ReactDOM.render(<Downloader {...props} cleanup={cleanup}/>, wrapper);


    return component.promise;
};


export default download;
