import { Component } from 'react';
import { INewsRecord } from '../news-create/news-create.component';
import './news.component.scss';
import { Divider } from '@material-ui/core';

interface INewsProps {
  readonly news: INewsRecord[];
}

export class NewsComponent extends Component<INewsProps, any> {
  render() {
    return (
      <div className="news-records__wrapper">
        <div className="news-records__container">
          {this.props.news.map(newsRecord =>
            <div className="news-record"
                 key={newsRecord.id}>
              <div className="news-content">
                <div className="news-record__content">
                  <div className="news-record__title">{newsRecord.title}</div>
                  <div className="news-record__created-at">{new Date(newsRecord.createdAt).toLocaleDateString()}</div>
                  {newsRecord.content}
                </div>
                <img className="news-record__image"
                     src={newsRecord.image}
                     alt={newsRecord.title}/>
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }
}
