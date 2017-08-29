import React, {Children} from 'react';
import PropTypes from 'prop-types';

const ObjectImg = (props) => {
    if (
      props.obj &&
      props.obj.__parameters &&
      props.obj.__parameters.media &&
      props.obj.__parameters.media[props.name]

    ) {
        let list = props.obj.__parameters.media[props.name];

        let imgProps = Object.assign({}, props);
        delete imgProps.name;
        delete imgProps.obj;

        return <div>
            {list.map((el, index) => <div key={index}>
                <img
                  src={el.path}
                  alt={el.name}
                  style={{maxWidth: '100%'}}
                  {...imgProps}
                  onClick={(e) => {
                      if (props.onClick) {
                          props.onClick(el, e);
                      }
                  }}
                />
            </div>)}
        </div>;
    } else {
        return null;
    }
};
ObjectImg.propTypes = {
    obj: PropTypes.object,
    name: PropTypes.string
};

const ObjectFile = (props) => {
    if (
      props.obj &&
      props.obj.__parameters &&
      props.obj.__parameters.media &&
      props.obj.__parameters.media[props.name]

    ) {
        let list = props.obj.__parameters.media[props.name];

        let fileProps = Object.assign({}, props);
        delete fileProps.name;
        delete fileProps.obj;


        return <div>
            {list.map((el, index) => <div key={index}>
                <div

                  {...fileProps}
                  onClick={(e) => {
                      if (props.onClick) {
                          props.onClick(el, e);
                      }
                  }}
                >{el.name}</div>
            </div>)}
        </div>;
    } else {
        return null;
    }
};
ObjectFile.propTypes = {
    obj: PropTypes.object,
    name: PropTypes.string
};

export {ObjectImg, ObjectFile};
