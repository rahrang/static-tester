import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import axios from 'axios';

import Header from '../components/header';
import './index.css';

class Layout extends React.Component {
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const data = await axios.get('http://berkeleypse.org/api/fulltime');
    console.log(data);
    return data;
  };

  render() {
    const { data, children } = this.props;
    return (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0
          }}
        >
          {children()}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
