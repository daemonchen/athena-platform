import React, {Component} from 'react';
import WidgetItem from './WidgetItem';
import FragmentItem from './FragmentItem';
import PageItem from './PageItem';
import CssItem from './CssItem';
import JsItem from './JsItem';
import ImageItem from './ImageItem';

export default class SearchResult extends Component {
  render() {
    const {result} = this.props;
    return (
      <div>
        {result.widget &&
          <ul className="collapsible" data-collapsible="expandable">

            {result.widget.map(widget => {
              return <WidgetItem showModel={true} key={widget._id} widget={widget} />;
            })}
          </ul>
        }
        {result.fragment &&
          <ul className="collapsible" data-collapsible="expandable">
            {result.fragment.map(fragment => {
              return <FragmentItem key={fragment._id} fragment={fragment} />;
            })}
          </ul>
        }
        {result.page &&
          <ul className="collapsible" data-collapsible="expandable">
            {result.page.map(page => {
              return <PageItem key={page._id} page={page} showModel={true}/>;
            })}
          </ul>
        }
        {result.css &&
          <ul className="collapsible" data-collapsible="expandable">
            {result.css.map(css => {
              return <CssItem key={css._id} css={css} />;
            })}
          </ul>
        }
        {result.js &&
          <ul className="collapsible" data-collapsible="expandable">
            {result.js.map(js => {
              return <JsItem key={js._id} js={js} />;
            })}
          </ul>
        }
        {result.image &&
          <ul className="collapsible" data-collapsible="expandable">
            {result.image.map(image => {
              return <ImageItem key={image._id} image={image} />;
            })}
          </ul>
        }
   </div>
    );
  }
}
